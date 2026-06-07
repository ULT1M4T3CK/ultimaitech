import { Resend } from "resend";
import { absoluteUrl } from "@/lib/base-path";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "C95 Portal <onboarding@resend.dev>";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export type SendSurveyEmailParams = {
  to: string;
  studentName: string;
  surveyTitle: string;
  surveyPath: string;
  origin?: string;
};

export async function sendSurveyEmail(params: SendSurveyEmailParams): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set; skipping survey email to", params.to);
    return false;
  }

  const origin = params.origin ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const link = absoluteUrl(params.surveyPath, origin);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `Enquête: ${params.surveyTitle}`,
    html: `
      <p>Hallo ${escapeHtml(params.studentName)},</p>
      <p>We horen graag jouw feedback. Vul de enquête <strong>${escapeHtml(params.surveyTitle)}</strong> in via onderstaande link.</p>
      <p style="margin: 24px 0;">
        <a href="${link}" style="display:inline-block;padding:12px 24px;background:#c2185b;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">
          Enquête invullen
        </a>
      </p>
      <p style="color:#666;font-size:14px;">Of kopieer deze link: <a href="${link}">${link}</a></p>
      <p style="color:#666;font-size:14px;">Met vriendelijke groet,<br/>C95 Portal</p>
    `,
  });

  if (error) {
    console.error("[email] Failed to send survey email:", error);
    return false;
  }

  return true;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
