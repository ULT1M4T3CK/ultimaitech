#!/usr/bin/env bash
# Sync this repo to a server and rebuild (Next.js + PM2).
#
# Usage:
#   C95_SSH=user@host C95_REMOTE_DIR=~/c95 ./scripts/deploy-c95.sh
#   C95_SSH=ec2-user@1.2.3.4 C95_SSH_IDENTITY=~/keys/app.pem C95_REMOTE_DIR=/home/ec2-user/c95 ./scripts/deploy-c95.sh
#   ./scripts/deploy-c95.sh user@host ~/c95
#
# Optional: C95_SSH_IDENTITY — path to private key (-i for ssh/rsync).
#
# Prerequisites on the server: Node 20+, npm, pm2, Postgres, .env with AUTH_SECRET, DATABASE_URL, BASE_PATH=/c95,
# and NEXTAUTH_URL=https://ultimaitech.com (origin only — no /c95 path).

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SSH_TARGET="${C95_SSH:-${1:-}}"
REMOTE_DIR="${C95_REMOTE_DIR:-${2:-~/c95}}"
IDENTITY="${C95_SSH_IDENTITY:-}"
RSYNC_SSH=(ssh -o BatchMode=yes)
if [[ -n "$IDENTITY" ]]; then
  RSYNC_SSH+=( -i "$IDENTITY" )
fi

if [[ -z "$SSH_TARGET" ]]; then
  echo "Set C95_SSH (or pass user@host as first arg)." >&2
  echo "Example: C95_SSH=ec2-user@ec2-xxx.compute.amazonaws.com C95_REMOTE_DIR=/home/ec2-user/c95 $0" >&2
  exit 1
fi

echo "Deploying from $ROOT -> $SSH_TARGET:$REMOTE_DIR"

rsync -avz --progress \
  -e "${RSYNC_SSH[*]}" \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude .env \
  --exclude '.env.*' \
  --exclude 'public/uploads/**' \
  --exclude '.cursor' \
  --exclude 'infra/node_modules' \
  --exclude 'infra/cdk.out' \
  --exclude 'infra/dist' \
  "$ROOT/" "$SSH_TARGET:$REMOTE_DIR/"

"${RSYNC_SSH[@]}" "$SSH_TARGET" bash -s -- "$REMOTE_DIR" <<'REMOTE'
set -euo pipefail
DIR="${1/#\~/$HOME}"
cd "$DIR"
if [[ -x "$HOME/node22/bin/node" ]]; then
  export PATH="$HOME/node22/bin:$PATH"
fi
if [[ ! -f .env ]]; then
  echo "Missing .env on server at $DIR — create it first (AUTH_SECRET, DATABASE_URL, BASE_PATH, NEXTAUTH_URL)." >&2
  exit 1
fi
# Fresh install avoids wrong platform optional deps (e.g. @tailwindcss/oxide) if the lock was used on another OS.
rm -rf node_modules
npm ci
npm run build
if [[ -f ecosystem.config.cjs ]]; then
  pm2 delete c95 2>/dev/null || true
  pm2 start ecosystem.config.cjs
else
  pm2 restart c95 --update-env || pm2 start npm --name c95 -- start
fi
REMOTE

echo "Done. Verify NEXTAUTH_URL on the server is the site origin only (e.g. https://ultimaitech.com), not .../c95."
