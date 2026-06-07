/**
 * PM2 config — use Node 22 on EC2 (`~/node22`) so `next start` matches the Next.js 16 engine requirement.
 * Start from app root: `pm2 start ecosystem.config.cjs`
 */
const path = require("path");
const fs = require("fs");

const home = process.env.HOME || "";
const node22 = path.join(home, "node22", "bin", "node");
const interpreter = fs.existsSync(node22) ? node22 : process.execPath || "node";
const nodeBinDir = path.join(home, "node22", "bin");
const pathPrefix = fs.existsSync(nodeBinDir) ? `${nodeBinDir}:` : "";

module.exports = {
  apps: [
    {
      name: "c95",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start",
      interpreter,
      env: {
        NODE_ENV: "production",
        ...(pathPrefix ? { PATH: `${pathPrefix}${process.env.PATH || ""}` } : {}),
      },
    },
  ],
};
