import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  BarChart3,
  Bell,
  ClipboardList,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  Library,
  PlusCircle,
  Settings,
  Users,
  Video,
} from "lucide-react";
import { NavLink } from "@/components/nav-link";
import { SignOutButton } from "@/components/sign-out";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const isAdmin = session.user.role === "ADMIN";
  const initials = (session.user.name ?? "T")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-dvh w-full">
      <aside className="sticky top-0 flex h-dvh w-[min(260px,92vw)] shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-[2px_0_12px_-4px_rgba(194,24,91,0.08)]">
        <div className="flex items-start justify-between gap-2 px-4 pb-3 pt-5">
          <Link href="/teacher" className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-1 py-0.5 transition-opacity hover:opacity-90">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <span className="min-w-0 text-left">
              <span className="block truncate text-sm font-bold tracking-tight">C95 Portal</span>
              <span className="block truncate text-[11px] text-sidebar-foreground/60">Rijinstructeur</span>
            </span>
          </Link>
          {isAdmin ? (
            <Badge className="shrink-0 border-0 bg-amber-100 text-amber-900 hover:bg-amber-200">Admin</Badge>
          ) : null}
        </div>

        <div className="px-4 pb-3">
          <Link
            href="/teacher/courses"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sidebar-primary px-4 py-2.5 text-sm font-semibold text-sidebar-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            <PlusCircle className="size-4" aria-hidden />
            Nieuwe Quiz Aanmaken
          </Link>
        </div>

        <Separator className="bg-sidebar-border" />

        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
          <NavLink href="/teacher" end>
            <LayoutDashboard className="size-4 opacity-80" aria-hidden />
            Overzicht
          </NavLink>
          <NavLink href="/teacher/students">
            <Users className="size-4 opacity-80" aria-hidden />
            Studentenbeheer
          </NavLink>
          <NavLink href="/teacher/courses">
            <Library className="size-4 opacity-80" aria-hidden />
            Quiz Instellingen
          </NavLink>
          <NavLink href="/teacher/live-exam">
            <Video className="size-4 opacity-80" aria-hidden />
            Live Examen
          </NavLink>
          <NavLink href="/teacher/reports">
            <BarChart3 className="size-4 opacity-80" aria-hidden />
            Resultaten
          </NavLink>
          <NavLink href="/teacher/surveys">
            <ClipboardList className="size-4 opacity-80" aria-hidden />
            Enquêtes
          </NavLink>
          <NavLink href="#" className="text-sidebar-foreground/70">
            <Settings className="size-4 opacity-80" aria-hidden />
            Accountinstellingen
          </NavLink>
        </nav>

        <div className="mt-auto space-y-1 border-t border-sidebar-border px-3 py-3">
          <NavLink href="#" className="text-sidebar-foreground/60">
            <HelpCircle className="size-4 opacity-70" aria-hidden />
            Ondersteuning
          </NavLink>
          <SignOutButton label="Uitloggen" />
        </div>

        <div className="border-t border-sidebar-border px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{session.user.name}</p>
              <p className="truncate text-[11px] text-sidebar-foreground/55">{session.user.email}</p>
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

      <main className="learning-main min-h-dvh min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
