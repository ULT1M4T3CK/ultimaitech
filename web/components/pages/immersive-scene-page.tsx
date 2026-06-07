'use client';

import { useOptionalImmersive } from '@/components/immersive/immersive-provider';
import { PageHeroSwitch } from '@/components/ui/page-hero-switch';
import { MetalButton } from '@/components/ui/metal-button';
import { GlassCard } from '@/components/ui/glass-card';
import { RevealSection } from '@/components/ui/reveal-section';
import { resolveIcon } from '@/lib/icon-map';
import type { Dictionary } from '@/lib/locales';
import type { ReactNode } from 'react';

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

  if (isImmersive) {
    return (
      <div className="immersive-overlay">
        <div className="immersive-overlay-inner space-y-6 pb-8">
          <PageHeroSwitch label={label} title={title} description={description} />
          {overlayContent}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeroSwitch label={label} title={title} description={description}>
        <MetalButton href={dict.slugs.contact}>{dict.footer.ctaBand.cta}</MetalButton>
      </PageHeroSwitch>
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">{children}</div>
    </div>
  );
}

type ServicePillarListProps = {
  pillars: Dictionary['services']['pillars'];
};

export function ServicePillarList({ pillars }: ServicePillarListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {pillars.map((pillar) => {
        const Icon = resolveIcon(pillar.icon);
        return (
          <RevealSection key={pillar.title}>
            <GlassCard className="h-full p-6" hover glow>
              <div className="icon-frame-glow mb-4 h-11 w-11">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-text">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{pillar.text}</p>
              <MetalButton href={pillar.link} variant="secondary" className="mt-5">
                {pillar.cta}
              </MetalButton>
            </GlassCard>
          </RevealSection>
        );
      })}
    </div>
  );
}
