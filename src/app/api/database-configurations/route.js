export const runtime = "nodejs";

import { createConfig, listConfigs } from "@/lib/database-configurations";

export async function GET() {
  try {
    return Response.json({ configurations: await listConfigs() });
  } catch (error) {
    console.error("DATABASE CONFIG LIST ERROR:", error);
    return Response.json({ error: "Unable to load database configurations." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const result = await createConfig(await req.json());
    if (result.error) return Response.json({ error: result.error }, { status: 400 });
    return Response.json({ configuration: result.config }, { status: 201 });
  } catch (error) {
    console.error("DATABASE CONFIG CREATE ERROR:", error);
    return Response.json({ error: "Unable to create database configuration." }, { status: 500 });
  }
}
