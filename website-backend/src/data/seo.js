/**
 * SEO metadata per route. Synced with static-site/data/seo.mjs (Dutch-first NL/DE/EN).
 */
const SITE_URL = process.env.SITE_URL || 'https://ultimaitech.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const ROUTE_SLUGS = {
  home: { nl: '/', de: '/de/', en: '/en/' },
  services: { nl: '/diensten/', de: '/de/leistungen/', en: '/en/services/' },
  websites: { nl: '/diensten/websites/', de: '/de/leistungen/websites/', en: '/en/services/websites/' },
  software: { nl: '/diensten/software/', de: '/de/leistungen/software/', en: '/en/services/software/' },
  aiChatbots: { nl: '/diensten/ai-chatbots/', de: '/de/leistungen/ki-chatbots/', en: '/en/services/ai-chatbots/' },
  projects: { nl: '/projecten/', de: '/de/projekte/', en: '/en/work/' },
  about: { nl: '/over/', de: '/de/ueber/', en: '/en/about/' },
  blog: { nl: '/blog/', de: '/de/blog/', en: '/en/blog/' },
  contact: { nl: '/contact/', de: '/de/kontakt/', en: '/en/contact/' },
  privacy: { nl: '/privacy/', de: '/de/datenschutz/', en: '/en/privacy/' },
  terms: { nl: '/voorwaarden/', de: '/de/agb/', en: '/en/terms/' },
};

const BLOG_BASE = ROUTE_SLUGS.blog;

function alternatesForPaths(pathByLocale) {
  return [
    { hreflang: 'nl', href: SITE_URL + pathByLocale.nl },
    { hreflang: 'de', href: SITE_URL + pathByLocale.de },
    { hreflang: 'en', href: SITE_URL + pathByLocale.en },
    { hreflang: 'x-default', href: SITE_URL + pathByLocale.nl },
  ];
}

function metaEntry(title, description, canonical, alternates, ogType = 'website') {
  return {
    title,
    description,
    canonical,
    alternates,
    ogTitle: title,
    ogDescription: description,
    ogImage: OG_IMAGE,
    ogType,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: OG_IMAGE,
  };
}

const seoByRouteKey = {
  home: metaEntry(
    'ultimAItech — Websites & Software op Maat | Wanneperveen',
    'ultimAItech bouwt snelle websites, software en AI-chatbots voor ondernemers in Drenthe & Overijssel. Gevestigd in Wanneperveen.',
    SITE_URL + '/',
    alternatesForPaths(ROUTE_SLUGS.home)
  ),
  services: metaEntry(
    'Diensten — Websites, Software & AI-chatbots | ultimAItech',
    'Van maatwerk websites tot AI-chatbots — bekijk wat ultimAItech voor uw bedrijf kan betekenen.',
    SITE_URL + '/diensten/',
    alternatesForPaths(ROUTE_SLUGS.services)
  ),
  websites: metaEntry(
    'Website laten maken in Drenthe & Overijssel | ultimAItech',
    'Professionele website of webshop laten maken? ultimAItech bouwt snelle, vindbare maatwerk websites voor ondernemers in Drenthe en Overijssel. Vaste prijs, persoonlijk contact.',
    SITE_URL + '/diensten/websites/',
    alternatesForPaths(ROUTE_SLUGS.websites)
  ),
  software: metaEntry(
    'Software op maat laten maken | Webapplicaties & automatisering | ultimAItech',
    'Software op maat voor MKB in Drenthe en Overijssel. Webapplicaties, systeemkoppelingen en automatisering die tijd besparen en fouten voorkomen. Vaste prijs, persoonlijk contact.',
    SITE_URL + '/diensten/software/',
    alternatesForPaths(ROUTE_SLUGS.software)
  ),
  aiChatbots: metaEntry(
    'AI-chatbot laten maken voor uw website | ultimAItech',
    'Een AI-chatbot op uw website die vragen beantwoordt op basis van uw eigen content. Voor MKB in Drenthe en Overijssel. Slimme klantenservice, 24/7 bereikbaar.',
    SITE_URL + '/diensten/ai-chatbots/',
    alternatesForPaths(ROUTE_SLUGS.aiChatbots)
  ),
  projects: metaEntry(
    'Projecten — ultimAItech',
    'Uitgewerkte cases voor ondernemers in Drenthe en Overijssel.',
    SITE_URL + '/projecten/',
    alternatesForPaths(ROUTE_SLUGS.projects)
  ),
  about: metaEntry(
    'Over ultimAItech — Webdeveloper in Wanneperveen',
    'Persoonlijk, vakkundig en altijd bereikbaar.',
    SITE_URL + '/over/',
    alternatesForPaths(ROUTE_SLUGS.about)
  ),
  blog: metaEntry(
    'Blog — Tips over Websites & SEO | ultimAItech',
    'Artikelen over webontwikkeling, software op maat en AI-toepassingen.',
    SITE_URL + '/blog/',
    alternatesForPaths(ROUTE_SLUGS.blog)
  ),
  contact: metaEntry(
    'Contact — ultimAItech | Wanneperveen, Overijssel',
    'Neem contact op met ultimAItech in Wanneperveen. Vrijblijvend gesprek, snelle reactie.',
    SITE_URL + '/contact/',
    alternatesForPaths(ROUTE_SLUGS.contact)
  ),
  privacy: metaEntry(
    'Privacybeleid — ultimAItech',
    'Hoe ultimAItech omgaat met persoonsgegevens (AVG).',
    SITE_URL + '/privacy/',
    alternatesForPaths(ROUTE_SLUGS.privacy)
  ),
  terms: metaEntry(
    'Algemene voorwaarden — ultimAItech',
    'Algemene voorwaarden van ultimAItech.',
    SITE_URL + '/voorwaarden/',
    alternatesForPaths(ROUTE_SLUGS.terms)
  ),
};

const pathToRouteKey = {};
for (const [key, slugs] of Object.entries(ROUTE_SLUGS)) {
  for (const locale of ['nl', 'de', 'en']) {
    pathToRouteKey[slugs[locale].replace(/\/$/, '') || '/'] = key;
  }
}

function blogPostAlternates(slug) {
  return alternatesForPaths({
    nl: `${BLOG_BASE.nl}${slug}/`,
    de: `${BLOG_BASE.de}${slug}/`,
    en: `${BLOG_BASE.en}${slug}/`,
  });
}

function getMetaForPath(pathname) {
  const normalized = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const clean = normalized || '/';
  const routeKey = pathToRouteKey[clean];
  if (routeKey && seoByRouteKey[routeKey]) {
    return seoByRouteKey[routeKey];
  }
  if (clean.startsWith('/blog/') || clean.startsWith('/de/blog/') || clean.startsWith('/en/blog/')) {
    return seoByRouteKey.blog;
  }
  return seoByRouteKey.home;
}

module.exports = {
  seoByPath: seoByRouteKey,
  getMetaForPath,
  blogPostAlternates,
  SITE_URL,
  OG_IMAGE,
};
