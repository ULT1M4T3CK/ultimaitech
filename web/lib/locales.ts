import de from "@/data/locales/de";
import en from "@/data/locales/en";
import nl, { type Dictionary } from "@/data/locales/nl";

export type Locale = "nl" | "de" | "en";
export type { Dictionary };

const dictionaries = { nl, de, en } as const;

export function getDictionary(locale: string): Dictionary {
  if (locale === "de") return dictionaries.de as Dictionary;
  if (locale === "en") return dictionaries.en as Dictionary;
  return dictionaries.nl as Dictionary;
}

export const locales: Locale[] = ["nl", "de", "en"];

export const LOCALE_LABELS: Record<Locale, string> = {
  nl: "NL",
  de: "DE",
  en: "EN",
};

export const LOCALE_PATHS = {
  home: { nl: "/", de: "/de/", en: "/en/" },
  services: { nl: "/diensten/", de: "/de/leistungen/", en: "/en/services/" },
  websites: {
    nl: "/diensten/websites/",
    de: "/de/leistungen/websites/",
    en: "/en/services/websites/",
  },
  software: {
    nl: "/diensten/software/",
    de: "/de/leistungen/software/",
    en: "/en/services/software/",
  },
  aiChatbots: {
    nl: "/diensten/ai-chatbots/",
    de: "/de/leistungen/ki-chatbots/",
    en: "/en/services/ai-chatbots/",
  },
  projects: { nl: "/projecten/", de: "/de/projekte/", en: "/en/work/" },
  about: { nl: "/over/", de: "/de/ueber/", en: "/en/about/" },
  blog: { nl: "/blog/", de: "/de/blog/", en: "/en/blog/" },
  contact: { nl: "/contact/", de: "/de/kontakt/", en: "/en/contact/" },
  privacy: { nl: "/privacy/", de: "/de/datenschutz/", en: "/en/privacy/" },
  terms: { nl: "/voorwaarden/", de: "/de/agb/", en: "/en/terms/" },
  offer: { nl: "/offer/", de: "/de/offer/", en: "/en/offer/" },
} as const;
