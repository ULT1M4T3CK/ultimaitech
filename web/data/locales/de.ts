const locale = 'de';

const slugs = {
  home: '/de/',
  services: '/de/leistungen/',
  websites: '/de/leistungen/websites/',
  software: '/de/leistungen/software/',
  aiChatbots: '/de/leistungen/ki-chatbots/',
  projects: '/de/projekte/',
  about: '/de/ueber/',
  blog: '/de/blog/',
  blogPost: '/de/blog/_post/',
  contact: '/de/kontakt/',
  privacy: '/de/datenschutz/',
  terms: '/de/agb/',
  offer: '/de/offer/',
};

const nav = [
  { name: 'Home', path: slugs.home },
  { name: 'Leistungen', path: slugs.services },
  { name: 'Projekte', path: slugs.projects },
  { name: 'Über uns', path: slugs.about },
  { name: 'Blog', path: slugs.blog },
  { name: 'Kontakt', path: slugs.contact },
];

const closing = {
  eyebrow: 'Kontakt',
  headline: 'Ein klarer Plan für Website oder Software?',
  subtext:
    'Planen Sie ein unverbindliches Kennenlerngespräch. Gemeinsam finden wir den besten Ansatz für Ihre Website, Webshop oder Software.',
  primary: 'Gespräch planen',
  secondary: 'Leistungen ansehen',
  responseNote: 'Kein Verkaufsgespräch — sondern Klarheit zu Vorgehen, Umfang und nächsten Schritten. Antwort innerhalb eines Werktags.',
  navCta: 'Kontakt',
};

const footer = {
  tagline: 'Zuverlässige Websites und maßgeschneiderte Software aus Wanneperveen — für Unternehmer in Drenthe, Overijssel und Niedersachsen.',
  copyright: `© ${new Date().getFullYear()} ultimAItech. Alle Rechte vorbehalten.`,
  bottomLine: 'Registriert bei der Handelskammer Overijssel.',
  columns: {
    diensten: {
      title: 'Leistungen',
      links: [
        ['Websites & Webshops', slugs.websites],
        ['Individuelle Software', slugs.software],
        ['KI & Chatbots', slugs.aiChatbots],
      ],
    },
    bedrijf: {
      title: 'Unternehmen',
      links: [
        ['Über uns', slugs.about],
        ['Projekte', slugs.projects],
        ['Blog', slugs.blog],
        ['Kontakt', slugs.contact],
      ],
    },
    vertrouwen: {
      title: 'Vertrauen',
      links: [
        ['Datenschutz', slugs.privacy],
        ['AGB', slugs.terms],
      ],
    },
  },
};

const home = {
  hero: {
    headline: 'Zuverlässige Websites und maßgeschneiderte Software — aus Wanneperveen.',
    subtext:
      'Für Unternehmer in Drenthe, Overijssel und Niedersachsen, die eine Website, einen Webshop oder eine individuelle Anwendung brauchen, die funktioniert, schnell lädt und langfristig hält. Ein Ansprechpartner, feste Vereinbarungen, planbare Lieferung.',
    cta1: 'Unverbindliches Gespräch planen',
    cta2: 'Projekte ansehen',
    trustLine: 'Festpreise · direkter Kontakt · Lieferung mit Dokumentation',
  },

  nexus: {
    heroLabel: 'Digital systems studio · Wanneperveen',
    headline: 'Digitale Systeme, die Regionalunternehmen prüfen können — aus Wanneperveen.',
    subheadline:
      'Websites, individuelle Software und KI-Systeme für Unternehmer in Drenthe, Overijssel und der Grenzregion. Ein Studio, feste Vereinbarungen, Live-Portfolio.',
    trustLine: 'Festpreis · direkte Linie · Lieferung mit Dokumentation',
    servicesLabel: 'Leistungen',
    servicesTitle: 'Drei Säulen, ein Ansprechpartner',
    servicesIntro:
      'Websites, Software und KI — unter einem Dach, ohne Zwischenebenen. Jedes Projekt mit festem Scope und nachweisbarer Lieferung.',
    workLabel: 'Projekte',
    workTitle: 'Arbeit, die Sie selbst beurteilen können',
    workIntro: 'Live Cases aus der Region — von Buchungsplattformen bis Webshops mit Auftragsverwaltung.',
    aiLabel: 'KI',
    aiTitle: 'Intelligente Systeme auf Ihren eigenen Inhalten',
    aiIntro: 'Chatbots und Automatisierung, die Ihr Team entlasten — 24/7, in NL · DE · EN.',
    aiCallout:
      'KI als Ergänzung: Antworten auf Basis Ihrer Inhalte, mit Weiterleitung bei persönlichem Kontakt.',
    processLabel: 'Arbeitsweise',
    processTitle: 'Vom Kennenlernen bis zur Lieferung',
    trustLabel: 'Vertrauen',
    trustHeadline: 'Keine Ebenen. Keine Überraschungen. Nachweisbare Lieferung.',
    trustIntro: 'Transparente Arbeitsweise, Festpreise und Dokumentation, die Sie selbst prüfen können.',
    contactHeadline: 'Bereit, Ihr digitales System zu besprechen?',
    hubExplore: 'Hub erkunden — ziehen Sie, um Portale zu entdecken',
    portalLabels: {
      services: 'Leistungen',
      projects: 'Projekte',
      about: 'Über uns',
      hub: 'Hub',
    },
  },

  projects: [
    {
      slug: 'nijenhuis-botenverhuur',
      title: 'Nijenhuis Botenverhuur',
      label: 'Referenz',
      image: '/assets/images/usecases/nijenhuis-usecase.jpeg',
      description:
        'Von veralteter Website zu buchungsorientierter Website und Blog für Bootsverleih bei Giethoorn.',
      featured: true,
    },
    {
      slug: 'houthandel-jan-sok',
      title: 'Houthandel Jan Sok',
      image: '/assets/images/usecases/houthandel-jan-sok-usecase.jpeg',
      description: 'Vom WordPress-Builder zur maßgeschneiderten Webshop mit eigenem Auftragsmanagement.',
    },
    {
      slug: 'wal-beschoeiing',
      title: 'WAL Beschoeiing',
      image: '/assets/images/usecases/wal-beschoeiing-usecase.jpeg',
      description: 'Vom Shopify-Template zur maßgeschneiderten Webshop mit projektbezogenem Auftragsmanagement.',
    },
  ],

  intro: {
    title: 'Was ist ultimAItech?',
    text: 'ultimAItech ist ein selbstständiger Website- und Softwareentwickler aus Wanneperveen, Overijssel. Ich baue professionelle Websites, Webshops und individuelle Software für Unternehmer in Drenthe, Overijssel und Niedersachsen — von Freizeitbetrieben und Holzhändlern bis zu Webshops und Dienstleistern. Keine Agentur mit Zwischenebenen: Sie arbeiten direkt mit mir, mit Festpreisen, klarem Prozess und Lieferung inklusive Dokumentation. KI-Chatbots sind eine ergänzende Leistung für Unternehmen, die ihre Website oder Software mit intelligentem Kundenservice erweitern möchten.',
  },

  socialProof: {
    label: 'Warum Unternehmen uns wählen',
    items: [
      { value: '1', label: 'Ansprechpartner von Anfang bis Lieferung' },
      { value: 'DSGVO', label: 'bewusster Umgang mit personenbezogenen Daten' },
      { value: 'NL · DE · EN', label: 'Inhalte und Kommunikation in Ihrer Sprache' },
    ],
  },

  whoWeServe: {
    label: 'Für wen',
    title: 'Unternehmer, die Ergebnisse wollen, kein Rauschen',
    items: [
      { title: 'Freizeit & Tourismus', text: 'Buchungsplattformen, Zielseiten und Blogs für Betriebe in und um Giethoorn, Weerribben-Wieden und die Grenzregion.' },
      { title: 'Handel & Webshops', text: 'Maßgeschneiderte Webshops und Auftragsverwaltung für Holzhandel, Beschotung und andere Branchen, in denen Standardvorlagen nicht ausreichen.' },
      { title: 'KMU & Dienstleistung', text: 'Professionelle Websites und Webanwendungen für Unternehmen, die besser auffindbar sein und Prozesse optimieren möchten.' },
      { title: 'Grenzregion NL/DE', text: 'Websites und Chatbots auf Niederländisch, Deutsch und Englisch — ideal für Unternehmer, die auch deutsche Kunden bedienen.' },
    ],
  },

  principles: [
    {
      icon: 'Shield',
      title: 'Professionalität',
      text: 'Solides Handwerk, saubere Lieferung und klare Kommunikation bei jedem Schritt. Keine leeren Versprechen, sondern nachweisbare Ergebnisse, die Sie selbst beurteilen können — inklusive Live-Projekte im Portfolio.',
    },
    {
      icon: 'CheckCircle2',
      title: 'Zuverlässigkeit',
      text: 'Vereinbart ist vereinbart. Festpreise, klare Planung und ein direkter Ansprechpartner von Anfang bis Ende. Sie wissen im Voraus, was Sie bekommen, wann es fertig ist und was es kostet.',
    },
    {
      icon: 'Heart',
      title: 'Vertrauen',
      text: 'Transparente Arbeitsweise, ehrliche Beratung und Dokumentation, die Sie selbst überprüfen können. Ihr Projekt ist in guten Händen — auch nach der Lieferung, mit Nachbetreuung und Erreichbarkeit für Fragen.',
    },
  ],

  services: [
    {
      icon: 'MonitorSmartphone',
      title: 'Websites & Webshops',
      text: 'Professionelle Websites und Webshops, die schnell laden, gut auffindbar sind und Besucher in Kunden verwandeln.',
      link: slugs.websites,
      cta: 'Mehr über Websites',
    },
    {
      icon: 'Blocks',
      title: 'Individuelle Software',
      text: 'Webanwendungen, Schnittstellen und Automatisierungen, die genau das tun, was Ihr Unternehmen braucht.',
      link: slugs.software,
      cta: 'Mehr über Software',
    },
    {
      icon: 'BotMessageSquare',
      title: 'KI & Chatbots',
      text: 'Ein KI-Chatbot auf Ihrer Website, der Fragen anhand Ihrer eigenen Inhalte beantwortet — 24/7 erreichbar, weniger Wiederholungsfragen.',
      link: slugs.aiChatbots,
      cta: 'Mehr über KI',
    },
  ],

  region: {
    label: 'Region',
    title: 'Aktiv in Drenthe, Overijssel und Niedersachsen',
    text: 'Ansässig in Wanneperveen, tätig in ganz Drenthe und Overijssel — von Meppel und Zwolle bis Assen und der Overijsseler Nordspitze. Persönlicher Kontakt, kurze Wege und Kenntnis des lokalen Marktes machen den Unterschied: Ich verstehe, wie Unternehmer in der Region arbeiten und was ihre Kunden erwarten. Auch erreichbar für Unternehmer direkt hinter der Grenze in Niedersachsen, mit Websites und Chatbots auf Deutsch.',
    areas: ['Drenthe', 'Overijssel', 'Grenzregion Niedersachsen'],
  },

  featuredProject: {
    label: 'Referenzprojekt',
    title: 'Nijenhuis Botenverhuur',
    description:
      'Komplette Erneuerung: von einer veralteten Seite mit defekten Links zu einer buchungsorientierten Website und Blog für Bootsverleih bei Giethoorn und Weerribben-Wieden.',
    highlights: [
      'Direkter Buchungsablauf mit Datumswahl und Bootstyp',
      'Zielseiten für Giethoorn, Belt-Schutsloot und Wanneperveen',
      'Blog mit regionalem Inhalt für Auffindbarkeit und Vertrauen',
      'Cross-Selling für Ferienhaus, Camping und Yachthafen',
    ],
    cta: 'Projekte ansehen',
    ctaExternal: 'Website besuchen',
    externalUrl: 'https://nijenhuis-botenverhuur.com',
  },

  howWeWork: {
    label: 'Arbeitsweise',
    title: 'Vom ersten Gespräch bis zur Lieferung',
    subtitle: 'Ein klarer Prozess ohne Überraschungen — damit Sie genau wissen, woran Sie sind.',
    steps: [
      {
        step: '01',
        title: 'Kennenlernen',
        text: 'Unverbindliches Gespräch über Ihre Wünsche, Ziele und Ihr Budget. Keine Verpflichtungen, aber sofort Klarheit darüber, was machbar ist und welcher Ansatz am besten passt.',
      },
      {
        step: '02',
        title: 'Angebot & Planung',
        text: 'Ein klares Angebot mit Festpreis, konkreten Meilensteinen und realistischer Planung. Sie wissen genau, was gebaut wird, wann und zu welchen Kosten.',
      },
      {
        step: '03',
        title: 'Umsetzung & Feedback',
        text: 'Sie sehen den Fortschritt bei jedem Meilenstein und geben Feedback, bevor es weitergeht. Keine Überraschungen am Ende — Sie sind bei jeder wichtigen Entscheidung eingebunden.',
      },
      {
        step: '04',
        title: 'Lieferung & Nachbetreuung',
        text: 'Lieferung mit Dokumentation, Einweisung und einer festen Nachbetreuungsphase. Sie können sofort loslegen und sind nicht von mir für tägliche Anpassungen abhängig.',
      },
    ],
  },

  cta: {
    headline: 'Bereit, Ihr Projekt zu besprechen?',
    subtext:
      'Planen Sie ein unverbindliches Kennenlerngespräch. Zusammen schauen wir, was der beste Ansatz für Ihre Website, Ihren Webshop oder Ihr Softwareprojekt ist.',
    button: 'Gespräch planen',
    secondary: 'Leistungen ansehen',
  },
};

