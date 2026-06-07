"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  inviteCode: z.string().min(4, "Uitnodigingscode is te kort.").max(64),
  name: z.string().min(1, "Naam is verplicht.").max(120),
  email: z.string().email("Voer een geldig e-mailadres in."),
  password: z.string().min(8, "Wachtwoord moet minimaal 8 tekens zijn.").max(128),
});

export type RegisterState = { ok: false; error: string } | { ok: true };

export async function registerWithInvite(
  _prev: RegisterState | undefined,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = schema.safeParse({
    inviteCode: String(formData.get("inviteCode") ?? ""),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Ongeldige invoer" };
  }

  const { inviteCode, name, email, password } = parsed.data;
  const code = inviteCode.trim().toUpperCase();
  const emailNorm = email.toLowerCase().trim();

  try {
    const invite = await db.inviteCode.findUnique({ where: { code } });
    if (!invite) return { ok: false, error: "Ongeldige uitnodigingscode." };
    if (invite.usedById) return { ok: false, error: "Deze uitnodigingscode is al gebruikt." };
    if (invite.expiresAt && invite.expiresAt < new Date()) {
      return { ok: false, error: "Deze uitnodigingscode is verlopen." };
    }

    const existing = await db.user.findUnique({ where: { email: emailNorm } });
    if (existing) return { ok: false, error: "Er bestaat al een account met dit e-mailadres." };

    const passwordHash = await bcrypt.hash(password, 12);

    await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: emailNorm,
          name: name.trim(),
          passwordHash,
          role: invite.role,
          invitedById: invite.createdById,
        },
      });
      await tx.inviteCode.update({
        where: { code },
        data: { usedById: user.id },
      });
    });

    return { ok: true };
  } catch {
    return { ok: false, error: "Registratie mislukt. Probeer het opnieuw." };
  }
}
