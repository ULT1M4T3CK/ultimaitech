"use client";

import type { ReactNode } from "react";
import { GraduationCap } from "lucide-react";

type Props = {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function AuthSplitShell({
  children,
  eyebrow = "C95 · CCV-vragensets",
  title = "Interactief leren voor praktijktoetsen",
  description = "Gestructureerde vragensets volgens het CCV-kader. Log in om verder te gaan met je training of examenvoorbereiding.",
}: Props) {
  return (
    <div className="relative grid min-h-dvh w-full grid-rows-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-teal-700 p-10 text-primary-foreground lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative">
          <div className="mb-8 inline-flex size-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <GraduationCap className="size-7" aria-hidden />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">{eyebrow}</p>
          <h1 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight">{title}</h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/85">{description}</p>
        </div>
        <p className="relative text-xs text-primary-foreground/60">Beveiligde toegang op uitnodiging · Geoptimaliseerd voor tablet en desktop</p>
      </div>

      <div className="flex flex-col justify-center bg-background px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