const services = {
  hero: {
    label: 'Leistungen',
    title: 'Was ich für Sie tun kann',
    description:
      'Von einer professionellen Website bis hin zu individueller Software und smarten KI-Anwendungen. Immer mit persönlicher Betreuung, festen Vereinbarungen und einem klaren Ergebnis — für Unternehmer in Drenthe, Overijssel und der Grenzregion.',
  },

  intro: {
    title: 'Drei Säulen, ein Ansprechpartner',
    text: 'ultimAItech bietet drei Kernleistungen: Websites und Webshops, individuelle Software und KI-Chatbots. Die meisten Kunden starten mit einer Website oder einem Webshop; wenn Prozesse komplexer werden, baue ich individuelle Software oder Schnittstellen. KI-Chatbots sind eine Ergänzung — sinnvoll, wenn Ihre Website viele Besucherfragen erhält oder wenn Sie niederländische und deutsche Kunden bedienen. Alles aus einer Hand, mit einem Entwickler, der Ihr Projekt von Anfang bis Ende begleitet. Schauen Sie sich die Projekte an, um zu sehen, was konkret möglich ist, oder planen Sie ein Gespräch, um Ihre Situation zu besprechen.',
  },

  pillars: [
    {
      icon: 'MonitorSmartphone',
      title: 'Websites & Webshops',
      text: 'Professionelle Websites und Webshops, die schnell laden, bei Google gut ranken und Besucher in Kunden verwandeln. Geeignet für Unternehmensseiten, Webshops, Landingpages und Zielseiten. Maßarbeit statt WordPress-Vorlagen — schneller, sicherer und vollständig auf Ihre Marke abgestimmt.',
      link: slugs.websites,
      cta: 'Mehr über Websites',
      fit: ['Unternehmer, die eine neue oder überarbeitete Website brauchen', 'Betriebe, die besser auffindbar sein wollen', 'Webshops, die mehr verkaufen möchten'],
    },
    {
      icon: 'Blocks',
      title: 'Individuelle Software',
      text: 'Webanwendungen, Schnittstellen zu bestehenden Systemen und Automatisierungen, die Zeit und Fehler sparen. Gebaut auf moderner Technologie, abgestimmt auf Ihre Prozesse — von Auftragsverwaltung und Reservierungssystemen bis zu internen Dashboards und API-Anbindungen.',
      link: slugs.software,
      cta: 'Mehr über Software',
      fit: ['Unternehmen mit Prozessen, die besser automatisiert werden könnten', 'Teams, die Schnittstellen zwischen Systemen brauchen', 'Organisationen, die eine einzigartige Anwendung entwickeln lassen möchten'],
    },
    {
      icon: 'BotMessageSquare',
      title: 'KI & Chatbots',
      text: 'Ein KI-Chatbot auf Ihrer Website, der Fragen anhand Ihrer eigenen Inhalte beantwortet. Smarter Kundenservice, der immer erreichbar ist — auf Niederländisch, Deutsch und Englisch. Ideal als Ergänzung zu einer bestehenden Website oder als Teil eines neuen Projekts.',
      link: slugs.aiChatbots,
      cta: 'Mehr über KI',
      fit: ['Websites mit vielen Besucherfragen', 'Unternehmen, die ihren Kundenservice unterstützen möchten', 'Teams, die internes Wissen schneller zugänglich machen wollen'],
    },
  ],

  approach: {
    label: 'Ansatz',
    title: 'Wie ich arbeite',
    points: [
      'Persönlicher Kontakt — Sie sprechen immer mit derselben Person, von der Aufnahme bis zur Nachbetreuung',
      'Festpreisvereinbarungen — keine Überraschungen im Nachhinein; Umfang und Kosten stehen im Voraus fest',
      'Transparente Planung — Sie wissen genau, wann was fertig ist, mit Zwischendemos',
      'Dokumentation und Übergabe — Sie sind nie nur von mir abhängig; alles ist übertragbar',
      'Regionale Ausrichtung — Kenntnis von Drenthe, Overijssel und der Grenzregion; auch deutschsprachige Projekte',
    ],
  },

  region: {
    label: 'Region',
    title: 'Leistungen in Drenthe, Overijssel und Grenzregion',
    text: 'ultimAItech ist in Wanneperveen ansässig und arbeitet für Unternehmer in ganz Drenthe und Overijssel. Ob Sie in Meppel, Zwolle, Assen oder der Overijsseler Nordspitze sitzen: persönlicher Kontakt und kurze Wege sind Standard. Auch für Unternehmen in Niedersachsen baue ich Websites und Chatbots auf Deutsch.',
    areas: ['Drenthe', 'Overijssel', 'Grenzregion Niedersachsen'],
  },

  whenToStart: {
    label: 'Wann starten',
    title: 'Wiedererkennbare Situationen',
    items: [
      { title: 'Ihre Website ist veraltet', text: 'Langsame Ladezeiten, defekte Links oder ein Design, das kein Vertrauen weckt. Zeit für eine neue Seite, die Besucher in Kunden verwandelt.' },
      { title: 'WordPress oder Shopify reicht nicht', text: 'Vorlagen und Plugins schränken ein, was Sie tun können. Maßarbeit gibt volle Kontrolle über Design, Geschwindigkeit und Funktionalität.' },
      { title: 'Prozesse laufen manuell', text: 'Aufträge, Reservierungen oder Angebote per E-Mail und Excel. Individuelle Software automatisiert und schafft Überblick.' },
      { title: 'Viele Wiederholungsfragen von Besuchern', text: 'Öffnungszeiten, Preise, Verfügbarkeit — ein KI-Chatbot beantwortet sie 24/7 anhand Ihrer eigenen Inhalte.' },
    ],
  },

  faq: {
    title: 'Häufige Fragen zu Leistungen',
    items: [
      {
        q: 'Was kostet eine Website oder ein Webshop?',
        a: 'Das hängt vom Umfang ab: eine Unternehmensseite beginnt ab ca. €2.500, ein Webshop mit Auftragsverwaltung ab ca. €5.000. Nach einem Kennenlerngespräch erhalten Sie ein Angebot mit Festpreis — keine Überraschungen im Nachhinein.',
      },
      {
        q: 'Wie lange dauert ein Projekt?',
        a: 'Eine Unternehmensseite: 4–8 Wochen. Ein Webshop oder individuelle Software: 8–16 Wochen, je nach Komplexität. Sie erhalten eine realistische Planung mit Meilensteinen, bevor wir starten.',
      },
      {
        q: 'Bieten Sie auch Wartung an?',
        a: 'Ja. Nach der Lieferung können Sie ein Wartungsabonnement für Updates, Sicherheit und kleine Anpassungen abschließen. Sie sind nicht verpflichtet — aber viele Kunden wählen es für ein gutes Gefühl.',
      },
      {
        q: 'WordPress oder Maßarbeit — was ist besser?',
        a: 'Für die meisten KMU in der Region liefert Maßarbeit bessere Geschwindigkeit, Sicherheit und Flexibilität. WordPress kann für einfache Blogs funktionieren; für Webshops, Buchungen und Schnittstellen ist Maßarbeit oft die bessere Wahl.',
      },
      {
        q: 'Kann ich einen KI-Chatbot zu einer bestehenden Website hinzufügen?',
        a: 'Ja. Ein Chatbot kann als Widget auf jeder Website eingebunden werden. Ideal als Ergänzung, wenn Sie bereits eine Website haben, aber viele Besucherfragen automatisieren möchten.',
      },
    ],
  },
};

