import {
  ImmersiveScenePage,
  ServicePillarList,
} from "@/components/pages/immersive-scene-page";
import { ServicesOverlay } from "@/components/sections/services/services-overlay";
import { StudioClosingSection } from "@/components/ui/studio-closing-section";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { getDictionary, type Locale } from "@/lib/locales";
type ServicesPageProps = { params: Promise<{ locale: string }> };
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
      <RevealSection className="section-offset-grid">
        <AnimatedSectionHeading
          title={services.intro.title}
          subtitle={services.intro.text}
        />
        <div className="editorial-panel p-6">
          <p className="editorial-eyebrow">{services.approach.label}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-text">
            {services.approach.title}
          </h2>
          <ul className="mt-5 space-y-3">
            {services.approach.points.map((point) => (
              <li
                key={point}
                className="text-sm leading-relaxed text-text-muted"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>
      <ServicePillarList pillars={services.pillars} />
      <RevealSection className="page-band -mx-6 px-6 py-14 md:-mx-10 md:px-10">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start">
          <AnimatedSectionHeading
            label={services.whenToStart.label}
            title={services.whenToStart.title}
            subtitle={services.region.text}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {services.whenToStart.items.map((item) => (
              <GlassCard key={item.title} className="p-5" hover>
                <h3 className="font-display text-lg font-semibold text-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
        <div className="relative z-10 mt-8 flex flex-wrap gap-2">
          {services.region.areas.map((area) => (
            <span
              key={area}
              className="rounded-lg border border-border bg-surface-raised px-3 py-2 text-xs font-semibold text-text-muted"
            >
              {area}
            </span>
          ))}
        </div>
      </RevealSection>
      <RevealSection>
        <AnimatedSectionHeading title={services.faq.title} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.faq.items.map((item) => (
            <GlassCard key={item.q} className="p-5" hover={false}>
              <h3 className="font-display text-lg font-semibold text-text">
                {item.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {item.a}
              </p>
            </GlassCard>
          ))}
        </div>
      </RevealSection>
      <StudioClosingSection
        eyebrow={dict.closing.eyebrow}
        headline={dict.closing.headline}
        subtext={dict.closing.subtext}
        primaryLabel={dict.closing.primary}
        primaryHref={slugs.contact}
        secondaryLabel={dict.closing.secondary}
        secondaryHref={slugs.projects}
        responseNote={dict.closing.responseNote}
        email={dict.contact.info.email}
      />
    </ImmersiveScenePage>
  );
}
