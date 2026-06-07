import { LOCALE_PATHS, type Locale } from '@/lib/locales';

const SEGMENT_MAP: Record<Locale, Record<string, string>> = {
  nl: {
    diensten: 'services',
    'diensten/websites': 'services/websites',
    'diensten/software': 'services/software',
    'diensten/ai-chatbots': 'services/ai-chatbots',
    projecten: 'projects',
    over: 'about',
    blog: 'blog',
    contact: 'contact',
    privacy: 'privacy',
    voorwaarden: 'terms',
    offer: 'offer',
  },
  de: {
    leistungen: 'services',
    'leistungen/websites': 'services/websites',
    'leistungen/software': 'services/software',
    'leistungen/ki-chatbots': 'services/ai-chatbots',
    projekte: 'projects',
    ueber: 'about',
    blog: 'blog',
    kontakt: 'contact',
    datenschutz: 'privacy',
    agb: 'terms',
    offer: 'offer',
  },
  en: {
    services: 'services',
    'services/websites': 'services/websites',
    'services/software': 'services/software',
    'services/ai-chatbots': 'services/ai-chatbots',
    work: 'projects',
    about: 'about',
    blog: 'blog',
    contact: 'contact',
    privacy: 'privacy',
    terms: 'terms',
    offer: 'offer',
  },
};

const ROUTE_KEYS = [
  ['services/websites', 'websites'],
  ['services/software', 'software'],
  ['services/ai-chatbots', 'aiChatbots'],
  ['services', 'services'],
  ['projects', 'projects'],
  ['about', 'about'],
  ['blog', 'blog'],
  ['contact', 'contact'],
  ['privacy', 'privacy'],
  ['terms', 'terms'],
  ['offer', 'offer'],
] as const;

function stripEdges(path: string): string {
  return path.replace(/^\/|\/$/g, '');
}

export function parseLocalePath(pathname: string): { locale: Locale; segment: string } {
  const clean = stripEdges(pathname);

  if (clean === 'de' || clean.startsWith('de/')) {
    return { locale: 'de', segment: clean === 'de' ? '' : clean.slice(3) };
  }
  if (clean === 'en' || clean.startsWith('en/')) {
    return { locale: 'en', segment: clean === 'en' ? '' : clean.slice(3) };
  }
  if (clean === 'nl' || clean.startsWith('nl/')) {
    return { locale: 'nl', segment: clean === 'nl' ? '' : clean.slice(3) };
  }

  return { locale: 'nl', segment: clean };
}

export function toInternalSegment(locale: Locale, segment: string): string {
  if (!segment) return '';
  const map = SEGMENT_MAP[locale];
  if (map[segment]) return map[segment];

  for (const [localized, internal] of Object.entries(map)) {
    if (segment.startsWith(`${localized}/`)) {
      return `${internal}/${segment.slice(localized.length + 1)}`;
    }
  }
  return segment;
}

export function localePathForSegment(locale: Locale, segment: string, query?: string): string {
  if (!segment) return LOCALE_PATHS.home[locale];

  for (const [internal, key] of ROUTE_KEYS) {
    if (segment === internal) {
      return LOCALE_PATHS[key][locale];
    }
    if (segment.startsWith(`${internal}/`)) {
      const rest = segment.slice(internal.length + 1);
      const base = LOCALE_PATHS[key][locale].replace(/\/$/, '');
      return `${base}/${rest}/`;
    }
  }

  return LOCALE_PATHS.home[locale];
}