const websites = {
  hero: {
    label: 'Websites & Webshops',
    title: 'Website erstellen lassen — Maßarbeit für Unternehmer in Drenthe und Overijssel',
    description:
      'Sie wollen eine Website, die Kunden bringt, nicht nur gut aussieht. ultimAItech erstellt professionelle Websites und Webshops auf Maß. Ansässig in Wanneperveen — ein Ansprechpartner, Festpreise und Lieferung inklusive Dokumentation.',
  },

  whyCustom: {
    title: 'Warum eine individuelle Website?',
    text: 'Die meisten Websites in der Region laufen auf WordPress mit einem Standard-Theme. Das funktioniert — bis es nicht mehr funktioniert. Langsame Ladezeiten, Sicherheitslücken, Plugin-Konflikte und eingeschränkte Anpassbarkeit sind häufige Probleme.',
    benefits: [
      'Ladezeit unter 2 Sekunden — Besucher müssen nicht warten, Google belohnt Geschwindigkeit',
      'Keine Plugin-Abhängigkeit — weniger Wartung, weniger Sicherheitsrisiken',
      'Volle Kontrolle über Design und Funktionalität — Ihre Seite tut genau das, was Ihr Unternehmen braucht',
      'Zukunftssicher — skalierbar ohne von vorn zu beginnen',
    ],
    comparison: {
      customLabel: 'Maßarbeit (ultimAItech)',
      otherLabel: 'WordPress (Standard)',
      rows: [
        { label: 'Ladezeit', custom: '< 2 Sekunden', other: '3–6 Sekunden' },
        { label: 'Sicherheit', custom: '7/7 Security Headers', other: 'Abhängig von Plugins' },
        { label: 'Wartung', custom: 'Minimal', other: 'Wöchentliche Updates nötig' },
        { label: 'Einzigartigkeit', custom: '100% individuell', other: 'Erkennbares Template' },
        { label: 'SEO-Grundlage', custom: 'Eingebaut', other: 'Zusätzliche Plugins nötig' },
      ],
    },
  },

  capabilities: [
    {
      icon: 'LayoutTemplate',
      title: 'Professionelle Website auf Maß',
      text: 'Eine vollständig responsive Website, die auf jedem Gerät gut aussieht — vom Smartphone bis zum Desktop. Gebaut mit sauberem Code, optimierten Bildern und einer Struktur, die Google versteht.',
      features: [
        'Responsives Design (Mobile-first)',
        'SEO-optimierte Seitenstruktur und Metadaten',
        'Schnelles Hosting mit CDN (Cloudflare)',
        'SSL-Zertifikat und Security Headers',
        'Strukturierte Daten (Schema.org) für Rich Snippets',
        'Barrierefrei nach WCAG-Richtlinien',
        'CMS-Integration zum selbst Inhalte verwalten',
      ],
    },
    {
      icon: 'Store',
      title: 'Webshop erstellen lassen',
      text: 'Ein Webshop, der nicht nur Produkte zeigt, sondern auch verkauft. Sicheres Bezahlen, übersichtliche Bestandsverwaltung und Anbindungen an Ihre Buchhaltung.',
      features: [
        'Sicheres Bezahlen mit iDEAL, Kreditkarte und anderen Methoden',
        'Produkt- und Bestandsverwaltung',
        'Kundenkonten und Bestellverlauf',
        'Anbindung an Buchhaltungspakete (Moneybird, e-Boekhouden, Exact)',
        'Automatische Versandlabels und Track & Trace',
      ],
    },
    {
      icon: 'ScanSearch',
      title: 'SEO und Auffindbarkeit',
      text: 'Jede Website wird mit einer soliden SEO-Grundlage geliefert. Keine leeren Versprechen — messbare Ergebnisse in der Google Search Console.',
      features: [
        'Keyword-Recherche für Ihre Branche und Region',
        'Optimierte Seitentitel, Meta-Beschreibungen und Überschriften',
        'Technisches SEO: Sitemap, robots.txt, Canonical URLs, hreflang',
        'Lokales SEO: Google-Unternehmensprofil, regionale Keywords',
        'Core Web Vitals Optimierung (LCP, FID, CLS)',
      ],
    },
  ],

  audience: {
    title: 'Für wen?',
    items: [
      'Unternehmer, die eine neue Website brauchen — Sie starten durch oder Ihre aktuelle Seite ist veraltet',
      'Betriebe, die besser auffindbar sein wollen — Sie haben eine Website, aber Kunden finden Sie nicht über Google',
      'Webshops, die mehr verkaufen möchten — Ihr aktueller Shop konvertiert nicht oder ist zu langsam',
      'Unternehmen, die unabhängig von WordPress sein wollen — Sie wollen eine Seite, die Sie nicht jede Woche updaten müssen',
    ],
  },

  process: {
    label: 'Arbeitsweise',
    title: 'Vom Kennenlernen bis zur Lieferung',
    steps: [
      { icon: 'MessageCircle', title: 'Kennenlernen', text: 'Unverbindliches Gespräch über Ihre Wünsche, Zielgruppe und Budget.' },
      { icon: 'FileText', title: 'Angebot mit Festpreis', text: 'Kein Stundensatz — ein klares Angebot mit Meilensteinen.' },
      { icon: 'Palette', title: 'Design', text: 'Wireframes und visuelles Design, Sie geben Feedback, bevor Code geschrieben wird.' },
      { icon: 'Code2', title: 'Umsetzung', text: 'Sauberer, getesteter Code mit moderner Technik.' },
      { icon: 'Rocket', title: 'Lieferung', text: 'Live-Schaltung mit Dokumentation, Einweisung und fester Nachbetreuungsphase.' },
    ],
  },

  faq: {
    title: 'Häufig gestellte Fragen',
    items: [
      {
        q: 'Was kostet eine Website?',
        a: 'Eine professionelle Website auf Maß beginnt ab €1.500 für eine kompakte Unternehmensseite (5–7 Seiten). Ein Webshop oder umfangreichere Seite mit Schnittstellen beginnt ab €3.000. Sie erhalten immer einen Festpreis im Voraus — keine versteckten Kosten.',
      },
      {
        q: 'Wie lange dauert die Erstellung einer Website?',
        a: 'Eine Standard-Unternehmenswebsite ist in 3–4 Wochen fertig. Komplexere Projekte mit Webshop oder Schnittstellen dauern 6–8 Wochen. Sie erhalten einen konkreten Zeitplan mit dem Angebot.',
      },
      {
        q: 'Kann ich meine Website selbst verwalten?',
        a: 'Ja. Jede Website wird mit einem benutzerfreundlichen CMS geliefert, mit dem Sie selbst Texte, Bilder und Seiten anpassen können. Eine Einweisung ist inklusive.',
      },
      {
        q: 'Warum kein WordPress?',
        a: 'WordPress ist gut für einfache Blogs, aber für Unternehmenswebsites gibt es bessere Optionen. Eine individuelle Seite lädt schneller, ist sicherer, braucht keine Plugin-Updates und gibt Ihnen volle Kontrolle.',
        link: { slug: 'maatwerk-website-of-wordpress', label: 'Individuelle Website oder WordPress — was passt zu Ihrem Unternehmen?' },
      },
      {
        q: 'Arbeiten Sie auch mit Unternehmen außerhalb von Drenthe und Overijssel?',
        a: 'Mein Fokus liegt auf Unternehmern in Drenthe und Overijssel, aber ich arbeite auch mit Betrieben im Rest der Niederlande und direkt hinter der Grenze in Niedersachsen. Der Kontakt läuft dann per Videocall.',
      },
      {
        q: 'Was passiert nach der Lieferung?',
        a: 'Nach der Lieferung erhalten Sie eine feste Nachbetreuungsphase (meist 30 Tage). Danach können Sie einen Wartungsvertrag für Updates, Monitoring und technischen Support wählen.',
      },
    ],
  },

  cta: {
    headline: 'Bereit, Ihre Website erstellen zu lassen?',
    text: 'Planen Sie ein unverbindliches Kennenlerngespräch. Kein Verkaufsgespräch — aber Klarheit über Ansatz, Kosten und Zeitplan.',
    button: 'Gespräch planen',
    secondary: 'Alle Leistungen ansehen',
  },
};

const software = {
  hero: {
    label: 'Individuelle Software',
    title: 'Software auf Maß — gebaut für Ihre Geschäftsprozesse',
    description:
      'Standardsoftware passt nie ganz. ultimAItech entwickelt Webanwendungen, Schnittstellen und Automatisierungen für KMU in Drenthe und Overijssel. Kein überflüssiges Paket — Software, die genau das tut, was Ihr Unternehmen braucht.',
  },

  whenCustom: {
    title: 'Wann Individualsoftware?',
    text: 'Nicht jedes Unternehmen braucht Individualsoftware. Standardpakete wie Exact, Moneybird oder Shopify sind ausgezeichnet, wenn sie zu Ihrer Arbeitsweise passen. Aber wenn Sie sich in einer dieser Situationen wiedererkennen, ist Maßarbeit die bessere Wahl:',
    items: [
      'Sie kopieren Daten manuell zwischen zwei oder mehr Systemen',
      'Ihr Workflow passt nicht in die Standardsoftware, die Sie jetzt nutzen',
      'Sie haben einen einzigartigen Prozess, den keine bestehende Lösung abdeckt',
      'Sie zahlen für 10 Module, nutzen aber nur 2',
      'Sie wollen Systeme verbinden, die standardmäßig nicht miteinander kommunizieren',
      'Ihr wachsendes Team stößt an Grenzen mit Excel-Dateien und gemeinsamen Ordnern',
    ],
  },

  capabilities: [
    {
      icon: 'AppWindow',
      title: 'Webanwendungen',
      text: 'Komplette Webanwendungen, die auf jedem Gerät funktionieren — von Bestandssystemen und Kundenportalen bis zu Planungstools und Dashboards.',
      example: 'Ein Holzhandel in Meppel verwaltete Aufträge, Bestand und Kundendaten in drei getrennten Systemen. Jetzt läuft alles in einer Webanwendung mit automatischer Synchronisation.',
      features: [
        'Moderne, schnelle Oberfläche (React)',
        'Benutzerverwaltung mit Rollen und Rechten',
        'Echtzeitdaten und Berichte',
        'Responsives Design: funktioniert auf Desktop, Tablet und Smartphone',
        'Skalierbar: wächst mit Ihrem Unternehmen',
      ],
    },
    {
      icon: 'Cable',
      title: 'Schnittstellen & Integrationen',
      text: 'Ihre bestehenden Systeme miteinander verbinden, damit Daten automatisch am richtigen Ort landen.',
      example: 'Ein Webshop, der Bestellungen automatisch an Buchhaltung und Versanddienstleister weiterleitet — ohne manuelles Abtippen.',
      features: [
        'Anbindung an Buchhaltungspakete (Exact, Moneybird, e-Boekhouden)',
        'Bestands- und Auftragssynchronisation',
        'API-Entwicklung und Webhooks',
        'Einmalige Datenmigration oder kontinuierliche Synchronisation',
        'Anbindung an externe Plattformen (Bol.com, Amazon, Lightspeed)',
      ],
    },
    {
      icon: 'Workflow',
      title: 'Automatisierung',
      text: 'Wiederkehrende Aufgaben automatisieren, damit Sie und Ihr Team sich auf wichtige Arbeit konzentrieren.',
      example: 'Ein Verleihunternehmen, das automatisch Verfügbarkeit aktualisiert, Bestätigungsmails sendet und eine tägliche Übersicht für die Planung erstellt.',
      features: [
        'Automatisierte Workflows (Bestellabwicklung, Nachverfolgung, Benachrichtigungen)',
        'Geplante Aufgaben und Berichte',
        'Fehlererkennung und automatische Meldungen',
        'Dokumentenerstellung: Rechnungen, Angebote, Berichte',
        'E-Mail- und Benachrichtigungsflows',
      ],
    },
  ],

  tech: {
    label: 'Technologie',
    title: 'Gebaut mit moderner, bewährter Technologie',
    text: 'Keine exotischen Frameworks, die in zwei Jahren nicht mehr gepflegt werden. Solide Entscheidungen, die jeder Entwickler übernehmen kann.',
    stack: [
      { name: 'React, Next.js, Tailwind CSS', category: 'Frontend' },
      { name: 'Node.js, Python', category: 'Backend' },
      { name: 'PostgreSQL, SQLite', category: 'Datenbank' },
      { name: 'TypeScript', category: 'Sprache' },
      { name: 'Docker, Linux, AWS', category: 'Infrastruktur' },
      { name: 'REST, GraphQL, Webhooks', category: 'APIs' },
    ],
  },

  process: {
    label: 'Arbeitsweise',
    title: 'Von der Bestandsaufnahme bis zur Lieferung',
    steps: [
      { icon: 'ClipboardList', title: 'Bestandsaufnahme', text: 'Ihre Prozesse, Engpässe und Wünsche erfassen. Welche Aufgaben kosten jetzt zu viel Zeit? Wo geht es schief?' },
      { icon: 'FileText', title: 'Funktionales Design', text: 'Was soll die Software tun? Bildschirme, Workflows und Schnittstellen ausarbeiten, bevor Code geschrieben wird.' },
      { icon: 'BadgeEuro', title: 'Festpreis', text: 'Ein klares Angebot mit Umfang, Zeitplan und Festpreis. Kein Stundensatz.' },
      { icon: 'Code2', title: 'Umsetzung in Sprints', text: 'Sie sehen den Fortschritt und geben bei jedem Meilenstein Feedback.' },
      { icon: 'Rocket', title: 'Lieferung', text: 'Live-Schaltung mit Dokumentation, Benutzereinweisung und fester Nachbetreuungsphase.' },
    ],
  },

  faq: {
    title: 'Häufig gestellte Fragen',
    items: [
      {
        q: 'Was kostet Individualsoftware?',
        a: 'Das hängt von der Komplexität ab. Eine einfache Schnittstelle oder Automatisierung beginnt ab €2.000. Eine komplette Webanwendung mit Benutzerverwaltung und Schnittstellen beginnt ab €5.000. Sie erhalten immer einen Festpreis im Voraus mit klarer Umfangsbeschreibung.',
      },
      {
        q: 'Wie lange dauert es?',
        a: 'Eine Systemintegration oder Automatisierung ist oft in 2–4 Wochen fertig. Eine Webanwendung dauert 6–12 Wochen, je nach Umfang. Sie erhalten einen konkreten Zeitplan mit dem Angebot.',
      },
      {
        q: 'Kann ich meine aktuelle Software weiter nutzen?',
        a: 'Meistens ja. Individualsoftware muss Ihre bestehenden Tools nicht ersetzen — sie kann die Brücke zwischen Systemen sein, die Sie bereits nutzen. Die meisten Projekte sind Schnittstellen oder Ergänzungen zu dem, was bereits läuft.',
      },
      {
        q: 'Wer wartet die Software nach der Lieferung?',
        a: 'Nach der Lieferung erhalten Sie eine feste Nachbetreuungsphase. Danach können Sie einen Wartungsvertrag für Updates, Bugfixes und technischen Support wählen. Der Code gehört immer Ihnen — Sie sind nirgends gebunden.',
      },
      {
        q: 'Ich weiß nicht genau, was ich brauche. Kann ich trotzdem Kontakt aufnehmen?',
        a: 'Absolut. Die meisten Unternehmer kennen ihr Problem, aber nicht die beste technische Lösung. Genau dafür ist das Kennenlerngespräch — gemeinsam klären wir, ob Maßarbeit der richtige Ansatz ist.',
      },
      {
        q: 'Arbeiten Sie auch mit Unternehmen außerhalb der Region?',
        a: 'Mein Fokus liegt auf Drenthe und Overijssel, aber Softwareprojekte laufen oft weitgehend digital ab. Für Unternehmen im Rest der Niederlande oder hinter der Grenze in Deutschland arbeite ich per Videocall.',
      },
    ],
  },

  cta: {
    headline: 'Kommen Sie mit Ihrer aktuellen Arbeitsweise nicht weiter?',
    text: 'Planen Sie ein unverbindliches Gespräch. Kein Verkaufsgespräch — aber Klarheit darüber, ob Maßarbeit die richtige Lösung ist und was es kosten wird.',
    button: 'Gespräch planen',
    secondary: 'Alle Leistungen ansehen',
  },
};

