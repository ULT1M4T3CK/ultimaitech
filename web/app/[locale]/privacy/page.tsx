import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import { RevealSection } from "@/components/ui/reveal-section";
import { getDictionary, type Locale } from "@/lib/locales";
type PageProps = { params: Promise<{ locale: string }> };
export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { privacy } = dict;
  return (
    <div>
      <AnimatedPageHero
        title={privacy.title}
        description={privacy.lastUpdated}
      />
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
        <p className="text-base leading-relaxed text-text-muted">
          {privacy.intro}
        </p>
        {privacy.sections.map((section) => (
          <RevealSection key={section.title}>
            <div className="editorial-panel p-6">
              <h2 className="font-display text-xl font-semibold text-text">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {section.text}
              </p>
            </div>
          </RevealSection>
        ))}
      </div>
    </div>
  );
}
