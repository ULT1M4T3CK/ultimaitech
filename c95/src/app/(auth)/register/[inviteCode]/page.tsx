"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AuthSplitShell } from "@/components/auth/auth-split-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { registerWithInvite } from "@/server/actions/register";
import { withBasePath } from "@/lib/base-path";

export default function RegisterWithCodePage() {
  const params = useParams();
  const inviteCode = String(params.inviteCode ?? "");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthSplitShell
      eyebrow={`Uitnodigingscode · ${inviteCode}`}
      title="Maak je leeraccount aan"
      description="Met dit account werk je CCV-vragensets door, volg je je voortgang en bekijk je resultaten. Deze uitnodiging kan maar één keer worden gebruikt."
    >
      <Card className="card-learning border-border/70 shadow-lg shadow-black/[0.06]">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">Registreren</CardTitle>
          <CardDescription className="font-mono text-sm text-primary">Code: {inviteCode}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              const form = e.currentTarget;
              const fd = new FormData(form);
              startTransition(async () => {
                const res = await registerWithInvite(undefined, fd);
                if (!res.ok) {
                  setError(res.error);
                  return;
                }
                const email = String(fd.get("email") ?? "");
                const password = String(fd.get("password") ?? "");
                await signIn("credentials", {
                  email,
                  password,
                  callbackUrl: withBasePath("/dashboard"),
                });
              });
            }}
          >
            <input type="hidden" name="inviteCode" value={inviteCode} />
            {error ? (
              <Alert variant="destructive" className="border-destructive/30">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Volledige naam
              </Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                required
                className="h-11 rounded-lg border-border/80"
                placeholder="Je naam zoals die voor instructeurs zichtbaar is"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="h-11 rounded-lg border-border/80"
                placeholder="you@school.nl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Wachtwoord
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                className="h-11 rounded-lg border-border/80"
              />
              <p className="text-xs text-muted-foreground">Minimaal 8 tekens.</p>
            </div>
            <Button type="submit" className="h-11 w-full rounded-lg text-base shadow-sm" disabled={pending}>
              {pending ? "Account wordt aangemaakt…" : "Account aanmaken en inloggen"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
              Heb je al een account?
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthSplitShell>
  );
}
