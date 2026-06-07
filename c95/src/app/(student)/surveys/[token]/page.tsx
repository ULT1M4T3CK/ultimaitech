import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSurveyInvitationByToken } from "@/server/actions/surveys";
import { SurveyFillForm } from "./survey-fill-form";

type Props = { params: Promise<{ token: string }> };

export default async function SurveyFillPage({ params }: Props) {
  const { token } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/surveys/${token}`)}`);
  }

  const invitation = await getSurveyInvitationByToken(token);
  if (!invitation) notFound();

  if (session.user.id !== invitation.userId && session.user.role === "STUDENT") {
    notFound();
  }

  if (invitation.response || invitation.completedAt) {
    return (
      <div className="mx-auto max-w-lg space-y-6 py-10">
        <Card className="card-learning text-center">
          <CardHeader>
            <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden />
            <CardTitle>Bedankt!</CardTitle>
            <CardDescription>Je hebt deze enquête al ingevuld.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard" className={cn(buttonVariants())}>
              Terug naar dashboard
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Enquête</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{invitation.survey.title}</h1>
        {invitation.survey.description ? (
          <p className="text-muted-foreground">{invitation.survey.description}</p>
        ) : null}
      </header>

      <SurveyFillForm
        invitationId={invitation.id}
        questions={invitation.survey.questions.map((q) => ({
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          required: q.required,
          options: Array.isArray(q.options) ? (q.options as string[]) : [],
        }))}
      />
    </div>
  );
}
