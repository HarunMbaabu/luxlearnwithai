import { randomBytes, pbkdf2Sync, timingSafeEqual } from "crypto";
import { Pool } from "pg";

let pool;

const SCHEMA_NAME = "prep_program_intakes";
const TABLE_NAME = "website_users";

function firstEnv(...names) {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  return "";
}

function buildConnectionString() {
  const directUrl = firstEnv("DATABASE_URL", "LUXDEVDB_CONN", "POSTGRES_URL");
  if (directUrl) return directUrl;

  const host = firstEnv("PGHOST", "DB_HOST", "POSTGRES_HOST", "LUXDEVDB_HOST");
  const port = firstEnv("PGPORT", "DB_PORT", "POSTGRES_PORT", "LUXDEVDB_PORT") || "5432";
  const database = firstEnv("PGDATABASE", "DB_NAME", "POSTGRES_DATABASE", "LUXDEVDB_DATABASE");
  const user = firstEnv("PGUSER", "DB_USER", "POSTGRES_USER", "LUXDEVDB_USER");
  const password = firstEnv("PGPASSWORD", "DB_PASSWORD", "POSTGRES_PASSWORD", "LUXDEVDB_PASSWORD");
  const sslMode = firstEnv("PGSSLMODE", "DB_SSLMODE", "POSTGRES_SSLMODE", "LUXDEVDB_SSLMODE") || "require";

  if (!host || !database || !user || !password) {
    throw new Error(
      "Missing database connection settings. Set DATABASE_URL or provide PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD, and PGSSLMODE."
    );
  }

  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);
  const encodedDatabase = encodeURIComponent(database);

  return `postgresql://${encodedUser}:${encodedPassword}@${host}:${port}/${encodedDatabase}?sslmode=${sslMode}`;
}

function getSslMode(connectionString) {
  try {
    return new URL(connectionString).searchParams.get("sslmode")?.toLowerCase() || "";
  } catch {
    return "";
  }
}

function getSslConfig(connectionString) {
  const sslMode = getSslMode(connectionString) || firstEnv("PGSSLMODE", "DB_SSLMODE", "POSTGRES_SSLMODE", "LUXDEVDB_SSLMODE").toLowerCase();

  if (sslMode === "disable") return undefined;

  const ca = firstEnv("PGSSLROOTCERT", "DB_SSL_ROOT_CERT", "POSTGRES_SSL_ROOT_CERT", "LUXDEVDB_SSL_ROOT_CERT");
  if (ca) {
    return { ca, rejectUnauthorized: process.env.PGSSL_REJECT_UNAUTHORIZED !== "false" };
  }

  return { rejectUnauthorized: false };
}

function getPool() {
  if (!pool) {
    const connectionString = buildConnectionString();
    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      ssl: getSslConfig(connectionString),
    });
  }

  return pool;
}

export function getAuthErrorMessage(error) {
  if (error?.code === "EMAIL_EXISTS") return error.message;

  const message = String(error?.message || "");
  if (message.includes("Missing database connection settings")) {
    return "Account storage is not configured yet. Please add the LuxDevHQ PostgreSQL connection settings and try again.";
  }

  if (message.includes("self-signed certificate") || message.includes("certificate")) {
    return "The database SSL settings need to be updated for the LuxDevHQ managed PostgreSQL connection.";
  }

  if (message.includes("password authentication failed") || message.includes("no pg_hba.conf")) {
    return "The database rejected the configured account credentials. Please verify the LuxDevHQ PostgreSQL username, password, host, port, database, and SSL mode.";
  }

  return "We could not create your account because the account database is unavailable. Please try again or contact LuxDevHQ support.";
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

async function ensureAuthTable(client) {
  await client.query(`CREATE SCHEMA IF NOT EXISTS ${SCHEMA_NAME}`);
  await client.query(`
    CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.${TABLE_NAME} (
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
        INSERT INTO ${SCHEMA_NAME}.${TABLE_NAME} (full_name, email, password_hash)
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
        FROM ${SCHEMA_NAME}.${TABLE_NAME}
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
      `UPDATE ${SCHEMA_NAME}.${TABLE_NAME} SET last_login_at = NOW() WHERE id = $1`,
      [user.id]
    );

    return { id: user.id, fullName: user.full_name, email: user.email };
  } finally {
    client.release();
  }
}
