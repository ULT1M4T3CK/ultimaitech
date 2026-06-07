#!/usr/bin/env bash
# Deploy C95 to the AWS EC2 host (default: 16.16.169.117).
#
# Usage:
#   C95_SSH_IDENTITY=~/path/to/key.pem ./scripts/deploy-to-aws.sh
#
# Optional overrides:
#   C95_SSH=ec2-user@16.16.169.117
#   C95_REMOTE_DIR=/home/ec2-user/c95

set -euo pipefail

export C95_SSH="${C95_SSH:-ec2-user@16.16.169.117}"
export C95_REMOTE_DIR="${C95_REMOTE_DIR:-/home/ec2-user/c95}"
export C95_SSH_IDENTITY="${C95_SSH_IDENTITY:-$HOME/Documents/ultimaitech.pem}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
exec "$ROOT/scripts/deploy-c95.sh"
