"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ImmersiveModeToggle } from "@/components/ui/immersive-mode-toggle";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { MetalButton } from "@/components/ui/metal-button";
import { isImmersiveStudioEnabled } from "@/lib/immersive-config";
import { isImmersivePath } from "@/lib/immersive-routes";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/locales";
type NavProps = { dict: Dictionary };
export function Nav({ dict }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const showImmersiveToggle =
    isImmersiveStudioEnabled() && isImmersivePath(pathname);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  return (
    <header
      id="site-nav"
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300",
        scrolled && "site-nav--scrolled",
      )}
    >
      <div className="site-nav-inner mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-6">
        <Link
          href={dict.slugs.home}
          className="font-display text-lg font-bold text-text"
        >
          ultimAItech
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {dict.nav.map((item) => {
            const active =
              pathname === item.path ||
              pathname.startsWith(`${item.path.slice(0, -1)}`);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "nav-link rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text",
                  active && "nav-link--active",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher /> {showImmersiveToggle && <ImmersiveModeToggle />}
          <MetalButton
            href={dict.slugs.contact}
            variant="secondary"
            className="!px-4 !py-2 text-xs"
          >
            {dict.closing.navCta}
          </MetalButton>
        </div>
        <button
          type="button"
          className="rounded-lg border border-border p-2 text-text md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>
      <div
        className={cn(
          "mobile-nav-panel border-t border-border bg-charcoal md:hidden",
          mobileOpen && "is-open",
        )}
      >
        <div className="space-y-1 px-6 py-4">
          {dict.nav.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface hover:text-text"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-4">
            <LocaleSwitcher />
            {showImmersiveToggle && <ImmersiveModeToggle />}
          </div>
          <MetalButton
            href={dict.slugs.contact}
            variant="secondary"
            className="mt-4 w-full"
          >
            {dict.closing.navCta}
          </MetalButton>
        </div>
      </div>
    </header>
  );
}
