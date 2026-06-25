export const runtime = "nodejs";

import crypto from "crypto";
import { Pool } from "pg";

const connectionString = process.env.LUXDEVDB_CONN || process.env.DATABASE_URL;

let pool;
function getPool() {
  if (!connectionString) {
    throw new Error("Missing LUXDEVDB_CONN or DATABASE_URL");
  }
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: shouldUseSsl(connectionString)
        ? { rejectUnauthorized: process.env.PGSSL_REJECT_UNAUTHORIZED !== "false" }
        : undefined,
    });
  }
  return pool;
}

function shouldUseSsl(cs) {
  try {
    const url = new URL(cs);
    const sslmode = (url.searchParams.get("sslmode") || "").toLowerCase();
    if (sslmode) return sslmode !== "disable";
  } catch {}
  return (process.env.PGSSLMODE || "").toLowerCase() !== "disable";
}

function getEncryptionKey() {
  const secret = process.env.DATABASE_CONFIG_SECRET || process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "luxdevhq-local-database-config-secret";
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptPassword(password) {
  if (!password) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(String(password), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}:${tag.toString("base64")}:${encrypted.toString("base64")}`;
}

export function decryptPassword(value) {
  if (!value) return "";
  const [ivRaw, tagRaw, encryptedRaw] = String(value).split(":");
  if (!ivRaw || !tagRaw || !encryptedRaw) return "";
  const decipher = crypto.createDecipheriv("aes-256-gcm", getEncryptionKey(), Buffer.from(ivRaw, "base64"));
  decipher.setAuthTag(Buffer.from(tagRaw, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(encryptedRaw, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

export async function ensureDatabaseConfigurationsTable() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS database_configurations (
      id TEXT PRIMARY KEY,
      database_name TEXT NOT NULL,
      database_type TEXT NOT NULL,
      host TEXT NOT NULL,
      port INTEGER NOT NULL,
      username TEXT NOT NULL,
      password_encrypted TEXT,
      database_schema TEXT NOT NULL,
      connection_status TEXT NOT NULL DEFAULT 'untested',
      last_tested_at TIMESTAMPTZ,
      last_error TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export function validateConfig(input, { requirePassword = true } = {}) {
  const required = ["databaseName", "databaseType", "host", "port", "username", "databaseSchema"];
  const missing = required.filter((field) => !String(input?.[field] ?? "").trim());
  if (requirePassword && !String(input?.password ?? "").trim()) missing.push("password");
  const port = Number(input?.port);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return { ok: false, error: "Port must be a number between 1 and 65535." };
  }
  if (missing.length) {
    return { ok: false, error: `Missing required fields: ${missing.join(", ")}.` };
  }
  return { ok: true };
}

export function serializeConfig(row) {
  return {
    id: row.id,
    databaseName: row.database_name,
    databaseType: row.database_type,
    host: row.host,
    port: row.port,
    username: row.username,
    passwordMasked: row.password_encrypted ? "••••••••" : "",
    databaseSchema: row.database_schema,
    connectionStatus: row.connection_status,
    lastTestedAt: row.last_tested_at,
    lastError: row.last_error,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listConfigs() {
  await ensureDatabaseConfigurationsTable();
  const { rows } = await getPool().query("SELECT * FROM database_configurations ORDER BY updated_at DESC");
  return rows.map(serializeConfig);
}

export async function getConfig(id) {
  await ensureDatabaseConfigurationsTable();
  const { rows } = await getPool().query("SELECT * FROM database_configurations WHERE id = $1", [id]);
  return rows[0] || null;
}

export async function createConfig(input) {
  const validation = validateConfig(input);
  if (!validation.ok) return { error: validation.error };
  await ensureDatabaseConfigurationsTable();
  const { rows } = await getPool().query(
    `INSERT INTO database_configurations (id, database_name, database_type, host, port, username, password_encrypted, database_schema)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [crypto.randomUUID(), input.databaseName.trim(), input.databaseType, input.host.trim(), Number(input.port), input.username.trim(), encryptPassword(input.password), input.databaseSchema.trim()]
  );
  return { config: serializeConfig(rows[0]) };
}

export async function updateConfig(id, input) {
  const existing = await getConfig(id);
  if (!existing) return { notFound: true };
  const validation = validateConfig(input, { requirePassword: false });
  if (!validation.ok) return { error: validation.error };
  const passwordSql = String(input.password || "").trim() ? ", password_encrypted = $8" : "";
  const values = [input.databaseName.trim(), input.databaseType, input.host.trim(), Number(input.port), input.username.trim(), input.databaseSchema.trim(), id];
  if (passwordSql) values.push(encryptPassword(input.password));
  const { rows } = await getPool().query(
    `UPDATE database_configurations
     SET database_name = $1, database_type = $2, host = $3, port = $4, username = $5, database_schema = $6,
         updated_at = NOW()${passwordSql}
     WHERE id = $7 RETURNING *`,
    values
  );
  return { config: serializeConfig(rows[0]) };
}

export async function deleteConfig(id) {
  await ensureDatabaseConfigurationsTable();
  const { rowCount } = await getPool().query("DELETE FROM database_configurations WHERE id = $1", [id]);
  return rowCount > 0;
}

export async function testDatabaseConnection(configOrInput) {
  const validation = validateConfig(configOrInput);
  if (!validation.ok) return { success: false, error: validation.error };
  if (String(configOrInput.databaseType).toLowerCase() !== "postgresql") {
    return { success: false, error: `${configOrInput.databaseType} connection testing is not available in this deployment yet.` };
  }
  const testPool = new Pool({
    host: configOrInput.host,
    port: Number(configOrInput.port),
    user: configOrInput.username,
    password: configOrInput.password,
    database: configOrInput.databaseSchema,
    connectionTimeoutMillis: 5000,
    ssl: process.env.DB_CONFIG_TEST_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });
  try {
    await testPool.query("SELECT 1");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || "Connection test failed." };
  } finally {
    await testPool.end().catch(() => {});
  }
}

export async function persistTestResult(id, result) {
  await ensureDatabaseConfigurationsTable();
  const { rows } = await getPool().query(
    `UPDATE database_configurations
     SET connection_status = $1, last_tested_at = NOW(), last_error = $2, updated_at = NOW()
     WHERE id = $3 RETURNING *`,
    [result.success ? "active" : "failed", result.success ? null : result.error, id]
  );
  return rows[0] ? serializeConfig(rows[0]) : null;
}

export function configWithPassword(row) {
  return {
    databaseName: row.database_name,
    databaseType: row.database_type,
    host: row.host,
    port: row.port,
    username: row.username,
    password: decryptPassword(row.password_encrypted),
    databaseSchema: row.database_schema,
  };
}
