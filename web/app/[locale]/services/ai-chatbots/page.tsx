import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { resolveIcon } from "@/lib/icon-map";
import { getDictionary, type Locale } from "@/lib/locales";
type PageProps = { params: Promise<{ locale: string }> };
export default async function AiChatbotsPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { aiChatbots, slugs } = dict;
  return (
    <ServiceDetailPage
      dict={dict}
      hero={aiChatbots.hero}
      faq={aiChatbots.faq}
      cta={aiChatbots.cta}
      secondaryHref={slugs.services}
      sections={
        <>
          <RevealSection>
            <AnimatedSectionHeading
              title={aiChatbots.whatIs.title}
              subtitle={aiChatbots.whatIs.text}
            />
            <ul className="mt-6 space-y-3">
              {aiChatbots.whatIs.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="studio-surface rounded-xl p-4 text-sm text-text-muted"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </RevealSection>
          <RevealSection>
            <AnimatedSectionHeading title={aiChatbots.benefits.title} />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {aiChatbots.benefits.items.map((item) => (
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
          </RevealSection>
          <RevealSection className="page-band -mx-6 px-6 py-14 md:-mx-10 md:px-10">
            <div className="relative z-10">
              <AnimatedSectionHeading title={aiChatbots.examples.title} />
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {aiChatbots.examples.items.map((item, index) => (
                  <GlassCard
                    key={item.title}
                    className={index === 1 ? "p-6 lg:mt-8" : "p-6"}
                    hover
                  >
                    <p className="editorial-eyebrow">0{index + 1}</p>
                    <h3 className="mt-4 font-display text-lg font-semibold text-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {item.text}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </RevealSection>
          <RevealSection className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <AnimatedSectionHeading
              label={aiChatbots.flow.label}
              title={aiChatbots.flow.title}
            />
            <ol className="space-y-3">
              {aiChatbots.flow.steps.map((step, index) => {
                const Icon = resolveIcon(step.icon);
                return (
                  <li
                    key={step.title}
                    className="studio-surface rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="icon-frame h-9 w-9 shrink-0">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-mono text-sm font-semibold text-accent">
                          0{index + 1}
                        </p>
                        <h3 className="mt-1 font-display text-lg font-semibold text-text">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-text-muted">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </RevealSection>
          <RevealSection>
            <AnimatedSectionHeading title={aiChatbots.tech.title} />
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {aiChatbots.tech.rows.map((row) => (
                <GlassCard
                  key={row.aspect}
                  className="flex items-start justify-between gap-4 p-4"
                  hover={false}
                >
                  <p className="text-sm font-semibold text-text">
                    {row.aspect}
                  </p>
                  <p className="max-w-xs text-right text-sm leading-relaxed text-text-muted">
                    {row.spec}
                  </p>
                </GlassCard>
              ))}
            </div>
          </RevealSection>
        </>
      }
    />
  );
}
