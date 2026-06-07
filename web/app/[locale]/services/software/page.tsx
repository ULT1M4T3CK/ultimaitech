import { CapabilityGrid, ServiceDetailPage } from '@/components/pages/service-detail-page';
import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { RevealSection } from '@/components/ui/reveal-section';
import { getDictionary, type Locale } from '@/lib/locales';

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
            <AnimatedSectionHeading title={software.whenCustom.title} subtitle={software.whenCustom.text} />
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {software.whenCustom.items.map((item) => (
                <li key={item} className="glass-spec-panel rounded-xl p-4 text-sm text-text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </RevealSection>
          <CapabilityGrid items={software.capabilities} />
        </>
      }
    />
  );
}
