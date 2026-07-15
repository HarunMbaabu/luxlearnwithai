import { randomBytes, pbkdf2Sync, timingSafeEqual } from "crypto";
import { Pool } from "pg";

let pool;

function shouldUseSsl(connectionString) {
  try {
    const url = new URL(connectionString);
    const sslmode = (url.searchParams.get("sslmode") || "").toLowerCase();
    if (sslmode) return sslmode !== "disable";
  } catch {}

  const envSslMode = process.env.PGSSLMODE || process.env.LUX_PGSSLMODE || "";
  return envSslMode.toLowerCase() !== "disable" && Boolean(envSslMode);
}

function getPool() {
  const connectionString = process.env.LUXDEVDB_CONN || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing DATABASE_URL or LUXDEVDB_CONN");
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      ssl: shouldUseSsl(connectionString)
        ? { rejectUnauthorized: process.env.PGSSL_REJECT_UNAUTHORIZED === "true" }
        : undefined,
    });
  }

  return pool;
}

const SCHEMA_NAME = "prep_program_intakes";
const TABLE_NAME = "website_users";

function quoteIdent(name) {
  const value = String(name || "");
  if (!value) throw new Error("Invalid database identifier");
  return `"${value.replace(/"/g, '""')}"`;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 310000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = String(storedPassword || "").split(":");
  if (!salt || !storedHash) return false;

  const hash = pbkdf2Sync(password, salt, 310000, 32, "sha256");
  const stored = Buffer.from(storedHash, "hex");

  if (hash.length !== stored.length) return false;
  return timingSafeEqual(hash, stored);
}

async function schemaExists(client) {
  const { rows } = await client.query(
    "SELECT 1 FROM information_schema.schemata WHERE schema_name = $1 LIMIT 1",
    [SCHEMA_NAME]
  );
  return rows.length > 0;
}

async function ensureAuthTable(client) {
  if (!(await schemaExists(client))) {
    await client.query(`CREATE SCHEMA ${quoteIdent(SCHEMA_NAME)}`);
  }

  await client.query(`
    CREATE TABLE IF NOT EXISTS ${quoteIdent(SCHEMA_NAME)}.${quoteIdent(TABLE_NAME)} (
      id BIGSERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'luxdevhq.ai',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_login_at TIMESTAMPTZ
    )
  `);
}

export async function createWebsiteUser({ fullName, email, password }) {
  const client = await getPool().connect();
  try {
    await ensureAuthTable(client);
    const normalizedEmail = normalizeEmail(email);
    const passwordHash = hashPassword(password);
    const { rows } = await client.query(
      `
        INSERT INTO ${quoteIdent(SCHEMA_NAME)}.${quoteIdent(TABLE_NAME)} (full_name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, full_name, email, created_at
      `,
      [String(fullName).trim(), normalizedEmail, passwordHash]
    );
    return rows[0];
  } catch (error) {
    if (error.code === "23505") {
      const duplicate = new Error("An account already exists for this email.");
      duplicate.code = "EMAIL_EXISTS";
      throw duplicate;
    }
    throw error;
  } finally {
    client.release();
  }
}

export async function verifyWebsiteUser({ email, password }) {
  const client = await getPool().connect();
  try {
    await ensureAuthTable(client);
    const normalizedEmail = normalizeEmail(email);
    const { rows } = await client.query(
      `
        SELECT id, full_name, email, password_hash
        FROM ${quoteIdent(SCHEMA_NAME)}.${quoteIdent(TABLE_NAME)}
        WHERE email = $1
        LIMIT 1
      `,
      [normalizedEmail]
    );

    const user = rows[0];
    if (!user || !verifyPassword(password, user.password_hash)) {
      return null;
    }

    await client.query(
      `UPDATE ${quoteIdent(SCHEMA_NAME)}.${quoteIdent(TABLE_NAME)} SET last_login_at = NOW() WHERE id = $1`,
      [user.id]
    );

    return { id: user.id, fullName: user.full_name, email: user.email };
  } finally {
    client.release();
  }
}
