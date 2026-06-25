export const runtime = "nodejs";

import { createWebsiteUser, getAuthErrorMessage } from "@/lib/auth-db";
import { createSessionCookie } from "@/lib/auth-session";

function validatePayload(payload) {
  const fullName = String(payload?.fullName || "").trim();
  const email = String(payload?.email || "").trim();
  const password = String(payload?.password || "");

  if (fullName.length < 2) return "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const validationError = validatePayload(payload);

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const user = await createWebsiteUser(payload);
    return Response.json(
      { success: true, user },
      {
        headers: {
          "Set-Cookie": createSessionCookie(user),
        },
      }
    );
  } catch (error) {
    console.error("WEBSITE USER REGISTER ERROR:", error);

    const status = error.code === "EMAIL_EXISTS" ? 409 : 500;
    return Response.json({ error: getAuthErrorMessage(error) }, { status });
  }
}
