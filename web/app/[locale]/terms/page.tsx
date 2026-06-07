import { AnimatedPageHero } from '@/components/ui/animated-page-hero';
import { GlassCard } from '@/components/ui/glass-card';
import { RevealSection } from '@/components/ui/reveal-section';
import { getDictionary, type Locale } from '@/lib/locales';

type PageProps = { params: Promise<{ locale: string }> };

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { terms } = dict;

  return (
    <div>
      <AnimatedPageHero title={terms.title} description={terms.lastUpdated} />

      <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
        <p className="text-base leading-relaxed text-text-muted">{terms.intro}</p>
        {terms.sections.map((section) => (
          <RevealSection key={section.title}>
            <GlassCard className="p-6">
              <h2 className="font-display text-xl font-semibold text-text">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{section.text}</p>
            </GlassCard>
          </RevealSection>
        ))}
      </div>
    </div>
  );
}