const aiChatbots = {
  hero: {
    label: 'KI & Chatbots',
    title: 'KI-Chatbot für Ihre Website — smarter Kundenservice, der immer erreichbar ist',
    description:
      'Ihre Kunden haben Fragen. Ein KI-Chatbot beantwortet die häufigsten sofort, 24/7, auf Basis Ihrer eigenen Inhalte. Entwickelt von ultimAItech für KMU in Drenthe und Overijssel.',
  },

  whatIs: {
    title: 'Was ist ein KI-Chatbot?',
    text: 'Ein KI-Chatbot ist ein Gesprächspartner auf Ihrer Website, der Besucherfragen versteht und auf Basis Ihrer eigenen Informationen beantwortet. Kein fester Entscheidungsbaum mit vordefinierten Antworten, sondern ein smartes System, das:',
    bullets: [
      'Natürliche Sprache versteht — Besucher formulieren ihre Frage in eigenen Worten',
      'Auf Basis Ihrer Inhalte antwortet — der Chatbot kennt Ihre Website, Produkte, Leistungen und FAQ',
      'Weiterleitet wenn nötig — kennt der Chatbot die Antwort nicht, leitet er zum richtigen Kontaktformular oder zur Telefonnummer weiter',
      'Aus Ihrem Feedback lernt — Antworten werden besser, wenn Sie angeben, was stimmt und was nicht',
    ],
  },

  benefits: {
    title: 'Was bringt es?',
    items: [
      {
        title: 'Weniger Wiederholungsfragen',
        text: 'Die durchschnittliche KMU-Website erhält 60–80% der gleichen Fragen. Öffnungszeiten, Preise, Lieferzeiten, Retouren. Ein Chatbot fängt diese ab, damit Sie sich auf Fragen mit persönlicher Betreuung konzentrieren.',
      },
      {
        title: '24/7 Erreichbarkeit',
        text: 'Ihr Chatbot schläft nicht. Besucher, die abends oder am Wochenende Ihre Seite besuchen, erhalten sofort Antwort. Das ist der Moment, in dem sie entscheiden — nicht am nächsten Werktag.',
      },
      {
        title: 'Höhere Conversion',
        text: 'Ein Besucher, der sofort Antwort erhält, bricht seltener ab. Studien zeigen, dass Websites mit Chatbot 20–30% mehr Leads generieren als ohne.',
      },
      {
        title: 'Einblick in Kundenfragen',
        text: 'Jede Frage an den Chatbot wird protokolliert. Nach einem Monat wissen Sie genau, was Besucher fragen — und können Website, FAQ oder Angebot entsprechend anpassen.',
      },
    ],
  },

  examples: {
    title: 'Beispiele aus der Praxis',
    items: [
      {
        title: 'Bootsverleih',
        text: 'Ein Verleih bei Giethoorn bekommt täglich die gleichen Fragen: „Brauche ich einen Bootsführerschein?", „Was kostet ein Elektroboot pro Stunde?", „Sind am Samstag noch Boote verfügbar?" Der Chatbot antwortet direkt mit aktuellen Infos aus dem Reservierungssystem.',
      },
      {
        title: 'Holzhandel',
        text: 'Ein Holzhandel in Meppel bekommt Fragen zu Holzarten, Maßen, Lieferzeiten und Öffnungszeiten. Der Chatbot kennt den Produktkatalog und kann spezifische Fragen beantworten: „Haben Sie Eichenbretter mit 3 Metern?" → Antwort mit Preis und Lagerstatus.',
      },
      {
        title: 'Webdesign-Büro',
        text: 'Ein Webdesigner bekommt Fragen zu Kosten, Zeitplan und was bei einer Website dazugehört. Der Chatbot beantwortet Orientierungsfragen und plant ein Kennenlerngespräch, wenn der Besucher weiter möchte.',
      },
    ],
  },

  flow: {
    label: 'Wie es funktioniert',
    title: 'Von Inhalten bis zum live Chatbot',
    steps: [
      { icon: 'ScanSearch', title: 'Inhalte sammeln', text: 'Ich analysiere Ihre Website, FAQ, Preislisten und weitere Dokumentation. Das wird die Wissensbasis Ihres Chatbots.' },
      { icon: 'Bot', title: 'Chatbot bauen und trainieren', text: 'Der Chatbot wird mit Ihren Inhalten, Ihrem Design und Ihrer Tonalität konfiguriert. Sie bestimmen, wie der Bot sich verhält: formell oder locker, ausführlich oder knapp.' },
      { icon: 'ListChecks', title: 'Testen und nachjustieren', text: 'Bevor der Chatbot live geht, testen wir gemeinsam mit realistischen Fragen. Falsche Antworten werden korrigiert.' },
      { icon: 'LayoutDashboard', title: 'Live und monitoren', text: 'Der Chatbot geht live auf Ihrer Website. Sie erhalten Zugang zu einem Dashboard mit allen Gesprächen, um zu sehen, welche Fragen gestellt werden und wie der Bot performt.' },
    ],
  },

  tech: {
    title: 'Technische Details',
    rows: [
      { aspect: 'KI-Modell', spec: 'GPT-4 oder vergleichbar (state-of-the-art)' },
      { aspect: 'Wissensbasis', spec: 'Ihre Website, Dokumente, FAQ, Produktdaten' },
      { aspect: 'Sprachen', spec: 'Niederländisch, Deutsch, Englisch' },
      { aspect: 'Integration', spec: 'Widget auf Ihrer Website, optional WhatsApp/E-Mail' },
      { aspect: 'Datenschutz', spec: 'Daten werden nicht für KI-Training genutzt. DSGVO-konform' },
      { aspect: 'Hosting', spec: 'EU-Server, keine Daten außerhalb Europas' },
    ],
  },

  faq: {
    title: 'Häufig gestellte Fragen',
    items: [
      {
        q: 'Was kostet ein KI-Chatbot?',
        a: 'Ein Basis-Chatbot auf Basis Ihrer Website-Inhalte beginnt ab €750 einmalig + €50/Monat für Hosting und KI-Kosten. Umfangreichere Chatbots mit Anbindungen an Reservierungssysteme, Produktkataloge oder CRM beginnen ab €2.000.',
      },
      {
        q: 'Kann der Chatbot falsche Antworten geben?',
        a: 'Der Chatbot antwortet ausschließlich auf Basis Ihrer eigenen Inhalte. Ist die Information nicht verfügbar, sagt der Bot ehrlich, dass er die Antwort nicht kennt, und leitet zum persönlichen Kontakt weiter. Halluzinationen werden durch eine begrenzte Wissensbasis minimiert.',
      },
      {
        q: 'Brauche ich technisches Wissen?',
        a: 'Nein. Ich baue, konfiguriere und warte den Chatbot für Sie. Ändert sich Ihr Inhalt (neue Produkte, angepasste Preise), aktualisiere ich die Wissensbasis.',
      },
      {
        q: 'In welchen Sprachen funktioniert der Chatbot?',
        a: 'Der Chatbot beherrscht Niederländisch, Deutsch und Englisch. Ideal für Unternehmen in der Grenzregion, die auch deutsche Kunden bedienen.',
      },
      {
        q: 'Ersetzt ein Chatbot meinen Kundenservice?',
        a: 'Nein, ein Chatbot ist eine Ergänzung. Er fängt häufige Fragen ab, damit Sie und Ihr Team sich auf komplexe Fragen und persönlichen Kontakt konzentrieren. Der Chatbot leitet weiter, wenn menschliche Aufmerksamkeit nötig ist.',
      },
      {
        q: 'Wie sieht es mit Datenschutz (DSGVO) aus?',
        a: 'Gespräche werden auf EU-Servern verarbeitet. Personenbezogene Daten werden nicht gespeichert, es sei denn, der Besucher stimmt zu (z. B. beim Hinterlassen einer E-Mail-Adresse). Der Chatbot ist DSGVO-konform.',
      },
    ],
  },

  cta: {
    headline: 'Möchten Sie wissen, was ein Chatbot für Ihr Unternehmen bedeuten kann?',
    text: 'Planen Sie ein unverbindliches Gespräch. Ich zeige Ihnen, wie ein Chatbot auf Ihrer Website aussehen würde und welche Fragen er beantworten kann.',
    button: 'Gespräch planen',
    secondary: 'Zurück zu Leistungen',
  },
};

