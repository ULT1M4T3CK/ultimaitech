import type { Locale } from '@/lib/locales';

export const SITE_URL = 'https://ultimaitech.com';

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://nl.linkedin.com/in/andre-hassler-8161b31b5' },
  { label: 'GitHub', href: 'https://github.com/UltimAItech' },
] as const;

const descriptions: Record<Locale, string> = {
  nl: 'Betrouwbare websites, webshops, maatwerksoftware en AI-chatbots voor ondernemers in Drenthe, Overijssel en de grensregio Niedersachsen.',
  de: 'Zuverlässige Websites, Webshops, individuelle Software und KI-Chatbots für Unternehmer in Drenthe, Overijssel und der Grenzregion Niedersachsen.',
  en: 'Reliable websites, webshops, custom software and AI chatbots for businesses in Drenthe, Overijssel and the Lower Saxony border region.',
};

export function buildBaseJsonLd(locale: Locale) {
  const language = locale === 'de' ? 'de-DE' : locale === 'en' ? 'en-US' : 'nl-NL';
  const sameAs = SOCIAL_LINKS.map((link) => link.href);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'ultimAItech',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/images/logo.png`,
        email: 'info@ultimaitech.com',
        founder: { '@id': `${SITE_URL}/#andre-hassler` },
        sameAs,
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#andre-hassler`,
        name: 'Andre Hassler',
        jobTitle: 'Founder & Web Developer',
        worksFor: { '@id': `${SITE_URL}/#organization` },
        url: `${SITE_URL}/over/`,
        sameAs,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#professional-service`,
        name: 'ultimAItech',
        url: SITE_URL,
        description: descriptions[locale],
        email: 'info@ultimaitech.com',
        founder: { '@id': `${SITE_URL}/#andre-hassler` },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Wanneperveen',
          addressRegion: 'Overijssel',
          addressCountry: 'NL',
        },
        areaServed: [
          { '@type': 'State', name: 'Drenthe' },
          { '@type': 'State', name: 'Overijssel' },
          { '@type': 'State', name: 'Niedersachsen' },
        ],
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'ultimAItech',
        url: SITE_URL,
        inLanguage: language,
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/blog/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}
