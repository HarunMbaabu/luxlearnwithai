export const runtime = "nodejs";

import { deleteConfig, updateConfig } from "@/lib/database-configurations";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const result = await updateConfig(id, await req.json());
    if (result.notFound) return Response.json({ error: "Configuration not found." }, { status: 404 });
    if (result.error) return Response.json({ error: result.error }, { status: 400 });
    return Response.json({ configuration: result.config });
  } catch (error) {
    console.error("DATABASE CONFIG UPDATE ERROR:", error);
    return Response.json({ error: "Unable to update database configuration." }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    const deleted = await deleteConfig(id);
    if (!deleted) return Response.json({ error: "Configuration not found." }, { status: 404 });
    return Response.json({ success: true });
  } catch (error) {
    console.error("DATABASE CONFIG DELETE ERROR:", error);
    return Response.json({ error: "Unable to delete database configuration." }, { status: 500 });
  }
}
