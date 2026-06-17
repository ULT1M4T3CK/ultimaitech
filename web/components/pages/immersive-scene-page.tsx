"use client";
import { useOptionalImmersive } from "@/components/immersive/immersive-provider";
import { PageHeroSwitch } from "@/components/ui/page-hero-switch";
import { MetalButton } from "@/components/ui/metal-button";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { cn } from "@/lib/cn";
import { resolveIcon } from "@/lib/icon-map";
import type { Dictionary } from "@/lib/locales";
import type { ReactNode } from "react";
type ImmersiveScenePageProps = {
  dict: Dictionary;
  label: string;
  title: string;
  description: string;
  children?: ReactNode;
  overlayContent?: ReactNode;
};
export function ImmersiveScenePage({
  dict,
  label,
  title,
  description,
  children,
  overlayContent,
}: ImmersiveScenePageProps) {
  const immersive = useOptionalImmersive();
  const isImmersive = immersive?.isImmersive ?? false;
  return (
    <div>
      {isImmersive && overlayContent !== undefined && (
        <div className="immersive-overlay">
          <div className="immersive-overlay-inner space-y-6 pb-8">
            <PageHeroSwitch
              label={label}
              title={title}
              description={description}
            />
            {overlayContent}
          </div>
        </div>
      )}
      {!isImmersive && (
        <PageHeroSwitch label={label} title={title} description={description}>
          <MetalButton href={dict.slugs.contact} variant="secondary">
            {dict.closing.navCta}
          </MetalButton>
        </PageHeroSwitch>
      )}
      <div
        className={cn(
          "mx-auto max-w-6xl space-y-12 px-6 py-16",
          isImmersive && "immersive-scroll-body",
        )}
      >
        {children}
      </div>
    </div>
  );
}
type ServicePillarListProps = { pillars: Dictionary["services"]["pillars"] };
export function ServicePillarList({ pillars }: ServicePillarListProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {pillars.map((pillar, index) => {
        const Icon = resolveIcon(pillar.icon);
        return (
          <RevealSection key={pillar.title}>
            <GlassCard
              className={cn("h-full p-6", index === 1 && "lg:mt-10")}
              hover
            >
              <div className="icon-frame mb-4 h-11 w-11">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-text">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {pillar.text}
              </p>
              {"fit" in pillar && pillar.fit && (
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {pillar.fit.map((fit) => (
                    <li
                      key={fit}
                      className="text-sm leading-relaxed text-text-muted"
                    >
                      {fit}
                    </li>
                  ))}
                </ul>
              )}
              <MetalButton
                href={pillar.link}
                variant="secondary"
                className="mt-5"
              >
                {pillar.cta}
              </MetalButton>
            </GlassCard>
          </RevealSection>
        );
      })}
    </div>
  );
}
