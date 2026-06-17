import {
  CapabilityGrid,
  ServiceDetailPage,
} from "@/components/pages/service-detail-page";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { getDictionary, type Locale } from "@/lib/locales";
type PageProps = { params: Promise<{ locale: string }> };
export default async function SoftwarePage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { software, slugs } = dict;
  return (
    <ServiceDetailPage
      dict={dict}
      hero={software.hero}
      faq={software.faq}
      cta={software.cta}
      secondaryHref={slugs.services}
      sections={
        <>
          <RevealSection>
            <AnimatedSectionHeading
              title={software.whenCustom.title}
              subtitle={software.whenCustom.text}
            />
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {software.whenCustom.items.map((item) => (
                <li
                  key={item}
                  className="studio-surface rounded-xl p-4 text-sm text-text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </RevealSection>
          <CapabilityGrid items={software.capabilities} />
          <RevealSection className="section-offset-grid page-band -mx-6 px-6 py-14 md:-mx-10 md:px-10">
            <div className="relative z-10">
              <AnimatedSectionHeading
                label={software.tech.label}
                title={software.tech.title}
                subtitle={software.tech.text}
              />
            </div>
            <div className="relative z-10 grid gap-3 sm:grid-cols-2">
              {software.tech.stack.map((item) => (
                <GlassCard
                  key={`${item.category}-${item.name}`}
                  className="p-4"
                  hover={false}
                >
                  <p className="editorial-eyebrow">{item.category}</p>
                  <p className="mt-2 text-sm font-semibold text-text">
                    {item.name}
                  </p>
                </GlassCard>
              ))}
            </div>
          </RevealSection>
          <RevealSection>
            <AnimatedSectionHeading
              label={software.process.label}
              title={software.process.title}
            />
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {software.process.steps.map((step, index) => (
                <li
                  key={step.title}
                  className={index % 2 === 1 ? "lg:mt-10" : ""}
                >
                  <div className="studio-surface h-full rounded-2xl p-5">
                    <p className="font-mono text-sm font-semibold text-accent">
                      0{index + 1}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-semibold text-text">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </RevealSection>
        </>
      }
    />
  );
}