const projects = {
  hero: {
    label: 'Projekte',
    title: 'Arbeit, die Sie selbst beurteilen können',
    description:
      'Echte Projekte, öffentlich einsehbar. Keine anonymen Testimonials oder vage Behauptungen, sondern konkrete Arbeit — auch wenn eine veraltete Seite oder eine Vorlage durch individuelles Design und eigene Systeme ersetzt wird.',
  },

  intro: {
    title: 'Offenes Portfolio, keine leeren Versprechen',
    text: 'Jede Case Study auf dieser Seite ist live einsehbar — von Bootsverleih mit Buchungsablauf bis Holzhandel mit maßgeschneidertem Webshop und Beschotung nach einer Shopify-Vorlage. Sie sehen nicht nur das Endergebnis, sondern auch die Herausforderung (veraltete Seite, WordPress-Builder, Template-Einschränkungen) und den Ansatz. Das ist bewusst: Unternehmer in Drenthe und Overijssel verdienen Einblick in das, was ein Projekt wirklich bedeutet, bevor sie eine Entscheidung treffen. Klicken Sie auf ein Projekt für die vollständige Case Study oder planen Sie ein Gespräch, wenn Sie ähnliche Arbeit für Ihr Unternehmen besprechen möchten.',
  },

  caseStudyUi: {
    challengeTitle: 'Die Herausforderung',
    solutionTitle: 'Die Lösung',
    deliverablesTitle: 'Wichtigste Deliverables',
    ctaLive: 'Live-Website ansehen',
    ctaFullCase: 'Vollständigen Use Case ansehen',
    backToProjects: 'Zurück zu Projekten',
  },

  cases: [
    {
      label: 'Freizeit & Buchungen',
      title: 'Nijenhuis Botenverhuur',
      subtitle: 'Von einer veralteten Seite zu einem klaren Buchungsweg — plus Blog für Inhalte und Auffindbarkeit.',
      description:
        'Die frühere Website wirkte veraltet, hatte defekte Links und keine klare Struktur. Ersetzt wurde sie durch eine moderne, buchungsorientierte Seite für ein Familienunternehmen in Wanneperveen: Bootsverleih bei Giethoorn und im Nationalpark Weerribben-Wieden, mit klaren Wegen zu Ferienhaus, Hafen und Camping. Zusätzlich gibt es einen Blog: praktische Beiträge zum Revier, Saison und Tipps — damit die Seite inhaltlich wachsen und regional besser sichtbar bleiben kann.',
      situation: '',
      slug: 'nijenhuis-botenverhuur',
      seoTitle: 'Case: Nijenhuis Botenverhuur — ultimAItech',
      seoDescription:
        'Von veralteter Website zu buchungsorientierter Experience und Blog für Bootsverleih bei Giethoorn und Weerribben-Wieden. Herausforderung, Lösung und Deliverables.',
      image: '/assets/images/usecases/nijenhuis-usecase.jpeg',
      imageAlt: 'Screenshot der Website nijenhuis-botenverhuur.com',
      highlights: [
        'Startseite mit Buchungswidget und klarer Customer Journey',
        'Bootskategorien mit Preisen, Verfügbarkeit und Motoroptionen',
        'Zielseiten für Giethoorn, Belt-Schutsloot und Wanneperveen',
        'Blog mit regionalem Content, Saisontipps und SEO',
        'Cross-Selling für Ferienhaus, Camping und Yachthafen',
      ],
      challenge: {
        intro:
          'Die bestehende Seite erfüllte ihren Job nicht mehr: Besucher fanden schwer, was sie suchten, und der Auftritt wirkte wenig vertrauenswürdig für eine Urlaubserfahrung auf dem Wasser.',
        points: [
          'Veraltete, inkonsistente visuelle Identität und schwache mobile Darstellung.',
          'Defekte Links und unklare Navigation zu Bootstypen und Buchung.',
          'Kein klarer Buchungsablauf: viele Rückfragen und Telefonwege.',
          'Wenig Raum für regionalen Content und Sichtbarkeit außerhalb der Hochsaison.',
        ],
      },
      solution: {
        intro:
          'Eine neue, schnelle Website mit klarer Customer Journey: von Orientierung zu Bootswahl, Datum und Checkout — ergänzt durch einen Blog für Giethoorn und Umgebung.',
        points: [
          'Startseite mit Buchungswidget und klaren Schritten für Gäste.',
          'Bootskategorien mit Preisen, Verfügbarkeit und Motoroptionen.',
          'Zielseiten für Giethoorn, Belt-Schutsloot und Wanneperveen.',
          'Blog für Saison, Tipps und SEO; Cross-Selling zu Haus, Camping und Hafen.',
        ],
      },
      deliverables: [
        { icon: 'LayoutGrid', title: 'Startseite mit Buchungswidget und klarer Customer Journey' },
        { icon: 'Ship', title: 'Bootskategorien mit Preisen, Verfügbarkeit und Motoroptionen' },
        { icon: 'ScanSearch', title: 'SEO und regionale Landingpages für das Revier' },
        { icon: 'ShoppingCart', title: 'Cross-Selling zu Ferienhaus, Camping und Yachthafen' },
      ],
      detailBlocks: [
        {
          title: 'Kontext',
          body: 'Nijenhuis Botenverhuur ist ein Familienbetrieb in Wanneperveen, aktiv rund um Giethoorn und den Nationalpark Weerribben-Wieden. Die alte Seite war organisch gewachsen: Informationen verteilt, Buchungen teils per Mail — im Tourismus zählt eine klare, verlässliche erste Online-Impression.',
        },
        {
          title: 'Vorgehen & Ergebnis',
          body: 'Wir haben die Informationsarchitektur neu aufgebaut rund um die wichtigste Conversion: eine Reservierung abschließen. Zielseiten und Blogbeiträge halten die Seite auch außerhalb der Hochsaison sichtbar. Live unter nijenhuis-botenverhuur.com.',
        },
      ],
      facts: [
        {
          title: 'Unternehmensart',
          text: 'Familienbetrieb für Bootsverleih mit Ferienhaus, Camping und Yachthafen in Wanneperveen bei Giethoorn.',
        },
        {
          title: 'Buchungen & Inhalt',
          text: 'Direkter Buchungsablauf mit Datum, Bootstyp und Warenkorb — ergänzt durch einen Blog für Sichtbarkeit und Vertrauen bei neuen Gästen.',
        },
        {
          title: 'Region',
          text: 'Seiten und Inhalte mit Fokus auf Giethoorn, Weerribben-Wieden und Umgebung.',
        },
      ],
      ctaVisit: 'Website besuchen',
      ctaAsk: 'Ähnliches Projekt besprechen',
      externalUrl: 'https://nijenhuis-botenverhuur.com',
    },
    {
      label: 'Holzhandel & Shop',
      title: 'Houthandel Jan Sok',
      subtitle: 'Von WordPress mit Website-Baukasten zu individuellem Webdesign mit eigenem Shop und Auftragsverwaltung.',
      description:
        'Zuvor lief alles auf WordPress mit einem generischen Baukasten: einfache Struktur, wenig professioneller Auftritt und begrenzter Raum für einen ernsthaften Onlineshop. Das wurde vollständig ersetzt durch ein eigenes Design und einen maßgeschneiderten Webshop. Aufträge stecken nicht mehr in einer starren Vorlage, sondern laufen über ein Auftragsmanagement, das zu Jan Soks Abläufen passt — von der Anfrage bis zur Abwicklung.',
      situation:
        'Ausgangspunkt: WordPress mit Standard-Baukasten — flache Hierarchie, geringe professionelle Wirkung und kein belastbares E-Commerce-Fundament.',
      slug: 'houthandel-jan-sok',
      seoTitle: 'Case: Houthandel Jan Sok — ultimAItech',
      seoDescription:
        'Von WordPress-Baukasten zu individuellem Webshop und Auftragsverwaltung für einen Holzhandel. Herausforderung, Lösung und Deliverables.',
      image: '/assets/images/usecases/houthandel-jan-sok-usecase.jpeg',
      imageAlt: 'Screenshot der Website houthandeljansok.nl',
      highlights: [
        'Vollständig individuelles Webdesign — keine Vorlage, sondern Marke und Klarheit',
        'Maßgeschneiderter Shop passend zu Sortiment und Kundschaft',
        'Eigenes Order-Management mit Status und nächsten Schritten',
        'Klare, skalierbare Struktur statt Baukasten-Layout',
      ],
      challenge: {
        intro:
          'Die Seite musste Vertrauen bei Privat- und Gewerbekunden schaffen und gleichzeitig ein reifes Kanal für Online-Holzverkauf werden — inklusive Maßlogistik.',
        points: [
          'WordPress mit Page-Builder: begrenzte Markenwirkung und wenig Layout-Freiheit.',
          'Kein robustes E-Commerce-Grundgerüst für Katalog und Checkout im Maßstab.',
          'Auftragsstatus und Folgeschritte waren für Kunde und Team nicht transparent.',
          'Wenig Raum für eine klare Produkthierarchie (Sorten, Längen, Anwendungen).',
        ],
      },
      solution: {
        intro:
          'Individuelles Frontend und Shop: Produktlogik und Auftragsverwaltung passend zum echten Betrieb von Jan Sok — mit ruhigem, professionellem Auftritt.',
        points: [
          'Custom Webdesign ohne Vorlage — Marke, Hierarchie und Überblick im Zentrum.',
          'Maßgeschneiderter Shop mit Sortimentslogik für Holz und Kundentypen.',
          'Eigenes Auftragsmanagement mit klarem Status, Lieferung und Folgeaktionen.',
          'Skalierbare Struktur: bereit für Wachstum ohne erneut gegen Template-Grenzen zu stoßen.',
        ],
      },
      deliverables: [
        { icon: 'Palette', title: 'Vollständig individuelles Webdesign und markenorientiertes Layout' },
        { icon: 'ShoppingCart', title: 'Webshop mit Produktstruktur passend zum Sortiment' },
        { icon: 'Layers', title: 'Auftragsverwaltung und Überblick von Anfrage bis Lieferung' },
        { icon: 'LayoutGrid', title: 'Skalierbare Seitenstruktur statt Baukasten-Blöcken' },
      ],
      detailBlocks: [
        {
          title: 'Kontext',
          body: 'Jan Sok beliefert eine Mischung aus Privat- und Gewerbekunden. Die alte Seite wirkte wie ein Builder-Projekt mit begrenzter Shop-Logik: komplexe Produktentscheidungen und Lieferfenster waren schwer verständlich.',
        },
        {
          title: 'Vorgehen & Ergebnis',
          body: 'Neuaufbau von Informationsarchitektur und Checkout: welche Schritte der Kunde sieht, wie Maß und Verfügbarkeit kommuniziert werden, und wie Aufträge intern nachvollziehbar bleiben. Live: houthandeljansok.nl.',
        },
      ],
      facts: [
        {
          title: 'Herausforderung',
          text: 'Alte WordPress-Seite mit Baukasten: geringe Professionalität und kein robustes E-Commerce-Grundgerüst.',
        },
        {
          title: 'Vorgehen',
          text: 'Neue Seite und Shop von Grund auf, mit maßgeschneiderter Oberfläche und Backend für Katalog, Aufträge und interne Abläufe.',
        },
        {
          title: 'Ergebnis',
          text: 'Ein Kanal: professioneller Auftritt und praktische Auftragsabwicklung in einem System.',
        },
      ],
      ctaVisit: 'Website besuchen',
      ctaAsk: 'Ähnliches Vorhaben besprechen',
      externalUrl: 'https://houthandeljansok.nl',
    },
    {
      label: 'Böschung & Projekte',
      title: 'WAL Beschoeiing',
      subtitle: 'Von Shopify-Vorlage zu individuellem Design mit Auftragsverwaltung für projektbasierte Verkäufe.',
      description:
        'Zuvor war es ein Shopify-Shop mit Standard-Theme: wenig Differenzierung, begrenzte Layout-Freiheit und kein wirklicher Fit für den Ablauf von Beschotungsprojekten — oft Maßarbeit, Planung und Folgeschritte. Die neue Lösung setzt auf individuelles Webdesign mit Shop und Order-Flow, der auf Projekte zugeschnitten ist: Besucher verstehen, was WAL leistet, und intern bleiben Aufträge nachvollziehbar jenseits generischer Shopify-Grenzen.',
      situation:
        'Ausgangspunkt: Shopify mit Template-Build — schnell online, aber wenig Flexibilität für ein Spezialunternehmen der Beschotung.',
      slug: 'wal-beschoeiing',
      seoTitle: 'Case: WAL Beschoeiing — ultimAItech',
      seoDescription:
        'Von Shopify-Vorlage zu individuellem Webshop und projektbasiertem Auftragsmanagement für Beschotung. Herausforderung, Lösung und Deliverables.',
      image: '/assets/images/usecases/wal-beschoeiing-usecase.jpeg',
      imageAlt: 'Screenshot der Website wal-beschoeiing.nl',
      highlights: [
        'Individuelles Webdesign statt generischem Shop-Template',
        'Shop und Seiten, die das projektbasierte Beschotungsgeschäft abbilden',
        'Eigenes Auftragsmanagement unabhängig von Template-Limitierungen',
        'Professionelle Struktur: Leistungen, Ablauf und Conversion für die Zielgruppe',
      ],
      challenge: {
        intro:
          'Shopify mit Standard-Theme brachte Geschwindigkeit, aber kein Narrativ für projektbasierte Beschotung: Angebote, Planung und Nachbetreuung brauchten Maßwerk außerhalb der Template-Schiene.',
        points: [
          'Wenig differenzierend visuell und begrenzte Freiheit bei der Seitenstruktur.',
          'Generischer Shop-Flow: schwierig, Leistungen, Arbeitsweise und Referenzen zu verbinden.',
          'Auftragspfad nicht auf Folgeschritte nach der ersten Anfrage ausgelegt.',
          'Intern: wenig Kontrolle über Maßaufträge versus Standardprodukte.',
        ],
      },
      solution: {
        intro:
          'Eigenes Design und Shop-Flow: Seiten und Auftragsverwaltung, die das Projektgeschäft der Beschotung abbilden — mit professionellem Auftritt für Bau und öffentliche Hand.',
        points: [
          'Individuelles Webdesign statt generischem Shop-Template.',
          'Shop und Landingpages, die Beschotung und Arbeitsweise klar machen.',
          'Eigenes Auftragsmanagement ohne die alten Template-Limitierungen.',
          'Conversion-orientierte Struktur: Leistungen, Vertrauen und klare nächste Schritte.',
        ],
      },
      deliverables: [
        { icon: 'Palette', title: 'Individuelles Webdesign und markenorientierter Auftritt' },
        { icon: 'Layers', title: 'Shop und Seiten für projektbasierte Beschotung' },
        { icon: 'ShoppingCart', title: 'Auftragsverwaltung passend zu Anfragen und Folge' },
        { icon: 'Building2', title: 'Professionelle Struktur für Leistungen und Zielgruppe' },
      ],
      detailBlocks: [
        {
          title: 'Kontext',
          body: 'WAL steht für Beschotung und Erdarbeiten für Kunden, die Qualität und Planung ernst nehmen. Die frühere Shopify-Lösung war kommerziell nutzbar, erzählte aber Projekt- und Expertisegeschichte zu wenig.',
        },
        {
          title: 'Vorgehen & Ergebnis',
          body: 'Neu strukturiert rund um klare Leistungen, Referenzen und einen Auftragsfluss, der zu angebotsgetriebenem Arbeiten passt. Live: wal-beschoeiing.nl.',
        },
      ],
      facts: [
        {
          title: 'Herausforderung',
          text: 'Shopify mit Template: schnell online, aber wenig Raum für Maßprojekte und eine klare Darstellung der Arbeitsweise.',
        },
        {
          title: 'Vorgehen',
          text: 'Eigenes Design und Shop-Flow passend zu Beschotung, Anfragen und Nachgang — ohne Template-Zwang.',
        },
        {
          title: 'Ergebnis',
          text: 'Professioneller Auftritt und praktischer Auftragsfluss für projektbasierte Aufträge.',
        },
      ],
      ctaVisit: 'Website besuchen',
      ctaAsk: 'Ähnliches Vorhaben besprechen',
      externalUrl: 'https://wal-beschoeiing.nl',
    },
  ],

  cta: {
    headline: 'Möchten Sie ähnliche Arbeit für Ihr Unternehmen?',
    text: 'Besprechen Sie, was ein vergleichbares Projekt für Ihre Situation bedeuten würde — Umfang, Ansatz und erwartete Ergebnisse.',
    button: 'Gespräch planen',
    secondary: 'Leistungen ansehen',
  },
};

