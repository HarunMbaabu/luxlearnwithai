import { randomBytes, pbkdf2Sync, timingSafeEqual } from "crypto";
import { Pool } from "pg";

let pool;

function getPool() {
  const connectionString = process.env.DATABASE_URL || process.env.LUXDEVDB_CONN;

  if (!connectionString) {
    throw new Error("Missing DATABASE_URL or LUXDEVDB_CONN");
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      ssl: connectionString.includes("sslmode=disable")
        ? undefined
        : { rejectUnauthorized: process.env.PGSSL_REJECT_UNAUTHORIZED !== "false" },
    });
  }

  return pool;
}

const SCHEMA_NAME = "prep_program_intakes";
const TABLE_NAME = "website_users";

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
