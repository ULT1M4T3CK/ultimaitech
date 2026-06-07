import {
  ImmersiveScenePage,
  ServicePillarList,
} from '@/components/pages/immersive-scene-page';
import { ServicesOverlay } from '@/components/sections/services/services-overlay';
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
    <ServicesOverlay
      intro={services.intro.text}
      pillars={services.pillars.map((p) => ({ title: p.title, link: p.link }))}
    />
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
