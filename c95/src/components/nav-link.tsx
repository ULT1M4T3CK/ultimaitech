"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Only highlight on exact path (e.g. overview vs nested routes) */
  end?: boolean;
  onNavigate?: () => void;
};

export function NavLink({ href, children, className, end, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = end ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}
