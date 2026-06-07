import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  ImmersiveScenePage,
  ServicePillarList,
} from '@/components/pages/immersive-scene-page';
import { AnimatedCtaBand } from '@/components/ui/animated-cta-band';
import { RevealSection } from '@/components/ui/reveal-section';
import { getDictionary, type Locale } from '@/lib/locales';

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { services, slugs } = dict;

  const overlay = (
    <>
      <p className="text-sm leading-relaxed text-text-muted">{services.intro.text}</p>
      <div className="space-y-2">
        {services.pillars.map((pillar) => (
          <Link
            key={pillar.title}
            href={pillar.link}
            className="flex items-center justify-between rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm font-medium text-text transition-colors hover:border-accent/30"
          >
            {pillar.title}
            <ArrowRight className="h-4 w-4 text-accent" />
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <ImmersiveScenePage
      dict={dict}
      label={services.hero.label}
      title={services.hero.title}
      description={services.hero.description}
      overlayContent={overlay}
    >
      <RevealSection>
        <p className="max-w-3xl text-base leading-relaxed text-text-muted">{services.intro.text}</p>
      </RevealSection>
      <ServicePillarList pillars={services.pillars} />
      <AnimatedCtaBand
        headline={dict.home.cta.headline}
        subtext={dict.home.cta.subtext}
        primaryLabel={dict.home.cta.button}
        primaryHref={slugs.contact}
        secondaryLabel={dict.home.cta.secondary}
        secondaryHref={slugs.projects}
      />
    </ImmersiveScenePage>
  );
}
