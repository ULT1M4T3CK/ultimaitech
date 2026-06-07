import { ServiceDetailPage } from '@/components/pages/service-detail-page';
import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { RevealSection } from '@/components/ui/reveal-section';
import { getDictionary, type Locale } from '@/lib/locales';

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
            <AnimatedSectionHeading title={aiChatbots.whatIs.title} subtitle={aiChatbots.whatIs.text} />
            <ul className="mt-6 space-y-3">
              {aiChatbots.whatIs.bullets.map((bullet) => (
                <li key={bullet} className="glass-spec-panel rounded-xl p-4 text-sm text-text-muted">
                  {bullet}
                </li>
              ))}
            </ul>
          </RevealSection>
          <div className="grid gap-4 md:grid-cols-2">
            {aiChatbots.benefits.items.map((item) => (
              <GlassCard key={item.title} className="p-6" hover>
                <h3 className="font-display text-lg font-semibold text-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.text}</p>
              </GlassCard>
            ))}
          </div>
        </>
      }
    />
  );
}
