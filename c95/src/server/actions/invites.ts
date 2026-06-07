"use server";

import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
function requireTeacherOrAdmin() {
  return auth().then((s) => {
    const r = s?.user?.role;
    if (r !== "TEACHER" && r !== "ADMIN") throw new Error("Niet geautoriseerd");
    return s!;
  });
}

export async function createInviteCodeForRole(role: "STUDENT" | "TEACHER") {
  const session = await requireTeacherOrAdmin();
  if (role === "TEACHER" && session.user.role !== "ADMIN") {
    throw new Error("Alleen beheerders kunnen instructeuruitnodigingscodes aanmaken.");
  }

  const code = nanoid(10).toUpperCase();
  await db.inviteCode.create({
    data: {
      code,
      role,
      createdById: session.user.id,
    },
  });
  revalidatePath("/teacher/students");
  revalidatePath("/teacher");
  return { code };
}

const revokeSchema = z.object({ code: z.string().min(1) });

export async function revokeInviteCode(formData: FormData) {
  await requireTeacherOrAdmin();
  const parsed = revokeSchema.safeParse({ code: String(formData.get("code") ?? "") });
  if (!parsed.success) throw new Error("Ongeldige code");
  const invite = await db.inviteCode.findUnique({ where: { code: parsed.data.code } });
  if (!invite || invite.usedById) return;
  await db.inviteCode.delete({ where: { code: invite.code } });
  revalidatePath("/teacher/students");
}

export async function listUnusedInvitesForUser() {
  const session = await requireTeacherOrAdmin();
  return db.inviteCode.findMany({
    where: {
      usedById: null,
      ...(session.user.role === "ADMIN" ? {} : { createdById: session.user.id }),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function listStudentsForTeacher() {
  const session = await requireTeacherOrAdmin();
  if (session.user.role === "ADMIN") {
    return db.user.findMany({
      where: { role: "STUDENT" },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, createdAt: true },
    });
  }
  return db.user.findMany({
    where: { role: "STUDENT", invitedById: session.user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, createdAt: true },
  });
}
