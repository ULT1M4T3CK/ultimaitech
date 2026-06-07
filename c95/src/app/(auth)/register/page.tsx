import Link from "next/link";
import { AuthSplitShell } from "@/components/auth/auth-split-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RegisterLandingPage() {
  return (
    <AuthSplitShell
      eyebrow="Registratie op uitnodiging"
      title="Meld je aan met een code van je instructeur"
      description="C95-accounts worden aangemaakt via beveiligde uitnodigingslinks. Vraag je instructeur of beheerder om je persoonlijke registratielink."
    >
      <Card className="card-learning border-border/70 shadow-lg shadow-black/[0.06]">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">Account aanmaken</CardTitle>
          <CardDescription className="text-base">Je hebt een geldige uitnodigingslink of -code nodig om verder te gaan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">Zo werkt het</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Open de link die je hebt ontvangen (die ziet er zo uit:{" "}
              <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs text-foreground">
                …/register/ABC123XY
              </code>
              ), of vraag je instructeur om de link opnieuw te sturen.
            </p>
          </div>
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex h-11 w-full justify-center rounded-lg")}
          >
            Terug naar inloggen
          </Link>
        </CardContent>
      </Card>
    </AuthSplitShell>
  );
}
