# C95 — CCV question sets platform

Next.js (App Router) + PostgreSQL + Prisma + NextAuth e-learning app for driving-school **CCV-aligned content**: **courses** → **question sets (vragensets)** → **sections (onderdelen)** → **questions**, with guided auto-graded exams, study mode for instructor-graded items, and a **live exam** flow for teachers.

## Prerequisites

- Node.js 20+
- Docker (optional, for local PostgreSQL)

## Setup

1. **Environment**

   ```bash
   cp .env.example .env
   ```

   Set `AUTH_SECRET` (e.g. `openssl rand -base64 32`), and `DATABASE_URL` if not using the default from `.env.example`.

2. **Database**

   Compose maps Postgres to **host port 5433** so it does not clash with a local PostgreSQL on 5432. `DATABASE_URL` in `.env.example` matches that.

   ```bash
   docker compose up -d
   npx prisma migrate deploy
   ```

   If you prefer `migrate dev` during development:

   ```bash
   npx prisma migrate dev
   ```

3. **Seed (admin + test student + VPTC course + teacher invite)**

   ```bash
   npm run db:seed
   ```

   The script prints an **admin** login, a **student test account** (default `student@c95.test` / `student123`, overridable with `SEED_STUDENT_EMAIL` / `SEED_STUDENT_PASSWORD`), and a **teacher invite code** (default `DEMO-TEACHER`, overridable with `SEED_TEACHER_INVITE`). It (re)seeds the **VPTC** course (`slug: vptc`) with **Vragenset 1** (Dutch practical-test theory structure).

   Register teachers at `/register/{CODE}`. Authors use **Courses** (`/teacher/courses`) → pick a course → **Edit content** on a question set → sections and **Add a new question**. **Live exam** (`/teacher/live-exam`) records instructor grades for every question in a set.

   Students open **Courses** at `/courses` (dashboard also lists courses). Old `/topics/...` URLs redirect to the matching `/courses/...` route.

4. **Run**

   ```bash
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## AWS deployment

Dev-sized infrastructure (EC2 + RDS PostgreSQL + S3) is defined in [`infra/`](infra/). See [`infra/README.md`](infra/README.md) for architecture, cost estimate (~$27–35/mo in eu-west-1), and steps:

```bash
cd infra && npm install && npx cdk bootstrap && npx cdk deploy
```

Then configure secrets, `.env` on the instance, and deploy app code with [`scripts/deploy-c95.sh`](scripts/deploy-c95.sh).

## Production (reverse proxy + subpath, e.g. `/c95`)

1. **Build** with `BASE_PATH` set (e.g. `BASE_PATH=/c95` in `.env` or CI env) so `next.config.ts` applies `basePath` and `NEXT_PUBLIC_BASE_PATH` is embedded for the client.
2. **`NEXTAUTH_URL` must be the public origin only** — e.g. `https://ultimaitech.com` — **not** `https://ultimaitech.com/c95`. A path on that URL makes Auth.js treat it as its own `basePath` and breaks `/api/auth` routing next to Next’s `basePath`.
3. On the server: sync the build, ensure `.env` matches the above, run `npm run build` (or use your CI artifact), then restart the process (e.g. `pm2 restart c95`).

   Or from your laptop (after `chmod +x scripts/deploy-c95.sh` once):

   ```bash
   C95_SSH_IDENTITY=~/path/to/your-key.pem ./scripts/deploy-to-aws.sh

   # (same as: C95_SSH=ec2-user@16.16.169.117 C95_REMOTE_DIR=/home/ec2-user/c95 ./scripts/deploy-c95.sh)
   ```

   Amazon Linux EC2 typically uses **`ec2-user`**, not `ubuntu`. The script prepends **`~/node22/bin`** to `PATH` when that folder exists (Node 22 for Next.js 16). It removes **`node_modules`** before **`npm ci`** so Linux native optional deps (e.g. Tailwind Oxide) match the server.

   The script `rsync`s the tree (skipping `node_modules`, `.next`, `.git`, `.env`), then runs `npm ci`, `npm run build`, and **`pm2 start ecosystem.config.cjs`** (pins **Node 22** from `~/node22` so `next start` does not pick system Node 18 — avoids **502** when nothing listens on port 3000).

## Roles

- **STUDENT** — `/courses`, question sets, section hub, auto-graded **exam**, **study** mode (instructor items), results.
- **TEACHER** — courses & question sets CRUD, sections & questions, student list, invite codes, **live exam** sessions, reports.
- **ADMIN** — same as teacher plus creating **teacher** invite codes.

## Question images

Teachers can upload JPEG/PNG/WebP (max 2MB) in **Content**. Files are stored under `public/uploads/questions/` for local development. For production, configure object storage and adjust the upload route.

## License

Private / internal use for the driving school project.
