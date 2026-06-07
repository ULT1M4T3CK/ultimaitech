import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  ...(basePath ? { basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
