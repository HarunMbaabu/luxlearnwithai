import { createHmac, timingSafeEqual } from "crypto";

export const AUTH_COOKIE_NAME = "luxdevhq_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getSessionSecret() {
  return process.env.AUTH_SESSION_SECRET || process.env.NEXTAUTH_SECRET || "luxdevhq-development-session-secret";
}

function sign(value) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createSessionCookie(user) {
  const payload = base64UrlEncode(
    JSON.stringify({
      id: user.id,
      fullName: user.fullName || user.full_name,
      email: user.email,
      issuedAt: Date.now(),
    })
  );
  const signature = sign(payload);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  return `${AUTH_COOKIE_NAME}=${payload}.${signature}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}${secure}`;
}

export function clearSessionCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export function verifySessionCookie(cookieValue) {
  if (!cookieValue || !cookieValue.includes(".")) return null;

  const [payload, signature] = cookieValue.split(".");
  const expected = sign(payload);
  const providedBuffer = Buffer.from(signature || "");
  const expectedBuffer = Buffer.from(expected);

  if (providedBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return null;

  try {
    return JSON.parse(base64UrlDecode(payload));
  } catch {
    return null;
  }
}
