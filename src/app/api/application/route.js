export const runtime = "nodejs";

import { Pool } from "pg";

const connectionString = process.env.LUXDEVDB_CONN;

if (!connectionString) {
  throw new Error("Missing LUXDEVDB_CONN");
}

function getSslMode(cs) {
  try {
    const u = new URL(cs);
    return (u.searchParams.get("sslmode") || "").toLowerCase();
  } catch {
    const m = cs?.match(/(?:\?|&)sslmode=([^&]+)/i);
    return (m?.[1] || "").toLowerCase();
  }
}

const sslMode =
  getSslMode(connectionString) ||
  (process.env.PGSSLMODE || process.env.LUX_PGSSLMODE || "").toLowerCase();

const useSsl = sslMode ? sslMode !== "disable" : true;

const sslRootCert = process.env.PGSSLROOTCERT;

const pool = new Pool({
  connectionString,
  ssl: useSsl
    ? {
        rejectUnauthorized: true,
        ca: sslRootCert,
      }
    : undefined,
});

function quoteIdent(name) {
  const s = String(name);
  if (!s) throw new Error("Invalid identifier");
  return `"${s.replace(/"/g, '""')}"`;
}

function normalizePhone(code, phone) {
  const c = String(code || "").trim();
  let p = String(phone || "").trim();
  if (!p) return "";
  if (p.startsWith("+")) return p;
  p = p.replace(/\s+/g, "");
  if (p.startsWith("0")) p = p.slice(1);
  if (c.startsWith("+")) return `${c}${p}`;
  if (c) return `+${c.replace(/^\+/, "")}${p}`;
  return p;
}

function sanitizeTableName(formType) {
  const s = String(formType || "").trim();
  if (!s) return "";
  return s.replace(/[^a-zA-Z0-9_]/g, "");
}

function toRow(input) {
  const row = { ...input };
  row.phone_number = normalizePhone(row.code, row.phone);
  delete row.code;
  delete row.phone;
  return row;
}

async function ensureSchema(client, schemaName) {
  await client.query(`CREATE SCHEMA IF NOT EXISTS ${quoteIdent(schemaName)}`);
}

async function ensureTableBase(client, schemaName, tableName) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS ${quoteIdent(schemaName)}.${quoteIdent(tableName)} (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function getExistingColumns(client, schemaName, tableName) {
  const { rows } = await client.query(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = $1 AND table_name = $2
    `,
    [schemaName, tableName]
  );
  return new Set(rows.map((r) => r.column_name));
}

function inferPgType(key, value) {
  if (value === null || value === undefined) return "TEXT";
  if (typeof value === "number") return Number.isInteger(value) ? "BIGINT" : "NUMERIC";
  if (typeof value === "boolean") return "BOOLEAN";
  if (Array.isArray(value) || typeof value === "object") return "JSONB";
  return "TEXT";
}

async function ensureColumns(client, schemaName, tableName, row) {
  const existing = await getExistingColumns(client, schemaName, tableName);

  for (const [k, v] of Object.entries(row)) {
    if (k === "id" || k === "created_at") continue;
    if (v === undefined) continue;
    if (existing.has(k)) continue;

    const t = inferPgType(k, v);

    await client.query(
      `ALTER TABLE ${quoteIdent(schemaName)}.${quoteIdent(tableName)} ADD COLUMN ${quoteIdent(k)} ${t}`
    );

    existing.add(k);
  }
}

function buildInsert(schemaName, tableName, row) {
  const entries = Object.entries(row).filter(
    ([k, v]) => k !== "id" && k !== "created_at" && v !== undefined
  );

  const cols = entries.map(([k]) => quoteIdent(k));
  const placeholders = entries.map((_, i) => `$${i + 1}`);

  const values = entries.map(([_, v]) => {
    if (v === null || v === undefined || v === "") return null;
    if (typeof v === "string") return v;
    if (typeof v === "number") return v;
    if (typeof v === "boolean") return v;
    return JSON.stringify(v);
  });

  const sql = `INSERT INTO ${quoteIdent(schemaName)}.${quoteIdent(
    tableName
  )} (${cols.join(", ")}) VALUES (${placeholders.join(", ")})`;

  return { sql, values };
}

async function existsByEmailPhone(client, schemaName, tableName, email, phoneNumber) {
  if (!email || !phoneNumber) return false;
  const { rows } = await client.query(
    `
      SELECT 1
      FROM ${quoteIdent(schemaName)}.${quoteIdent(tableName)}
      WHERE email = $1 AND phone_number = $2
      LIMIT 1
    `,
    [String(email).trim(), String(phoneNumber).trim()]
  );
  return rows.length > 0;
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const formType = payload?.formType;
    const data = payload?.data;

    if (!formType || !data || typeof data !== "object") {
      return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
    }

    const schemaName = "applications";
    const tableName = sanitizeTableName(formType);

    if (!tableName) {
      return new Response(JSON.stringify({ error: "Invalid formType" }), { status: 400 });
    }

    const row = toRow(data);

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await ensureSchema(client, schemaName);
      await ensureTableBase(client, schemaName, tableName);
      await ensureColumns(client, schemaName, tableName, row);

      const alreadyExists = await existsByEmailPhone(
        client,
        schemaName,
        tableName,
        row.email,
        row.phone_number
      );

      if (alreadyExists) {
        await client.query("ROLLBACK");
        return new Response(
          JSON.stringify({
            error: "EMAIL_PHONE_EXISTS",
            message: "This email and phone number already exist in our system.",
          }),
          { status: 409 }
        );
      }

      const { sql, values } = buildInsert(schemaName, tableName, row);
      await client.query(sql, values);

      await client.query("COMMIT");
      return Response.json({ success: true });
    } catch (e) {
      try {
        await client.query("ROLLBACK");
      } catch {}
      throw e;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("APPLICATION SAVE ERROR:", error);
    return new Response(JSON.stringify({ error: "Failed to save application" }), {
      status: 500,
    });
  }
}
