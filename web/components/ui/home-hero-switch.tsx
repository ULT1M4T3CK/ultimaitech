'use client';

import { useOptionalImmersive } from '@/components/immersive/immersive-provider';
import { HeroSection } from '@/components/sections/home/hero-section';
import { HubHeroCompact } from '@/components/sections/home/hub-hero-compact';
import { AnimatedPageHero } from '@/components/ui/animated-page-hero';
import { MetalButton } from '@/components/ui/metal-button';
import type { Dictionary } from '@/lib/locales';

type HomeHeroSwitchProps = {
  dict: Dictionary;
};

export function HomeHeroSwitch({ dict }: HomeHeroSwitchProps) {
  const immersive = useOptionalImmersive();
  const narrativeMode = immersive?.narrativeMode ?? false;
  const isImmersive = immersive?.isImmersive ?? false;
  const nexus = dict.home.nexus;
  const hero = dict.home.hero;

  if (narrativeMode) {
    return <HeroSection dict={dict} />;
  }

  if (isImmersive) {
    return <HubHeroCompact dict={dict} />;
  }

  return (
    <AnimatedPageHero
      label={nexus?.heroLabel}
      title={nexus?.headline ?? hero.headline}
      description={nexus?.subheadline ?? hero.subtext}
    >
      <div className="flex flex-wrap gap-3">
        <MetalButton href={dict.slugs.contact}>{hero.cta1}</MetalButton>
        <MetalButton href={dict.slugs.projects} variant="secondary">
          {hero.cta2}
        </MetalButton>
      </div>
    </AnimatedPageHero>
  );
}
