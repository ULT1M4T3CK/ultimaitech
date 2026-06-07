"use client";

import { SessionProvider } from "next-auth/react";
import { getBasePath } from "@/lib/base-path";

/** Path prefix for Auth.js HTTP API (must match Next route `app/api/auth/[...nextauth]` plus Next `basePath`). */
function authClientBasePath(): string {
  const base = getBasePath();
  return base ? `${base}/api/auth` : "/api/auth";
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider basePath={authClientBasePath()}>{children}</SessionProvider>;
}
