export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { verifyWebsiteUser } from "@/lib/auth-db";
import { createSessionCookie } from "@/lib/auth-session";

export async function POST(req) {
  try {
    const payload = await req.json();
    const email = String(payload?.email || "").trim();
    const password = String(payload?.password || "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await verifyWebsiteUser({ email, password });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, user });
    response.headers.set("Set-Cookie", createSessionCookie(user));
    return response;
  } catch (error) {
    console.error("WEBSITE USER LOGIN ERROR:", error);
    return NextResponse.json(
      { error: "We could not log you in. Please try again." },
      { status: 500 }
    );
  }
}
