import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/** True when the incoming request is HTTPS (origin or behind nginx/Cloudflare). */
function requestIsHttps(req: NextRequest): boolean {
  const forwarded = req.headers.get("x-forwarded-proto");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first === "https") return true;
    if (first === "http") return false;
  }
  return req.nextUrl.protocol === "https:";
}

/**
 * Read session JWT in middleware.
 * Auth.js uses `__Secure-…` session cookies on HTTPS; `getToken` must pass `secureCookie: true`
 * or it looks for the wrong cookie name. Do not rely on `NODE_ENV` alone (PM2 often omits it).
 */
export function getSessionToken(req: NextRequest) {
  return getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: requestIsHttps(req),
  });
}
