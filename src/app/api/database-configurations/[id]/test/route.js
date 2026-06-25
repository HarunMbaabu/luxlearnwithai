export const runtime = "nodejs";

import { configWithPassword, getConfig, persistTestResult, testDatabaseConnection } from "@/lib/database-configurations";

export async function POST(_req, { params }) {
  try {
    const { id } = await params;
    const row = await getConfig(id);
    if (!row) return Response.json({ success: false, error: "Configuration not found." }, { status: 404 });
    const result = await testDatabaseConnection(configWithPassword(row));
    const configuration = await persistTestResult(id, result);
    return Response.json({ ...result, configuration }, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error("DATABASE CONFIG SAVED TEST ERROR:", error);
    return Response.json({ success: false, error: "Unable to test this saved connection." }, { status: 500 });
  }
}
