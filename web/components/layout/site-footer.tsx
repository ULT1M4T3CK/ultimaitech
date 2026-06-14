import Link from 'next/link';
import { AnimatedCtaBand } from '@/components/ui/animated-cta-band';
import type { Dictionary } from '@/lib/locales';
import { SOCIAL_LINKS } from '@/lib/structured-data';

type SiteFooterProps = {
  dict: Dictionary;
  showCtaBand?: boolean;
};

export function SiteFooter({ dict, showCtaBand = true }: SiteFooterProps) {
  const { footer, slugs } = dict;

  return (
    <footer className="border-t border-border bg-charcoal">
      {showCtaBand && (
        <AnimatedCtaBand
          headline={footer.ctaBand.headline}
          subtext={footer.ctaBand.sub}
          primaryLabel={footer.ctaBand.cta}
          primaryHref={slugs.contact}
        />
      )}

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="font-display text-lg font-bold text-text">ultimAItech</p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{footer.tagline}</p>
          </div>

          {Object.values(footer.columns).map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-text">{column.title}</h3>
              <ul className="mt-4 space-y-2">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-text-muted transition-colors hover:text-accent"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-divider-glow mt-10" />

        <div className="mt-6 flex flex-col gap-2 text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>{footer.bottomLine}</p>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
