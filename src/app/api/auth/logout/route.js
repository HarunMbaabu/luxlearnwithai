export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth-session";

export async function POST(req) {
  const response = NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  response.headers.set("Set-Cookie", clearSessionCookie());
  return response;
}
