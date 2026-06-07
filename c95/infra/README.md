# C95 — AWS deployment (dev)

Infrastructure for the C95 Next.js + PostgreSQL app using **EC2 + PM2** (matches [`scripts/deploy-c95.sh`](../scripts/deploy-c95.sh)) and managed **RDS PostgreSQL 16**.

## Architecture

| Component | AWS service | Why |
|-----------|-------------|-----|
| App (Next.js 16, SSR) | **EC2** `t4g.small` (ARM) | Same PM2 workflow you already use; no container refactor |
| Database | **RDS PostgreSQL 16** `db.t4g.micro` | Managed backups, private subnet, encrypted |
| Question uploads | **S3** (private, SSE-S3) | Production-ready replacement for local `public/uploads` |
| Secrets | **Secrets Manager** | `c95/database` (auto), `c95/app` (manual) |
| Network | **VPC** 1 AZ, no NAT | Dev cost savings; EC2 in public subnet, RDS isolated |

```mermaid
flowchart LR
  User --> Proxy[Your HTTPS proxy or ALB]
  Proxy --> EC2[EC2 PM2 Next.js :3000]
  EC2 --> RDS[(RDS PostgreSQL)]
  EC2 --> S3[S3 uploads]
  EC2 --> SM[Secrets Manager]
```

## Estimated monthly cost (dev, eu-west-1)

| Service | Approx. |
|---------|---------|
| EC2 t4g.small (Linux) | ~$12–15 |
| RDS db.t4g.micro PostgreSQL | ~$12–15 |
| EBS 20 GB | ~$2 |
| S3 + Secrets Manager | ~$1–3 |
| **Total** | **~$27–35 / month** |

No NAT Gateway (saves ~$32/mo). Add ALB + ACM later for production HTTPS.

## Prerequisites

- AWS CLI configured (`aws configure` or SSO)
- Node.js 20+ locally
- CDK bootstrap once per account/region: `npx cdk bootstrap`

## Deploy infrastructure

```bash
cd infra
npm install
export CDK_DEFAULT_REGION=eu-west-1   # or your region
npx cdk deploy
```

Note the outputs: **Ec2PublicIp**, **RdsEndpoint**, **UploadsBucketName**, **DeployHint**.

## Configure secrets

1. **Database** — auto-generated in `c95/database`. Build `DATABASE_URL`:

   ```bash
   aws secretsmanager get-secret-value --secret-id c95/database --query SecretString --output text
   ```

   Format: `postgresql://c95:PASSWORD@RDS_HOST:5432/c95?sslmode=require`

2. **App** — update `c95/app` JSON manually:

   ```json
   {
     "AUTH_SECRET": "openssl rand -base64 32",
     "NEXTAUTH_URL": "https://your-domain.com",
     "BASE_PATH": "/c95",
     "RESEND_API_KEY": "re_...",
     "RESEND_FROM_EMAIL": "C95 <noreply@yourdomain.com>"
   }
   ```

## Server `.env`

SSH to the instance (SSM Session Manager is enabled, or use your key pair if you attach one):

```bash
# On EC2 as ec2-user
cat > /home/ec2-user/c95/.env <<'EOF'
DATABASE_URL=postgresql://...
AUTH_SECRET=...
NEXTAUTH_URL=https://your-origin-only.com
BASE_PATH=/c95
EOF
```

Run migrations once:

```bash
cd /home/ec2-user/c95 && npx prisma migrate deploy && npm run db:seed
```

## Deploy application code

From your laptop (same as today):

```bash
C95_SSH_IDENTITY=~/.ssh/your-key.pem ./scripts/deploy-to-aws.sh

# Default host: ec2-user@16.16.169.117
```

Restrict security group port 22 to your IP after first login.

## Next steps (production)

- Application Load Balancer + ACM certificate
- RDS `deletionProtection: true`, Multi-AZ
- Wire uploads to S3 in [`src/app/api/upload/route.ts`](../src/app/api/upload/route.ts)
- Restrict EC2 :3000 to ALB security group only

## Teardown

```bash
cd infra && npx cdk destroy
```

RDS final snapshot is kept per stack removal policy.