const about = {
  hero: {
    label: 'Über ultimAItech',
    title: 'Persönlich, fachkundig und immer erreichbar',
    description:
      'ultimAItech wurde in Wanneperveen, Overijssel gegründet. Als selbstständiger Entwickler baue ich Websites und individuelle Software für Unternehmer in Drenthe, Overijssel und Niedersachsen — mit persönlichem Kontakt, festen Vereinbarungen und einem Portfolio, das Sie selbst beurteilen können.',
  },

  story: {
    title: 'Ein Ansprechpartner, keine Umwege',
    text: 'Wenn Sie mit ultimAItech arbeiten, arbeiten Sie direkt mit mir. Keine Zwischenpersonen, keine unklaren Verantwortlichkeiten, keine wechselnden Ansprechpartner. Ich übernehme Ihr Projekt von Anfang bis Ende — vom ersten Gespräch bis zur Lieferung und Nachbetreuung. Mein Fokus liegt auf Unternehmern in Drenthe, Overijssel und Niedersachsen, die einen zuverlässigen Partner für Websites, Webshops und individuelle Software suchen. Projekte wie Nijenhuis Botenverhuur, Houthandel Jan Sok und WAL Beschoeiing zeigen, was konkret möglich ist: von Buchungsplattformen bis zu Webshops mit Auftragsverwaltung.',
    values: [
      'Transparente Kommunikation bei jedem Schritt — Sie wissen immer, woran Sie sind',
      'Festpreisvereinbarungen ohne Überraschungen — Umfang und Kosten stehen im Voraus fest',
      'Dokumentation und Übergabe, damit Sie nicht von einer Person abhängig sind',
      'Erreichbar für Fragen, auch nach der Lieferung — mit Nachbetreuung und Unterstützung',
    ],
  },

  expertise: {
    label: 'Expertise',
    title: 'Was ich baue',
    text: 'Ich arbeite mit moderner Webtechnologie: schnelle, sichere Websites und Webanwendungen, die mit Ihrem Unternehmen skalieren. Keine WordPress-Vorlagen oder Shopify-Einschränkungen — alles auf Maß, abgestimmt auf Ihre Prozesse und Marke.',
    items: [
      { title: 'Websites & Webshops', text: 'Unternehmensseiten, Webshops, Zielseiten und Landingpages. Schnell, auffindbar und auf Conversion ausgerichtet.' },
      { title: 'Individuelle Software', text: 'Auftragsverwaltung, Reservierungssysteme, Schnittstellen und interne Dashboards für Prozesse, die Standardsoftware nicht abdeckt.' },
      { title: 'KI-Chatbots', text: 'Chatbots auf Basis Ihrer eigenen Inhalte, auf Niederländisch, Deutsch und Englisch — als Ergänzung zu Website oder Software.' },
      { title: 'Migrationen', text: 'Von WordPress, Shopify oder veralteten Sites zu Maßarbeit — ohne Funktionalität zu verlieren.' },
    ],
  },

  region: {
    label: 'Region',
    title: 'Einsatzgebiet',
    text: 'Ansässig in Wanneperveen, tätig in ganz Drenthe und Overijssel. Persönlicher Kontakt und kurze Wege — auch für Unternehmer in der Grenzregion Niedersachsen, mit deutschsprachigen Websites und Chatbots.',
    areas: ['Drenthe', 'Overijssel', 'Grenzregion Niedersachsen'],
  },

  business: {
    title: 'Firmendaten',
    name: 'ultimAItech',
    location: 'Wanneperveen, Overijssel',
    kvk: '98782800',
    btw: 'NL576150447B01',
    email: 'info@ultimaitech.com',
    areas: ['Drenthe', 'Overijssel', 'Grenzregion Niedersachsen'],
  },

  howIWork: {
    label: 'Arbeitsweise',
    title: 'So arbeite ich',
    steps: [
      { title: 'Zuhören', text: 'Erst verstehen, was Sie brauchen und warum, bevor ich ein Angebot mache. Keine Standardpakete — jede Situation ist anders.' },
      { title: 'Klares Angebot', text: 'Ein konkretes Angebot mit Festpreis, Planung und klaren Vereinbarungen. Sie wissen genau, was gebaut wird und wann.' },
      { title: 'Umsetzen mit Feedback', text: 'Sie sehen Zwischenergebnisse und geben Feedback bei jedem Meilenstein. Keine Überraschungen am Ende des Projekts.' },
      { title: 'Liefern und unterstützen', text: 'Lieferung mit Dokumentation und einer festen Nachbetreuungsphase. Sie können sofort loslegen.' },
    ],
  },

  faq: {
    title: 'Häufige Fragen',
    items: [
      {
        q: 'Warum ein Solo-Entwickler statt einer Agentur?',
        a: 'Sie sprechen immer mit derselben Person, von der Aufnahme bis zur Nachbetreuung. Keine Account Manager oder wechselnde Teams. Das bedeutet schnellere Entscheidungen, niedrigere Kosten und direkte Verantwortung.',
      },
      {
        q: 'Arbeiten Sie mit Festpreisen?',
        a: 'Ja. Nach einem Kennenlerngespräch erhalten Sie ein Angebot mit Festpreis für den vereinbarten Umfang. Kein Stundensatz und keine Überraschungen im Nachhinein.',
      },
      {
        q: 'Was passiert nach der Lieferung?',
        a: 'Sie erhalten Dokumentation und Einweisung. Optional können Sie ein Wartungsabonnement abschließen. Ich bleibe erreichbar für Fragen und kleine Anpassungen.',
      },
      {
        q: 'In welchen Sprachen arbeiten Sie?',
        a: 'Niederländisch, Deutsch und Englisch — für Websites, Chatbots und Kommunikation. Ideal für Unternehmer in der Grenzregion, die auch deutsche Kunden bedienen.',
      },
      {
        q: 'Muss ich vorbeikommen oder geht es auch remote?',
        a: 'Beides. Kennenlerngespräche können online oder bei Ihnen vor Ort in Drenthe/Overijssel stattfinden. Die Umsetzung verläuft größtenteils digital, mit Zwischendemos und Feedback-Momenten.',
      },
    ],
  },

  cta: {
    headline: 'Möchten Sie wissen, was ich für Sie tun kann?',
    text: 'Planen Sie ein unverbindliches Kennenlerngespräch. Keine Verpflichtungen, aber sofort Klarheit über die Möglichkeiten.',
    button: 'Gespräch planen',
    secondary: 'Projekte ansehen',
  },
};

