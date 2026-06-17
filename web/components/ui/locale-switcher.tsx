"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_LABELS, type Locale } from "@/lib/locales";
import {
  localePathForSegment,
  parseLocalePath,
  toInternalSegment,
} from "@/lib/i18n";
import { cn } from "@/lib/cn";
const LOCALES: Locale[] = ["nl", "de", "en"];
export function LocaleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const { locale, segment } = parseLocalePath(pathname);
  const internal = toInternalSegment(locale, segment);
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-lg border border-border bg-surface-raised p-0.5",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((loc) => {
        const href = localePathForSegment(loc, internal);
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={href}
            className={cn(
              "rounded-md px-2 py-1 text-[0.6875rem] font-semibold tracking-wide transition-colors",
              active
                ? "bg-accent-muted text-text"
                : "text-text-muted hover:text-text",
            )}
            aria-current={active ? "page" : undefined}
          >
            {LOCALE_LABELS[loc]}
          </Link>
        );
      })}
    </div>
  );
}
