"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  BookOpen,
  Clock,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  Menu,
  Play,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/nav-link";
import { SignOutButton } from "@/components/sign-out";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type StudentUser = {
  name?: string | null;
  email?: string | null;
};

function initialsFromName(name: string | null | undefined) {
  return (name ?? "S")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="px-4 pb-3">
        <Link
          href="/courses"
          onClick={onNavigate}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-sidebar-primary px-4 py-2.5 text-sm font-semibold text-sidebar-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          <Play className="size-4" aria-hidden />
          Start Nieuwe Quiz
        </Link>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
        <NavLink href="/dashboard" end onNavigate={onNavigate}>
          <LayoutDashboard className="size-4 opacity-80" aria-hidden />
          Overzicht
        </NavLink>
        <NavLink href="/courses" onNavigate={onNavigate}>
          <BookOpen className="size-4 opacity-80" aria-hidden />
          Examens
        </NavLink>
        <NavLink href="#" className="text-sidebar-foreground/70" onNavigate={onNavigate}>
          <Clock className="size-4 opacity-80" aria-hidden />
          Geschiedenis
        </NavLink>
        <NavLink href="#" className="text-sidebar-foreground/70" onNavigate={onNavigate}>
          <Settings className="size-4 opacity-80" aria-hidden />
          Instellingen
        </NavLink>
      </nav>

      <div className="mt-auto space-y-1 border-t border-sidebar-border px-3 py-3">
        <NavLink href="#" className="text-sidebar-foreground/60" onNavigate={onNavigate}>
          <HelpCircle className="size-4 opacity-70" aria-hidden />
          Ondersteuning
        </NavLink>
        <SignOutButton label="Uitloggen" />
      </div>
    </>
  );
}

function MobileBottomLink({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  href?: string;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  active?: boolean;
  onClick?: () => void;
}) {
  const className = cn(
    "flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-2 py-1.5 text-[10px] font-medium leading-tight transition-colors",
    active ? "text-primary" : "text-muted-foreground",
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className} aria-label={label}>
        <Icon className="size-5 shrink-0" aria-hidden />
        <span className="truncate">{label}</span>
      </button>
    );
  }

  return (
    <Link href={href!} className={className}>
      <Icon className="size-5 shrink-0" aria-hidden />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function StudentShell({ user, children }: { user: StudentUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = initialsFromName(user.name);
  const closeMenu = () => setMenuOpen(false);

  const dashboardActive = pathname === "/dashboard";
  const coursesActive = pathname.startsWith("/courses");
  const isExamFlow = pathname.includes("/exam");

  return (
    <div className="flex min-h-dvh w-full">
      <aside className="sticky top-0 hidden h-dvh w-[260px] shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-[2px_0_12px_-4px_rgba(194,24,91,0.08)] lg:flex">
        <div className="px-4 pb-3 pt-5">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-xl px-1 py-0.5 transition-opacity hover:opacity-90">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <span className="min-w-0 text-left">
              <span className="block truncate text-sm font-bold tracking-tight text-sidebar-foreground">C95.nl</span>
              <span className="block truncate text-[11px] text-sidebar-foreground/60">Leerplatform</span>
            </span>
          </Link>
        </div>

        <SidebarNav />

        <div className="border-t border-sidebar-border px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-sidebar-foreground">{user.name}</p>
              <p className="truncate text-[11px] text-sidebar-foreground/55">{user.email}</p>
            </div>
            <button
              type="button"
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              aria-label="Meldingen"
            >
              <Bell className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border/80 bg-background/95 px-4 py-3 backdrop-blur supports-[padding:max(0px)]:pt-[max(0.75rem,env(safe-area-inset-top))] lg:hidden">
          <Link href="/dashboard" className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <GraduationCap className="size-4" aria-hidden />
            </span>
            <span className="truncate text-sm font-bold tracking-tight">C95.nl</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card text-foreground"
            aria-label="Menu openen"
          >
            <Menu className="size-5" />
          </button>
        </header>

        <main
          className={cn(
            "learning-main min-h-0 flex-1 overflow-y-auto lg:pb-0",
            isExamFlow ? "pb-0" : "pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))]",
          )}
        >
          <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8 lg:px-10 lg:py-10">{children}</div>
        </main>

        {!isExamFlow ? (
          <nav
            aria-label="Hoofdnavigatie"
            className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border/80 bg-background/95 backdrop-blur lg:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <MobileBottomLink href="/dashboard" label="Overzicht" icon={LayoutDashboard} active={dashboardActive} />
            <MobileBottomLink href="/courses" label="Examens" icon={BookOpen} active={coursesActive} />
            <MobileBottomLink label="Menu" icon={Menu} onClick={() => setMenuOpen(true)} active={menuOpen} />
          </nav>
        ) : null}
      </div>

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent
          showCloseButton
          className="fixed inset-y-0 left-0 top-0 flex h-dvh w-[min(300px,92vw)] max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 border-r p-0 sm:max-w-none"
        >
          <DialogTitle className="sr-only">Navigatiemenu</DialogTitle>
          <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-sidebar text-sidebar-foreground">
            <SidebarNav onNavigate={closeMenu} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
