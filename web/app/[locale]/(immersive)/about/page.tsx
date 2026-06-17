import { ImmersiveScenePage } from "@/components/pages/immersive-scene-page";
import { StudioClosingSection } from "@/components/ui/studio-closing-section";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { getDictionary, type Locale } from "@/lib/locales";
type AboutPageProps = { params: Promise<{ locale: string }> };
export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { about, slugs } = dict;
  const overlay = (
    <>
      <p className="text-sm leading-relaxed text-text-muted">
        {about.story.text}
      </p>
      <ul className="space-y-2">
        {about.story.values.map((value) => (
          <li
            key={value}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-muted"
          >
            {value}
          </li>
        ))}
      </ul>
      <div className="rounded-xl border border-border bg-surface p-4 text-xs text-text-muted">
        <p className="font-semibold text-text">{about.business.name}</p>
        <p className="mt-1">{about.business.location}</p>
        <p className="mt-1">KVK {about.business.kvk}</p>
      </div>
    </>
  );
  return (
    <ImmersiveScenePage
      dict={dict}
      label={about.hero.label}
      title={about.hero.title}
      description={about.hero.description}
      overlayContent={overlay}
    >
      <RevealSection>
        <AnimatedSectionHeading
          title={about.story.title}
          subtitle={about.story.text}
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {about.story.values.map((value) => (
            <li
              key={value}
              className="studio-surface rounded-xl px-4 py-3 text-sm leading-relaxed text-text-muted"
            >
              {value}
            </li>
          ))}
        </ul>
      </RevealSection>
      <RevealSection className="section-offset-grid">
        <AnimatedSectionHeading
          label={about.expertise.label}
          title={about.expertise.title}
          subtitle={about.expertise.text}
        />
        <GlassCard className="p-6" hover={false} glow>
          <h2 className="font-display text-2xl font-semibold text-text">
            {about.region.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            {about.region.text}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {about.region.areas.map((area) => (
              <span
                key={area}
                className="rounded-lg border border-border bg-surface-raised px-3 py-2 text-xs font-semibold text-text-muted"
              >
                {area}
              </span>
            ))}
          </div>
        </GlassCard>
      </RevealSection>
      <div className="grid gap-4 md:grid-cols-2">
        {about.expertise.items.map((item) => (
          <GlassCard key={item.title} className="p-6" hover>
            <h3 className="font-display text-lg font-semibold text-text">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {item.text}
            </p>
          </GlassCard>
        ))}
      </div>
      <RevealSection>
        <AnimatedSectionHeading
          label={about.howIWork.label}
          title={about.howIWork.title}
        />
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {about.howIWork.steps.map((step) => (
            <li key={step.title} className="studio-surface rounded-2xl p-5">
              <h3 className="font-display text-lg font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </RevealSection>
      <RevealSection className="page-band -mx-6 px-6 py-14 md:-mx-10 md:px-10">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <AnimatedSectionHeading title={about.business.title} />
          <div className="editorial-panel space-y-4 p-6">
            <p className="font-semibold text-text">{about.business.name}</p>
            <p className="text-sm leading-relaxed text-text-muted">
              {about.business.location}
            </p>
            <p className="text-sm text-text-muted">KVK {about.business.kvk}</p>
            {about.business.btw && (
              <p className="text-sm text-text-muted">{about.business.btw}</p>
            )}
            {about.business.email && (
              <p className="text-sm text-text-muted">
                <a
                  href={`mailto:${about.business.email}`}
                  className="text-accent hover:text-accent-hover"
                >
                  {about.business.email}
                </a>
              </p>
            )}
            {about.business.areas && about.business.areas.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {about.business.areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-lg border border-border bg-surface-raised px-3 py-2 text-xs font-semibold text-text-muted"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </RevealSection>
      <RevealSection className="page-band -mx-6 px-6 py-14 md:-mx-10 md:px-10">
        <div className="relative z-10">
          <AnimatedSectionHeading title={about.faq.title} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {about.faq.items.map((item) => (
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
        </div>
      </RevealSection>
      <StudioClosingSection
        headline={about.cta.headline}
        subtext={about.cta.text}
        primaryLabel={about.cta.button}
        primaryHref={slugs.contact}
        secondaryLabel={about.cta.secondary}
        secondaryHref={slugs.projects}
        responseNote={dict.closing.responseNote}
        email={dict.contact.info.email}
      />
    </ImmersiveScenePage>
  );
}
