import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedStat } from "@/components/ui/animated-stat";
import { GlassCard } from "@/components/ui/glass-card";
import { MetalButton } from "@/components/ui/metal-button";
import { resolveIcon } from "@/lib/icon-map";
import type { Dictionary } from "@/lib/locales";
type HubOverlayProps = { dict: Dictionary };
export function HubOverlay({ dict }: HubOverlayProps) {
  return (
    <div className="immersive-overlay">
      <div className="immersive-overlay-inner space-y-8 pb-8">
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-faint">
            {dict.home.socialProof.label}
          </p>
          <div className="grid grid-cols-3 gap-3">
            {dict.home.socialProof.items.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-surface p-3"
              >
                <AnimatedStat value={item.value} label={item.label} />
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-text">
            {dict.home.whoWeServe.title}
          </h2>
          <div className="space-y-2">
            {dict.home.whoWeServe.items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-surface p-3"
              >
                <p className="text-sm font-semibold text-text">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-text">
            Diensten
          </h2>
          <div className="grid gap-2">
            {dict.home.services.map((service) => {
              const Icon = resolveIcon(service.icon);
              return (
                <GlassCard
                  key={service.title}
                  className="bento-tile bento-tile-animated p-3"
                >
                  <Link href={service.link} className="flex items-center gap-3">
                    <div className="icon-frame h-9 w-9 shrink-0">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text">
                        {service.title}
                      </p>
                      <p className="truncate text-xs text-text-muted">
                        {service.text}
                      </p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-accent" />
                  </Link>
                </GlassCard>
              );
            })}
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-text">
            {dict.home.principles[0]?.title}
          </h2>
          <div className="space-y-2">
            {dict.home.principles.map((principle) => {
              const Icon = resolveIcon(principle.icon);
              return (
                <div
                  key={principle.title}
                  className="flex gap-3 rounded-xl border border-border p-3"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-semibold text-text">
                      {principle.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">
                      {principle.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-accent-muted/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {dict.home.featuredProject.label}
          </p>
          <h3 className="mt-2 font-display text-base font-semibold text-text">
            {dict.home.featuredProject.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-text-muted">
            {dict.home.featuredProject.description}
          </p>
          <ul className="mt-3 space-y-1">
            {dict.home.featuredProject.highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-xs leading-relaxed text-text-muted"
              >
                · {highlight}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <MetalButton
              href={dict.slugs.projects}
              variant="secondary"
              className="w-full !py-2 text-xs"
            >
              {dict.home.featuredProject.cta}
            </MetalButton>
            <MetalButton
              href={dict.home.featuredProject.externalUrl}
              variant="secondary"
              className="w-full !py-2 text-xs"
            >
              {dict.home.featuredProject.ctaExternal}
            </MetalButton>
          </div>
        </section>
        <MetalButton href={dict.slugs.contact} className="w-full">
          {dict.closing.primary}
        </MetalButton>
      </div>
    </div>
  );
}
