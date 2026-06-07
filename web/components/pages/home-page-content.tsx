'use client';

import { useOptionalImmersive } from '@/components/immersive/immersive-provider';
import { HomeHeroSwitch } from '@/components/ui/home-hero-switch';
import { HubOverlay } from '@/components/sections/home/hub-overlay';
import { HeroSection } from '@/components/sections/home/hero-section';
import { ServicesSection } from '@/components/sections/home/services-section';
import { WorkSection } from '@/components/sections/home/work-section';
import { AiSection } from '@/components/sections/home/ai-section';
import { ProcessSection } from '@/components/sections/home/process-section';
import { TrustSection } from '@/components/sections/home/trust-section';
import { ContactCtaSection } from '@/components/sections/home/contact-cta-section';
import { StickyMobileCta } from '@/components/ui/sticky-mobile-cta';
import type { Dictionary } from '@/lib/locales';

type HomePageContentProps = {
  dict: Dictionary;
};

export function HomePageContent({ dict }: HomePageContentProps) {
  const immersive = useOptionalImmersive();
  const narrativeMode = immersive?.narrativeMode ?? false;
  const isImmersive = immersive?.isImmersive ?? false;

  if (narrativeMode) {
    return (
      <>
        <div id="narrative-scroll" className="narrative-scroll">
          <HeroSection dict={dict} />
          <ServicesSection dict={dict} />
          <WorkSection dict={dict} />
          <AiSection dict={dict} />
          <ProcessSection dict={dict} />
          <TrustSection dict={dict} />
          <ContactCtaSection dict={dict} />
        </div>
        <StickyMobileCta label={dict.home.cta.button} href={dict.slugs.contact} />
      </>
    );
  }

  return (
    <>
      {!isImmersive && <HomeHeroSwitch dict={dict} />}
      {isImmersive && <HubOverlay dict={dict} />}
      {!isImmersive && (
        <div className="mx-auto max-w-6xl space-y-0 px-6 pb-16 pt-28">
          <ServicesSection dict={dict} />
          <WorkSection dict={dict} />
          <TrustSection dict={dict} />
          <ContactCtaSection dict={dict} />
        </div>
      )}
      <StickyMobileCta label={dict.home.cta.button} href={dict.slugs.contact} />
    </>
  );
}
