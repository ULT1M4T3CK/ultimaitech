import { Compass } from 'lucide-react';
import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { MetalButton } from '@/components/ui/metal-button';
import { RevealSection } from '@/components/ui/reveal-section';
import type { Dictionary } from '@/lib/locales';

type ContactCtaSectionProps = {
  dict: Dictionary;
};

export function ContactCtaSection({ dict }: ContactCtaSectionProps) {
  const nexus = dict.home.nexus;
  const cta = dict.home.cta;

  return (
    <RevealSection data-narrative-section="contact" className="narrative-section">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="footer-cta-band rounded-3xl border border-border px-6 py-12 text-center md:px-12 md:py-16">
          <AnimatedSectionHeading
            align="center"
            title={nexus?.contactHeadline ?? cta.headline}
            subtitle={cta.subtext}
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MetalButton href={dict.slugs.contact}>{cta.button}</MetalButton>
            <MetalButton href={dict.slugs.services} variant="secondary">
              {cta.secondary}
            </MetalButton>
          </div>
          <p className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 text-sm text-text-muted">
            <Compass className="h-4 w-4 shrink-0 text-accent" />
            {nexus?.hubExplore ?? 'Verken de hub — sleep om portalen te ontdekken'}
          </p>
        </div>
      </div>
    </RevealSection>
  );
}
