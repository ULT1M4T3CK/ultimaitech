import { CapabilityGrid, ServiceDetailPage } from '@/components/pages/service-detail-page';
import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { RevealSection } from '@/components/ui/reveal-section';
import { getDictionary, type Locale } from '@/lib/locales';

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
            <AnimatedSectionHeading title={websites.whyCustom.title} subtitle={websites.whyCustom.text} />
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {websites.whyCustom.benefits.map((benefit) => (
                <li key={benefit} className="glass-spec-panel rounded-xl p-4 text-sm text-text-muted">
                  {benefit}
                </li>
              ))}
            </ul>
          </RevealSection>
          <CapabilityGrid items={websites.capabilities} />
        </>
      }
    />
  );
}
