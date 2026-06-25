export const runtime = "nodejs";

import { getAuthErrorMessage, verifyWebsiteUser } from "@/lib/auth-db";

export async function POST(req) {
  try {
    const payload = await req.json();
    const email = String(payload?.email || "").trim();
    const password = String(payload?.password || "");

    if (!email || !password) {
      return Response.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await verifyWebsiteUser({ email, password });

    if (!user) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    return Response.json({ success: true, user });
  } catch (error) {
    console.error("WEBSITE USER LOGIN ERROR:", error);
    return Response.json({ error: getAuthErrorMessage(error) }, { status: 500 });
  }
}
