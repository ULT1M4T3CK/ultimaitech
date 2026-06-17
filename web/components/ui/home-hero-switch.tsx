"use client";
import { useOptionalImmersive } from "@/components/immersive/immersive-provider";
import { isImmersiveStudioEnabled } from "@/lib/immersive-config";
import { HeroSection } from "@/components/sections/home/hero-section";
import { HubHeroCompact } from "@/components/sections/home/hub-hero-compact";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import { MetalButton } from "@/components/ui/metal-button";
import type { Dictionary } from "@/lib/locales";
type HomeHeroSwitchProps = { dict: Dictionary };
export function HomeHeroSwitch({ dict }: HomeHeroSwitchProps) {
  const immersive = useOptionalImmersive();
  const narrativeMode = immersive?.narrativeMode ?? false;
  const isImmersive = immersive?.isImmersive ?? false;
  const hero = dict.home.hero;
  const studio = isImmersiveStudioEnabled();
  if (studio && narrativeMode) {
    return <HeroSection dict={dict} />;
  }
  if (studio && isImmersive) {
    return <HubHeroCompact dict={dict} />;
  }
  return (
    <>
      <AnimatedPageHero title={hero.headline} description={hero.subtext}>
        <div className="flex flex-wrap gap-3">
          <MetalButton href={dict.slugs.contact}>{hero.cta1}</MetalButton>
          <MetalButton href={dict.slugs.projects} variant="secondary">
            {hero.cta2}
          </MetalButton>
        </div>
      </AnimatedPageHero>
      {hero.trustLine && (
        <p className="mx-auto max-w-6xl px-6 pb-6 text-sm leading-relaxed text-text-muted md:-mt-4">
          {hero.trustLine}
        </p>
      )}
    </>
  );
}
