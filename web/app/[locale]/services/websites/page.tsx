import {
  CapabilityGrid,
  ServiceDetailPage,
} from "@/components/pages/service-detail-page";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { getDictionary, type Locale } from "@/lib/locales";
type PageProps = { params: Promise<{ locale: string }> };
export default async function WebsitesPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { websites, slugs } = dict;
  return (
    <ServiceDetailPage
      dict={dict}
      hero={websites.hero}
      faq={websites.faq}
      cta={websites.cta}
      secondaryHref={slugs.services}
      sections={
        <>
          <RevealSection>
            <AnimatedSectionHeading
              title={websites.whyCustom.title}
              subtitle={websites.whyCustom.text}
            />
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {websites.whyCustom.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="studio-surface rounded-xl p-4 text-sm text-text-muted"
                >
                  {benefit}
                </li>
              ))}
            </ul>
          </RevealSection>
          <RevealSection className="section-offset-grid">
            <AnimatedSectionHeading
              title={websites.whyCustom.comparison.customLabel}
              subtitle={websites.audience.title}
            />
            <div className="editorial-panel overflow-hidden">
              <div className="grid grid-cols-[1fr_0.8fr_0.8fr] border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-widest text-text-faint">
                <span />
                <span>{websites.whyCustom.comparison.customLabel}</span>
                <span>{websites.whyCustom.comparison.otherLabel}</span>
              </div>
              {websites.whyCustom.comparison.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1fr_0.8fr_0.8fr] gap-3 border-b border-border/60 px-4 py-3 text-sm last:border-b-0"
                >
                  <span className="font-medium text-text">{row.label}</span>
                  <span className="text-accent">{row.custom}</span>
                  <span className="text-text-muted">{row.other}</span>
                </div>
              ))}
            </div>
          </RevealSection>
          <CapabilityGrid items={websites.capabilities} />
          <RevealSection className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <AnimatedSectionHeading
                title={websites.process.title}
                label={websites.process.label}
              />
              <ol className="mt-6 space-y-3">
                {websites.process.steps.map((step) => (
                  <li
                    key={step.title}
                    className="studio-surface rounded-xl p-4"
                  >
                    <h3 className="font-display text-lg font-semibold text-text">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <GlassCard className="p-6" glow>
              <h2 className="font-display text-2xl font-semibold text-text">
                {websites.audience.title}
              </h2>
              <ul className="mt-5 insight-list">
                {websites.audience.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </RevealSection>
        </>
      }
    />
  );
}
