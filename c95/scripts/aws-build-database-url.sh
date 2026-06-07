#!/usr/bin/env bash
# Print a DATABASE_URL from Secrets Manager + RDS endpoint (run after `cdk deploy`).
set -euo pipefail

REGION="${AWS_REGION:-${CDK_DEFAULT_REGION:-eu-west-1}}"
SECRET_ID="${C95_DB_SECRET:-c95/database}"

JSON="$(aws secretsmanager get-secret-value --region "$REGION" --secret-id "$SECRET_ID" --query SecretString --output text)"
USER="$(echo "$JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['username'])")"
PASS="$(echo "$JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['password'])")"

RDS_HOST="${C95_RDS_HOST:?Set C95_RDS_HOST from CDK output RdsEndpoint (host:port)}"
DB_NAME="${C95_DB_NAME:-c95}"

echo "postgresql://${USER}:${PASS}@${RDS_HOST}/${DB_NAME}?sslmode=require"
