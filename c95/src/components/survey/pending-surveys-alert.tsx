import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getPendingSurveysForUser } from "@/server/actions/surveys";

export async function PendingSurveysAlert({ userId }: { userId: string }) {
  const pending = await getPendingSurveysForUser(userId);
  if (pending.length === 0) return null;

  return (
    <Card className="card-learning border-primary/25">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ClipboardList className="size-5 text-primary" aria-hidden />
          Openstaande enquêtes
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
            {pending.length}
          </span>
        </CardTitle>
        <CardDescription>Je hebt nog {pending.length} enquête{pending.length === 1 ? "" : "s"} te voltooien.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {pending.slice(0, 3).map((inv) => (
          <Link
            key={inv.id}
            href={`/surveys/${inv.token}`}
            className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
          >
            {inv.survey.title}
          </Link>
        ))}
        {pending.length > 3 ? (
          <p className="text-xs text-muted-foreground">+ {pending.length - 3} meer in je dashboard</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
