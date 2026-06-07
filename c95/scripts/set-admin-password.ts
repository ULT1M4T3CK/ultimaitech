import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const email = (process.env.ADMIN_EMAIL ?? "admin@c95.local").toLowerCase().trim();
const password = process.env.NEW_PASS ?? "test123!";

async function main() {
  const hash = await bcrypt.hash(password, 12);
  const prisma = new PrismaClient();
  const u = await prisma.user.update({
    where: { email },
    data: { passwordHash: hash },
  });
  console.log(`Updated password for ${u.email} (${u.role})`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
