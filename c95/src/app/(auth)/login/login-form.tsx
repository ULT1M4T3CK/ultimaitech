"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ensureBasePathInUrl, withBasePath } from "@/lib/base-path";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const afterLogin = withBasePath(callbackUrl ?? "/");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: afterLogin,
    });
    setPending(false);
    if (res?.error) {
      setError("Ongeldig e-mailadres of wachtwoord.");
      return;
    }
    const sessionRes = await fetch(withBasePath("/api/auth/session"), { credentials: "include" });
    const session = (await sessionRes.json()) as { user?: { role?: string } };
    const role = session?.user?.role;
    let target =
      role === "STUDENT"
        ? withBasePath("/dashboard")
        : role === "TEACHER" || role === "ADMIN"
          ? withBasePath("/teacher")
          : ensureBasePathInUrl(res?.url ?? afterLogin, withBasePath("/dashboard"));
    try {
      const u = new URL(target);
      if (u.pathname.endsWith("/login") || u.pathname.includes("/register")) {
        target = role === "STUDENT" ? withBasePath("/dashboard") : withBasePath("/teacher");
      }
    } catch {
      target = withBasePath("/dashboard");
    }
    window.location.href = target;
  }

  return (
    <Card className="card-learning border-border/70 shadow-lg shadow-black/[0.06]">
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-2xl font-semibold tracking-tight">Inloggen</CardTitle>
        <CardDescription className="text-base">Gebruik het e-mailadres en wachtwoord van je schoolaccount.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit}>
          {error ? (
            <Alert variant="destructive" className="border-destructive/30">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
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
              className="h-11 rounded-lg border-border/80 bg-background"
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
              autoComplete="current-password"
              required
              className="h-11 rounded-lg border-border/80 bg-background"
            />
          </div>
          <Button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg text-base shadow-sm"
            disabled={pending}
          >
            {pending ? "Bezig met inloggen…" : "Doorgaan"}
            {!pending ? <ArrowRight className="size-4 opacity-80" aria-hidden /> : null}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Nieuw hier?{" "}
          <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
            Registreren met uitnodigingscode
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