const contact = {
  hero: {
    label: 'Kontakt',
    title: 'Kontakt aufnehmen',
    description:
      'Eine Frage zu Website, Webshop, Software oder KI-Chatbot? Senden Sie eine Nachricht oder planen Sie direkt ein unverbindliches Gespräch. Ich antworte innerhalb eines Werktages — persönlich, ohne Verkaufsgespräch. Ansässig in Wanneperveen, tätig in Drenthe, Overijssel und der Grenzregion.',
  },

  process: {
    label: 'Was passiert danach',
    title: 'Von der Nachricht zum Gespräch',
    steps: [
      { title: 'Sie senden eine Nachricht', text: 'Über das Formular unten. Erzählen Sie kurz, woran Sie denken — Website, Webshop, Software oder Chatbot.' },
      { title: 'Ich antworte innerhalb eines Werktages', text: 'Mit einer kurzen Reaktion und ggf. einem Vorschlag für ein Kennenlerngespräch — online oder bei Ihnen vor Ort.' },
      { title: 'Unverbindliches Gespräch', text: 'Wir besprechen Ihre Wünsche, Ziele und Ihr Budget. Keine Verpflichtungen, aber sofort Klarheit darüber, was machbar ist.' },
      { title: 'Angebot mit Festpreis', text: 'Wenn wir weitermachen wollen, erhalten Sie ein konkretes Angebot mit Umfang, Planung und Festpreis.' },
    ],
  },

  topics: {
    label: 'Wozu',
    title: 'Wobei Sie mich erreichen können',
    items: [
      { title: 'Neue Website oder Webshop', text: 'Von der Unternehmensseite bis zum vollständigen Webshop mit Auftragsverwaltung. Maßarbeit statt Vorlagen.' },
      { title: 'Individuelle Software', text: 'Auftragsverwaltung, Reservierungen, Schnittstellen oder interne Tools, die Ihre Prozesse optimieren.' },
      { title: 'KI-Chatbot', text: 'Ein Chatbot auf Ihrer Website, der Fragen anhand Ihrer eigenen Inhalte beantwortet — 24/7 erreichbar.' },
      { title: 'Erneuerung oder Migration', text: 'Von WordPress, Shopify oder einer veralteten Site zu einer schnellen, sicheren Maßlösung.' },
      { title: 'Beratung oder Zweitmeinung', text: 'Nicht sicher, was Sie brauchen? Ein kurzes Gespräch kann schon viel Klarheit bringen.' },
    ],
  },

  region: {
    label: 'Region',
    title: 'Einsatzgebiet',
    text: 'ultimAItech ist in Wanneperveen ansässig und arbeitet für Unternehmer in ganz Drenthe und Overijssel — von Meppel und Zwolle bis Assen. Kennenlerngespräche können online oder bei Ihnen vor Ort stattfinden; viele Kunden schätzen ein persönliches Gespräch vor Projektstart. Auch erreichbar für Unternehmen in Niedersachsen, mit Kommunikation auf Deutsch.',
    areas: ['Drenthe', 'Overijssel', 'Grenzregion Niedersachsen'],
    mapTitle: 'Standort',
  },

  form: {
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'ihre@email.de',
    companyLabel: 'Firmenname (optional)',
    companyPlaceholder: 'Ihr Unternehmen',
    intentLabel: 'Wobei kann ich Ihnen helfen?',
    intentOptions: [
      { value: 'website', label: 'Website oder Webshop' },
      { value: 'software', label: 'Individuelle Software' },
      { value: 'ai-chatbot', label: 'KI-Chatbot' },
      { value: 'redesign', label: 'Erneuerung oder Migration' },
      { value: 'other', label: 'Sonstiges / Beratung' },
    ],
    messageLabel: 'Ihre Nachricht',
    messagePlaceholder: 'Erzählen Sie kurz, woran Sie denken...',
    submit: 'Nachricht senden',
    successTitle: 'Nachricht gesendet',
    successText: 'Vielen Dank für Ihre Nachricht. Ich melde mich so schnell wie möglich bei Ihnen, in der Regel innerhalb eines Werktages.',
  },

  info: {
    title: 'Direkter Kontakt',
    email: 'info@ultimaitech.com',
    location: 'Wanneperveen, Overijssel',
    availability: 'Montag bis Freitag, 09:00 – 17:00 Uhr',
    locationLabel: 'Standort',
    availabilityLabel: 'Verfügbarkeit',
  },

  faq: {
    title: 'Häufige Fragen',
    items: [
      {
        q: 'Wie schnell antworten Sie?',
        a: 'Innerhalb eines Werktages, meist am selben Tag. Für dringende Fragen können Sie auch direkt an info@ultimaitech.com mailen.',
      },
      {
        q: 'Bekomme ich sofort eine Preisindikation?',
        a: 'Nach einem kurzen Gespräch kann ich eine Bandbreite nennen. Ein konkretes Angebot mit Festpreis folgt nach einer Kennenlernung, in der wir Umfang und Wünsche besprechen.',
      },
      {
        q: 'Wie läuft ein Kennenlerngespräch ab?',
        a: 'Etwa 30–45 Minuten, online oder bei Ihnen vor Ort. Wir besprechen Ihre Situation, Ziele und Budget. Keine Verpflichtungen — aber sofort Klarheit.',
      },
      {
        q: 'Arbeiten Sie auch auf Deutsch oder Englisch?',
        a: 'Ja. Kommunikation, Websites und Chatbots können auf Niederländisch, Deutsch und Englisch sein. Ideal für die Grenzregion.',
      },
      {
        q: 'Ich habe bereits eine Website — kann ich trotzdem Kontakt aufnehmen?',
        a: 'Sicher. Viele Kunden kommen für Erneuerung, Migration von WordPress/Shopify oder einen Chatbot als Ergänzung. Beschreiben Sie Ihre Situation im Formular.',
      },
      {
        q: 'Ist ein erstes Gespräch wirklich unverbindlich?',
        a: 'Ja. Eine Kennenlernung kostet Sie nichts und verpflichtet Sie zu nichts. Ziel ist zu verstehen, ob und wie ich Ihnen helfen kann — mit ehrlicher Beratung.',
      },
    ],
  },
};

const blog = {
  hero: {
    label: 'Blog',
    title: 'Aktuelles & Einblicke',
    description:
      'Artikel über Webentwicklung, individuelle Software, lokale SEO und KI-Chatbots — aus der Praxis für Unternehmer in Drenthe, Overijssel und Niedersachsen. Praktische Tipps zu Kosten, Entscheidungen und Auffindbarkeit. Keine Verkaufsgespräche.',
  },

  intro: {
    title: 'Wissen aus der Praxis teilen',
    text: 'In diesem Blog teile ich Einblicke aus Projekten und der täglichen Praxis als Website- und Softwareentwickler in Wanneperveen. Sie lesen hier über Themen, die KMU-Unternehmer in Drenthe und Overijssel direkt betreffen: Was kostet eine Website, wann wählen Sie Maßarbeit statt WordPress, wie verbessern Sie Ihre Auffindbarkeit in der Region, und wann ist ein KI-Chatbot sinnvoll? Die Artikel sind geschrieben, um Ihnen bei besseren Entscheidungen zu helfen — ob Sie mit mir arbeiten oder mit einer anderen Partei. Viele Beiträge behandeln konkrete Situationen: ein Shop, der an Vorlagen scheitert, eine Seite, die bei Google nicht mehr gefunden wird, oder Prozesse, die manuell bleiben, obwohl Automatisierung Zeit spart. Neue Artikel erscheinen regelmäßig; kommen Sie gerne wieder oder kontaktieren Sie mich, wenn Ihnen ein Thema fehlt.',
  },

  topics: {
    label: 'Themen',
    title: 'Schwerpunkte',
    items: [
      { title: 'Websites & Webshops', text: 'Kosten, Wahl zwischen Maßarbeit und WordPress, Geschwindigkeit, Sicherheit und wann eine neue Seite nötig ist. Inklusive Vergleichen und realistischen Preisindikationen für KMU in der Region.' },
      { title: 'Lokale SEO', text: 'Gefunden werden in Drenthe und Overijssel — Google Unternehmensprofil, regionale Inhalte, Zielseiten und typische Fehler von Unternehmern.' },
      { title: 'Software & Automatisierung', text: 'Wann Standardsoftware nicht ausreicht und Maßarbeit sich lohnt — Auftragsverwaltung, Schnittstellen, interne Tools und Amortisation.' },
      { title: 'KI & Chatbots', text: 'Praktische Anwendungen für KMU — was ein Chatbot kann, was er kostet, Datenschutz (DSGVO) und wann er als Ergänzung sinnvoll ist.' },
    ],
  },

  whyRead: {
    title: 'Warum dieser Blog?',
    text: 'Das Internet ist voll allgemeiner Tipps, die wenig mit einem Holzhandel in Overijssel oder einem Freizeitbetrieb bei Giethoorn zu tun haben. Diese Artikel sind aus Projekten in der Region geschrieben: was funktioniert, was nicht, und welche Entscheidungen Unternehmer später bereuen. Kein Clickbait, sondern ehrliche Beratung. Suchen Sie einen Partner für die Umsetzung? Sehen Sie sich Leistungen und Projekte an — oder kontaktieren Sie mich für ein unverbindliches Gespräch.',
  },

  faq: {
    title: 'Häufige Fragen zum Blog',
    items: [
      {
        q: 'Für wen sind diese Artikel geschrieben?',
        a: 'Für Unternehmer und KMU in Drenthe, Overijssel und der Grenzregion, die eine Website, einen Webshop oder Software in Betracht ziehen. Die Tipps sind praktisch und anwendbar, unabhängig davon, mit wem Sie letztlich arbeiten.',
      },
      {
        q: 'Wie oft erscheinen neue Artikel?',
        a: 'Regelmäßig, abhängig von der verfügbaren Zeit nach Kundenprojekten. Der Fokus liegt auf Qualität und Relevanz, nicht auf einem festen Veröffentlichungsplan.',
      },
      {
        q: 'Kann ich ein Thema vorschlagen?',
        a: 'Ja. Senden Sie eine Nachricht über das Kontaktformular, wenn Ihnen ein bestimmtes Thema fehlt. Ich prüfe, ob es zur Zielgruppe passt, und plane es ein, wo möglich.',
      },
      {
        q: 'Sind die Artikel auch auf Niederländisch und Englisch?',
        a: 'Der Blog ist auf Niederländisch, Deutsch und Englisch verfügbar. Jeder Artikel hat eine Übersetzung auf der entsprechenden Sprachversion der Website.',
      },
      {
        q: 'Darf ich die Artikel zitieren oder teilen?',
        a: 'Ja, mit Quellenangabe (ultimAItech und Link zum Artikel). Die Inhalte sollen Wissen mit Unternehmern in der Region teilen.',
      },
      {
        q: 'Wo finde ich Markdown-Versionen für KI-Systeme?',
        a: 'Veröffentlichte Artikel sind auch als Markdown unter /blog/md/ verfügbar — nützlich für KI-Crawler und Suchmaschinen, die strukturierte Inhalte bevorzugen.',
      },
    ],
  },

  readMore: 'Weiterlesen',
  noPosts: 'Noch keine Artikel verfügbar.',
};

