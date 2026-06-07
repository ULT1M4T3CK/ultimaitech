import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getPendingSurveyForAttempt } from "@/server/actions/surveys";

type Props = {
  userId: string;
  attemptId: string;
};

export async function SurveyInvitationBanner({ userId, attemptId }: Props) {
  const invitation = await getPendingSurveyForAttempt(userId, attemptId);
  if (!invitation) return null;

  return (
    <Card className="card-learning border-primary/30 bg-primary/[0.04]">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <ClipboardList className="size-5" aria-hidden />
        </span>
        <div className="space-y-1">
          <CardTitle className="text-lg">Jouw feedback telt</CardTitle>
          <CardDescription>
            Vul de enquête <strong className="text-foreground">{invitation.survey.title}</strong> in — het duurt
            maar een paar minuten.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Link href={`/surveys/${invitation.token}`} className={cn(buttonVariants(), "gap-2")}>
          Enquête invullen
        </Link>
      </CardContent>
    </Card>
  );
}
