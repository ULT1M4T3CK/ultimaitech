import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { seedVptcContent } from "./vptc-seed";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@c95.local").toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "changeme123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      name: "Beheerder",
      passwordHash,
      role: Role.ADMIN,
    },
    update: {
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const admin = await prisma.user.findUniqueOrThrow({ where: { email: adminEmail } });

  const studentEmail = (process.env.SEED_STUDENT_EMAIL ?? "student@c95.test").toLowerCase().trim();
  const studentPassword = process.env.SEED_STUDENT_PASSWORD ?? "student123";
  const studentHash = await bcrypt.hash(studentPassword, 12);
  await prisma.user.upsert({
    where: { email: studentEmail },
    create: {
      email: studentEmail,
      name: "Teststudent",
      passwordHash: studentHash,
      role: Role.STUDENT,
      invitedById: admin.id,
    },
    update: {
      passwordHash: studentHash,
      role: Role.STUDENT,
      invitedById: admin.id,
      name: "Teststudent",
    },
  });

  const teacherCode = (process.env.SEED_TEACHER_INVITE ?? "DEMO-TEACHER").toUpperCase();
  await prisma.inviteCode.upsert({
    where: { code: teacherCode },
    create: {
      code: teacherCode,
      role: Role.TEACHER,
      createdById: admin.id,
    },
    update: {
      role: Role.TEACHER,
      createdById: admin.id,
    },
  });

  const course = await prisma.course.upsert({
    where: { slug: "vptc" },
    create: {
      name: "VPTC: Praktische Toets — Vragensets",
      slug: "vptc",
      description: "Nederlandse CCV praktische toets theorie — vragenset 1",
      order: 0,
      isActive: true,
    },
    update: {
      name: "VPTC: Praktische Toets — Vragensets",
      description: "Nederlandse CCV praktische toets theorie — vragenset 1",
    },
  });

  await seedVptcContent(prisma, course.id);

  console.log("\n=== C95 seed voltooid ===");
  console.log(`Beheerder login: ${adminEmail} / ${adminPassword}`);
  console.log(`Teststudent login: ${studentEmail} / ${studentPassword}`);
  console.log(`Instructeur uitnodigingscode: ${teacherCode}`);
  console.log(`Registreer instructeur op: /register/${teacherCode}`);
  console.log(`VPTC course slug: vptc — open /courses na inloggen als student.\n`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
