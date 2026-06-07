/** App path prefix when deployed under a subpath (e.g. /c95). Empty in local dev. */
export function getBasePath(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.BASE_PATH ?? "";
  return raw.replace(/\/$/, "");
}

/** Relative app path including basePath (e.g. `/c95/teacher`). */
export function withBasePath(path: string): string {
  const base = getBasePath();
  let normalized = path.startsWith("/") ? path : `/${path}`;
  if (base && (normalized === base || normalized.startsWith(`${base}/`))) {
    return normalized;
  }
  if (!base) return normalized;
  return `${base}${normalized}`;
}

/**
 * Absolute URL for redirects. `new URL("/teacher", "https://host/c95/login")` drops `/c95`;
 * this keeps the basePath segment.
 */
export function absoluteUrl(path: string, origin: string | URL): string {
  return new URL(withBasePath(path), origin).href;
}

/** NextAuth sometimes returns URLs without basePath; rewrite when needed. */
export function ensureBasePathInUrl(url: string, fallbackPath = "/"): string {
  const base = getBasePath();
  if (!base) return url;
  try {
    const u = new URL(url);
    if (u.pathname === base || u.pathname.startsWith(`${base}/`)) return url;
    const stripped = u.pathname.startsWith("/") ? u.pathname : `/${u.pathname}`;
    u.pathname = withBasePath(stripped);
    return u.href;
  } catch {
    return absoluteUrl(fallbackPath, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  }
}
