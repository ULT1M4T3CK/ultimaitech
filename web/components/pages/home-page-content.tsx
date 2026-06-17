"use client";
import { useOptionalImmersive } from "@/components/immersive/immersive-provider";
import { HomeHeroSwitch } from "@/components/ui/home-hero-switch";
import { HubOverlay } from "@/components/sections/home/hub-overlay";
import { HeroSection } from "@/components/sections/home/hero-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { WorkSection } from "@/components/sections/home/work-section";
import { AiSection } from "@/components/sections/home/ai-section";
import { ProcessSection } from "@/components/sections/home/process-section";
import { TrustSection } from "@/components/sections/home/trust-section";
import { ContactCtaSection } from "@/components/sections/home/contact-cta-section";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { StickyMobileCta } from "@/components/ui/sticky-mobile-cta";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/locales";
type HomePageContentProps = { dict: Dictionary };
function MarketSection({ dict }: HomePageContentProps) {
  const { whoWeServe, region } = dict.home;
  return (
    <RevealSection className="narrative-section page-band">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="space-y-8">
          <AnimatedSectionHeading
            label={whoWeServe.label}
            title={whoWeServe.title}
            subtitle={region.text}
          />
          <div className="flex flex-wrap gap-2">
            {region.areas.map((area) => (
              <span
                key={area}
                className="rounded-lg border border-border bg-surface-raised px-3 py-2 text-xs font-semibold text-text-muted"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {whoWeServe.items.map((item, index) => (
            <GlassCard
              key={item.title}
              className={index % 2 === 1 ? "p-6 sm:mt-8" : "p-6"}
              hover
            >
              <p className="editorial-eyebrow">0{index + 1}</p>
              <h3 className="mt-4 font-display text-xl font-semibold text-text">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {item.text}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
export function HomePageContent({ dict }: HomePageContentProps) {
  const immersive = useOptionalImmersive();
  const narrativeMode = immersive?.narrativeMode ?? false;
  const isImmersive = immersive?.isImmersive ?? false;
  if (narrativeMode) {
    return (
      <>
        <div id="narrative-scroll" className="narrative-scroll">
          <HeroSection dict={dict} /> <ServicesSection dict={dict} />
          <MarketSection dict={dict} /> <WorkSection dict={dict} />
          <AiSection dict={dict} /> <ProcessSection dict={dict} />
          <TrustSection dict={dict} /> <ContactCtaSection dict={dict} />
        </div>
        <StickyMobileCta
          label={dict.closing.primary}
          href={dict.slugs.contact}
        />
      </>
    );
  }
  return (
    <>
      <HomeHeroSwitch dict={dict} /> {isImmersive && <HubOverlay dict={dict} />}
      <div className={cn("pb-16", isImmersive && "immersive-scroll-body")}>
        <ServicesSection dict={dict} /> <MarketSection dict={dict} />
        <WorkSection dict={dict} /> <AiSection dict={dict} />
        <ProcessSection dict={dict} /> <TrustSection dict={dict} />
        <ContactCtaSection dict={dict} />
      </div>
      <StickyMobileCta label={dict.closing.primary} href={dict.slugs.contact} />
    </>
  );
}