const privacy = {
  title: 'Datenschutzerklärung',
  lastUpdated: 'Zuletzt aktualisiert: Mai 2026',
  intro: 'ultimAItech, ansässig in Wanneperveen (Overijssel), ist verantwortlich für die Verarbeitung personenbezogener Daten wie in dieser Datenschutzerklärung beschrieben. Wir respektieren Ihre Privatsphäre und verarbeiten personenbezogene Daten in Übereinstimmung mit der Datenschutz-Grundverordnung (DSGVO). Diese Erklärung beschreibt, welche Daten wir erheben, warum, wie lange wir sie aufbewahren und welche Rechte Sie haben.',
  sections: [
    {
      title: 'Welche Daten erheben wir?',
      text: 'Wenn Sie unser Kontaktformular ausfüllen, erheben wir Ihren Namen, Ihre E-Mail-Adresse, gegebenenfalls Ihren Firmennamen und den Inhalt Ihrer Nachricht. Wenn Sie eine Absicht auswählen (Website, Software, Chatbot), speichern wir diese Wahl. Diese Daten verwenden wir ausschließlich zur Beantwortung Ihrer Anfrage oder zur Erstellung eines Angebots. Wir erheben keine Daten über Marketing-Cookies oder Verhaltens-Tracking auf dieser Website.',
    },
    {
      title: 'Wie verwenden wir Ihre Daten?',
      text: 'Ihre Daten werden nur für den Zweck verwendet, für den Sie sie bereitgestellt haben: die Beantwortung Ihrer Anfrage, die Erstellung eines Angebots oder die Führung eines Gesprächs über ein mögliches Projekt. Wir nutzen Ihre Daten nicht für unaufgeforderte Werbung. Wir geben Ihre Daten nicht an Dritte weiter, außer wenn dies für die Dienstleistung erforderlich ist (z. B. Formularverarbeitung über FormSubmit) oder wenn das Gesetz es vorschreibt.',
    },
    {
      title: 'Rechtsgrundlage',
      text: 'Wir verarbeiten Ihre personenbezogenen Daten auf Grundlage Ihrer Einwilligung (wenn Sie das Kontaktformular ausfüllen) und auf Grundlage berechtigter Interessen (wenn wir Kontakt mit Ihnen über ein laufendes oder abgeschlossenes Projekt pflegen). Für Angebote und Verträge verarbeiten wir Daten zur Erfüllung oder Vorbereitung eines Vertrags.',
    },
    {
      title: 'Speicherdauer',
      text: 'Wir bewahren Ihre Daten nicht länger auf, als für den Zweck der Erhebung erforderlich. Kontaktformulardaten werden maximal zwei Jahre nach dem letzten Kontakt aufbewahrt, es sei denn, eine längere Aufbewahrung ist für ein laufendes oder abgeschlossenes Projekt erforderlich (z. B. Rechnungsstellung oder Garantie). Danach werden Daten gelöscht oder anonymisiert.',
    },
    {
      title: 'Ihre Rechte',
      text: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. Sie können auch eine Beschwerde bei der zuständigen Aufsichtsbehörde einreichen. Kontaktieren Sie uns zur Ausübung Ihrer Rechte unter info@ultimaitech.com. Wir antworten innerhalb eines Monats.',
    },
    {
      title: 'Cookies',
      text: 'Diese Website setzt keine Marketing- oder Verhaltens-Tracking-Cookies. Hosting und Formularversand (FormSubmit) können technische Protokolle verarbeiten, die zur Erbringung der Dienstleistung nötig sind, wie IP-Adresse und Zeitpunkt der Übermittlung. Bei später aktivierter optionaler Analytics wird diese Erklärung aktualisiert und Sie werden informiert.',
    },
    {
      title: 'Sicherheit',
      text: 'Wir treffen angemessene technische und organisatorische Maßnahmen, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen. Die Kommunikation über das Kontaktformular erfolgt über eine sichere Verbindung (HTTPS). Formulardaten werden von unserem Formularanbieter verarbeitet; wir haben keinen Einfluss auf deren Sicherheitsmaßnahmen, wählen aber vertrauenswürdige Anbieter.',
    },
    {
      title: 'Änderungen',
      text: 'Wir können diese Datenschutzerklärung anpassen, wenn sich unsere Dienste oder die Gesetzgebung ändern. Das Datum der letzten Änderung steht oben auf dieser Seite. Bei wesentlichen Änderungen informieren wir Sie, wo möglich, zum Beispiel über einen Hinweis auf der Website oder per E-Mail bei bestehendem Kontakt.',
    },
    {
      title: 'Kontakt',
      text: 'Haben Sie Fragen zu dieser Datenschutzerklärung oder zur Verarbeitung Ihrer personenbezogenen Daten? Kontaktieren Sie uns unter info@ultimaitech.com oder über das Kontaktformular auf dieser Website. Verantwortlicher: ultimAItech, Wanneperveen, Overijssel, KVK 98782800. Wir bemühen uns, innerhalb eines Monats auf Anfragen zu Ihren Datenschutzrechten zu antworten.',
    },
  ],
};

const terms = {
  title: 'Allgemeine Geschäftsbedingungen',
  lastUpdated: 'Zuletzt aktualisiert: Mai 2026',
  intro: 'Diese allgemeinen Geschäftsbedingungen gelten für alle Dienstleistungen von ultimAItech, ansässig in Wanneperveen, Overijssel (KVK 98782800). Durch Annahme eines Angebots oder Abschluss eines Vertrags stimmen Sie diesen Bedingungen zu. Abweichungen gelten nur, wenn sie schriftlich vereinbart wurden.',
  sections: [
    {
      title: 'Definitionen',
      text: 'In diesen Bedingungen bedeutet: Auftragnehmer: ultimAItech, der selbstständige Website- und Softwareentwickler. Auftraggeber: die natürliche oder juristische Person, die einen Vertrag mit ultimAItech eingeht. Werk: die von ultimAItech zu liefernden Websites, Software, Chatbots oder anderen Dienstleistungen wie im Angebot beschrieben.',
    },
    {
      title: 'Angebote und Verträge',
      text: 'Alle Angebote sind freibleibend und 30 Tage gültig, sofern nicht anders angegeben. Ein Vertrag kommt durch schriftliche Annahme des Angebots durch den Auftraggeber zustande (E-Mail genügt). Das Angebot und eventuelle Anlagen sind Teil des Vertrags. Änderungen in Umfang oder Planung werden schriftlich festgehalten und können Preis und Planung beeinflussen.',
    },
    {
      title: 'Ausführung',
      text: 'ultimAItech führt die Arbeiten nach bestem Wissen und Gewissen aus und wird dabei die gebotene Sorgfalt walten lassen. Die Lieferung erfolgt gemäß der im Angebot festgelegten Planung. Der Auftraggeber liefert rechtzeitig benötigte Informationen, Inhalte und Feedback. Verzögerungen durch verspätete Lieferung des Auftraggebers können die Planung verschieben.',
    },
    {
      title: 'Zahlung',
      text: 'Die Zahlung erfolgt gemäß der im Angebot genannten Zahlungsvereinbarung, sofern nicht schriftlich anders vereinbart. Die Standard-Zahlungsfrist beträgt 14 Tage nach Rechnungsdatum. Bei nicht fristgerechter Zahlung gerät der Auftraggeber automatisch in Verzug und schuldet gesetzliche Verzugszinsen. ultimAItech behält sich das Recht vor, Arbeiten bei Zahlungsverzug auszusetzen.',
    },
    {
      title: 'Geistiges Eigentum',
      text: 'Nach vollständiger Bezahlung geht das Eigentum an der gelieferten Arbeit (Code, Design, Inhaltsstruktur) auf den Auftraggeber über, sofern nicht anders vereinbart. Verwendete Open-Source-Komponenten bleiben unter ihren eigenen Lizenzen. ultimAItech behält das Recht, die Arbeit in Portfolio und Referenzen aufzunehmen, sofern der Auftraggeber dies nicht schriftlich ausschließt.',
    },
    {
      title: 'Garantie & Abnahme',
      text: 'ultimAItech liefert Arbeit, die den im Angebot beschriebenen Spezifikationen entspricht. Nach Lieferung hat der Auftraggeber 14 Tage, Mängel zu melden, die vom vereinbarten Umfang abweichen. Kleine Korrekturen innerhalb des Umfangs werden kostenlos durchgeführt. Garantie auf die Arbeit gilt für den in der Angebot genannten Zeitraum, in der Regel 30 Tage nach Lieferung für Bugfixes.',
    },
    {
      title: 'Haftung',
      text: 'Die Haftung von ultimAItech ist auf den Betrag beschränkt, der für den betreffenden Auftrag in Rechnung gestellt wurde, mit einem Maximum des Rechnungsbetrags des jeweiligen Auftrags. ultimAItech haftet nicht für indirekte Schäden, Folgeschäden, entgangenen Gewinn oder Datenverlust, außer bei Vorsatz oder grober Fahrlässigkeit.',
    },
    {
      title: 'Kündigung & Stornierung',
      text: 'Der Auftraggeber kann einen laufenden Auftrag schriftlich kündigen. Bereits gelieferte Arbeit und geleistete Stunden werden gemäß Angebot in Rechnung gestellt. Bei Stornierung durch den Auftraggeber vor Beginn kann eine Stornogebühr gemäß Angebot anfallen. ultimAItech kann den Vertrag bei Nichterfüllung durch den Auftraggeber nach schriftlicher Mahnung beenden.',
    },
    {
      title: 'Vertraulichkeit',
      text: 'Beide Parteien behandeln vertrauliche Informationen, die sie im Rahmen des Auftrags erhalten, als geheim. Diese Verpflichtung gilt auch nach Beendigung des Vertrags, soweit keine gesetzliche Aufbewahrungspflicht entgegensteht. ultimAItech verarbeitet personenbezogene Daten gemäß der Datenschutzerklärung und der DSGVO.',
    },
    {
      title: 'Anwendbares Recht',
      text: 'Auf alle Verträge ist niederländisches Recht anwendbar. Streitigkeiten werden dem zuständigen Gericht im Bezirk Overijssel vorgelegt. Die Parteien werden zunächst versuchen, einen Streit im gegenseitigen Einvernehmen zu lösen. Sollte eine Bestimmung unwirksam sein, bleiben die übrigen Bestimmungen gültig.',
    },
  ],
};

const dictionary = { locale, slugs, nav, closing, footer, home, services, websites, software, aiChatbots, projects, about, blog, contact, privacy, terms };

export default dictionary;
