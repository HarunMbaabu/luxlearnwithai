export const runtime = "nodejs";

import { testDatabaseConnection } from "@/lib/database-configurations";

export async function POST(req) {
  try {
    const result = await testDatabaseConnection(await req.json());
    return Response.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error("DATABASE CONFIG TEST ERROR:", error);
    return Response.json({ success: false, error: "Unable to test this connection." }, { status: 500 });
  }
}
