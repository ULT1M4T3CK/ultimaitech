const locale = 'nl';

const slugs = {
  home: '/',
  services: '/diensten/',
  websites: '/diensten/websites/',
  software: '/diensten/software/',
  aiChatbots: '/diensten/ai-chatbots/',
  projects: '/projecten/',
  about: '/over/',
  blog: '/blog/',
  blogPost: '/blog/_post/',
  contact: '/contact/',
  privacy: '/privacy/',
  terms: '/voorwaarden/',
  offer: '/offer/',
};

const nav = [
  { name: 'Home', path: slugs.home },
  { name: 'Diensten', path: slugs.services },
  { name: 'Projecten', path: slugs.projects },
  { name: 'Over', path: slugs.about },
  { name: 'Blog', path: slugs.blog },
  { name: 'Contact', path: slugs.contact },
];

const footer = {
  tagline: 'Betrouwbare websites en software op maat uit Wanneperveen — voor ondernemers in Drenthe en Overijssel.',
  ctaBand: {
    headline: 'Een concreet plan voor uw site of software?',
    sub: 'Geen verkooppraatje — wel duidelijkheid over aanpak, scope en vervolgstappen. Reactie binnen één werkdag.',
    cta: 'Plan een gesprek',
  },
  copyright: `© ${new Date().getFullYear()} ultimAItech. Alle rechten voorbehouden.`,
  bottomLine: 'KVK-geregistreerd in Overijssel.',
  columns: {
    diensten: {
      title: 'Diensten',
      links: [
        ['Websites & webshops', slugs.websites],
        ['Software op maat', slugs.software],
        ['AI & chatbots', slugs.aiChatbots],
      ],
    },
    bedrijf: {
      title: 'Bedrijf',
      links: [
        ['Over', slugs.about],
        ['Projecten', slugs.projects],
        ['Blog', slugs.blog],
        ['Contact', slugs.contact],
      ],
    },
    vertrouwen: {
      title: 'Vertrouwen',
      links: [
        ['Privacy', slugs.privacy],
        ['Voorwaarden', slugs.terms],
      ],
    },
  },
};

const home = {
  hero: {
    headline: 'Betrouwbare websites en software op maat — uit Wanneperveen.',
    subtext:
      'Voor ondernemers in Drenthe en Overijssel die een website, webshop of maatwerktoepassing willen die werkt, snel laadt en jaren meegaat. Eén aanspreekpunt, vaste afspraken, voorspelbare oplevering.',
    cta1: 'Plan een vrijblijvend gesprek',
    cta2: 'Bekijk projecten',
    trustLine: 'Vaste prijsafspraken · directe lijn · oplevering met documentatie',
  },

  intro: {
    title: 'Wat is ultimAItech?',
    text: 'ultimAItech is een zelfstandig website- en softwareontwikkelaar uit Wanneperveen, Overijssel. Ik bouw professionele websites, webshops en maatwerksoftware voor ondernemers in Drenthe en Overijssel — van recreatiebedrijven en houthandels tot webshops en dienstverleners. Geen bureau met tussenlagen: u werkt rechtstreeks met mij, met vaste prijsafspraken, een helder proces en oplevering inclusief documentatie. AI-chatbots zijn een aanvullende dienst voor bedrijven die hun website of software willen versterken met slimme klantenservice.',
  },

  socialProof: {
    label: 'Waarom ondernemers voor ons kiezen',
    items: [
      { value: '1', label: 'aanspreekpunt van intake tot oplevering' },
      { value: 'AVG', label: 'bewuste omgang met persoonsgegevens' },
      { value: 'NL · DE · EN', label: 'inhoud en communicatie in uw taal' },
    ],
  },

  whoWeServe: {
    label: 'Voor wie',
    title: 'Ondernemers die resultaat willen, geen ruis',
    items: [
      { title: 'Recreatie & toerisme', text: 'Boekingsplatforms, bestemmingspagina\'s en blogs voor bedrijven in en rond Giethoorn, Weerribben-Wieden en de grensregio.' },
      { title: 'Handel & webshops', text: 'Maatwerk webshops en orderbeheer voor houthandel, beschoeiing en andere sectoren waar standaard templates tekortschieten.' },
      { title: 'MKB & dienstverlening', text: 'Professionele websites en webapplicaties voor bedrijven die beter vindbaar willen zijn en processen willen stroomlijnen.' },
      { title: 'Grensregio NL/DE', text: 'Websites en chatbots in Nederlands, Duits en Engels — ideaal voor ondernemers die ook Duitse klanten bedienen.' },
    ],
  },

  principles: [
    {
      icon: 'Shield',
      title: 'Professionaliteit',
      text: 'Gedegen vakmanschap, strakke oplevering en heldere communicatie bij elke stap. Geen loze beloftes, maar aantoonbaar resultaat dat u zelf kunt beoordelen — inclusief live projecten in het portfolio.',
    },
    {
      icon: 'CheckCircle2',
      title: 'Betrouwbaarheid',
      text: 'Afspraak is afspraak. Vaste prijzen, duidelijke planning en een direct aanspreekpunt van begin tot eind. U weet vooraf wat u krijgt, wanneer het klaar is en wat het kost.',
    },
    {
      icon: 'Heart',
      title: 'Vertrouwen',
      text: 'Transparante werkwijze, eerlijk advies en documentatie die u zelf kunt controleren. Uw project is in goede handen — ook na oplevering, met nazorg en bereikbaarheid voor vragen.',
    },
  ],

  services: [
    {
      icon: 'MonitorSmartphone',
      title: 'Websites & webshops',
      text: 'Professionele websites en webshops die snel laden, goed vindbaar zijn en bezoekers omzetten in klanten.',
      link: slugs.websites,
      cta: 'Meer over websites',
    },
    {
      icon: 'Blocks',
      title: 'Software op maat',
      text: 'Webapplicaties, koppelingen en automatiseringen die precies doen wat uw bedrijf nodig heeft.',
      link: slugs.software,
      cta: 'Meer over software',
    },
    {
      icon: 'BotMessageSquare',
      title: 'AI & chatbots',
      text: 'Een AI-chatbot op uw website die vragen beantwoordt op basis van uw eigen content — 24/7 bereikbaar, minder herhaalvragen.',
      link: slugs.aiChatbots,
      cta: 'Meer over AI',
    },
  ],

  region: {
    label: 'Regio',
    title: 'Actief in Drenthe en Overijssel',
    text: 'Gevestigd in Wanneperveen, werkzaam in heel Drenthe en Overijssel — van Meppel en Zwolle tot Assen en de kop van Overijssel. Persoonlijk contact, korte lijnen en kennis van de lokale markt maken het verschil: ik begrijp hoe ondernemers in de regio werken en wat hun klanten verwachten. Ook bereikbaar voor ondernemers net over de grens in Niedersachsen, met websites en chatbots in het Duits.',
    areas: ['Drenthe', 'Overijssel', 'Grensregio Niedersachsen'],
  },

  featuredProject: {
    label: 'Uitgelicht project',
    title: 'Nijenhuis Botenverhuur',
    description:
      'Complete vernieuwing: van een verouderde site met gebroken links naar een boekingsgerichte website en blog voor bootverhuur bij Giethoorn en Weerribben-Wieden.',
    highlights: [
      'Directe boekingsflow met datumkeuze en boottype',
      'Bestemmingspagina\'s voor Giethoorn, Belt-Schutsloot en Wanneperveen',
      'Blog met regionale content voor vindbaarheid en vertrouwen',
      'Cross-sell voor vakantiehuis, camping en jachthaven',
    ],
    cta: 'Bekijk de projecten',
    ctaExternal: 'Bezoek de website',
    externalUrl: 'https://nijenhuis-botenverhuur.com',
  },

  howWeWork: {
    label: 'Werkwijze',
    title: 'Van eerste gesprek tot oplevering',
    subtitle: 'Een helder proces zonder verrassingen — zodat u precies weet waar u aan toe bent.',
    steps: [
      {
        step: '01',
        title: 'Kennismaking',
        text: 'Vrijblijvend gesprek over uw wensen, doelen en budget. Geen verplichtingen, wel direct duidelijkheid over wat haalbaar is en welke aanpak het beste past.',
      },
      {
        step: '02',
        title: 'Voorstel & planning',
        text: 'Een helder voorstel met vaste prijs, concrete mijlpalen en een realistische planning. U weet precies wat er gebouwd wordt, wanneer en tegen welke kosten.',
      },
      {
        step: '03',
        title: 'Bouw & tussentijdse feedback',
        text: 'U ziet de voortgang bij elke mijlpaal en geeft feedback voordat we verder gaan. Geen verrassingen aan het eind — u bent betrokken bij elke belangrijke beslissing.',
      },
      {
        step: '04',
        title: 'Oplevering & nazorg',
        text: 'Oplevering met documentatie, instructie en een vaste periode nazorg. U kunt er direct mee aan de slag en bent niet afhankelijk van mij voor dagelijkse aanpassingen.',
      },
    ],
  },

  cta: {
    headline: 'Klaar om uw project te bespreken?',
    subtext:
      'Plan een vrijblijvend kennismakingsgesprek. Samen kijken we wat de beste aanpak is voor uw website, webshop of softwareproject.',
    button: 'Plan een gesprek',
    secondary: 'Bekijk diensten',
  },
};

const services = {
  hero: {
    label: 'Diensten',
    title: 'Wat ik voor u kan betekenen',
    description:
      'Van een professionele website tot software op maat en slimme AI-toepassingen. Altijd met persoonlijke aandacht, vaste afspraken en een helder resultaat — voor ondernemers in Drenthe, Overijssel en de grensregio.',
  },

  intro: {
    title: 'Drie pijlers, één aanspreekpunt',
    text: 'ultimAItech biedt drie kernservices: websites en webshops, software op maat en AI-chatbots. De meeste klanten starten met een website of webshop; wanneer processen complexer worden, bouw ik maatwerksoftware of koppelingen. AI-chatbots zijn een aanvulling — handig wanneer uw site veel bezoekersvragen krijgt of wanneer u Duitse en Nederlandse klanten bedient. Alles onder één dak, met één ontwikkelaar die uw project van begin tot eind begeleidt. Bekijk de projecten om te zien wat concreet mogelijk is, of plan een gesprek om uw situatie te bespreken.',
  },

  pillars: [
    {
      icon: 'MonitorSmartphone',
      title: 'Websites & webshops',
      text: 'Professionele websites en webshops die snel laden, goed scoren in Google en bezoekers omzetten in klanten. Geschikt voor brochuresites, webshops, landingspagina\'s en bestemmingspagina\'s. Maatwerk in plaats van WordPress-templates — sneller, veiliger en volledig afgestemd op uw merk.',
      link: slugs.websites,
      cta: 'Meer over websites',
      fit: ['Ondernemers die een nieuwe of vernieuwde website nodig hebben', 'Bedrijven die beter vindbaar willen zijn', 'Webshops die meer willen verkopen'],
    },
    {
      icon: 'Blocks',
      title: 'Software op maat',
      text: 'Webapplicaties, koppelingen met bestaande systemen en automatiseringen die tijd en fouten besparen. Gebouwd op moderne technologie, afgestemd op uw processen — van orderbeheer en reserveringssystemen tot interne dashboards en API-koppelingen.',
      link: slugs.software,
      cta: 'Meer over software',
      fit: ['Bedrijven met processen die beter geautomatiseerd kunnen', 'Teams die koppelingen nodig hebben tussen systemen', 'Organisaties die een unieke applicatie willen laten bouwen'],
    },
    {
      icon: 'BotMessageSquare',
      title: 'AI & chatbots',
      text: 'Een AI-chatbot op uw website die vragen beantwoordt op basis van uw eigen content. Slimme klantenservice die altijd bereikbaar is — in Nederlands, Duits en Engels. Ideaal als aanvulling op een bestaande website of als onderdeel van een nieuw traject.',
      link: slugs.aiChatbots,
      cta: 'Meer over AI',
      fit: ['Websites met veel bezoekersvragen', 'Bedrijven die klantenservice willen ondersteunen', 'Teams die interne kennis sneller toegankelijk willen maken'],
    },
  ],

  approach: {
    label: 'Aanpak',
    title: 'Hoe ik werk',
    points: [
      'Persoonlijk contact — u spreekt altijd met dezelfde persoon, van intake tot nazorg',
      'Vaste prijsafspraken — geen verrassingen achteraf; scope en kosten staan vooraf vast',
      'Transparante planning — u weet precies wanneer wat klaar is, met tussentijdse demo\'s',
      'Documentatie en overdracht — u bent nooit afhankelijk van mij alleen; alles is overdraagbaar',
      'Regionale focus — kennis van Drenthe, Overijssel en de grensregio; ook Duitstalige projecten',
    ],
  },

  region: {
    label: 'Regio',
    title: 'Diensten in Drenthe, Overijssel en grensregio',
    text: 'ultimAItech is gevestigd in Wanneperveen en werkt voor ondernemers in heel Drenthe en Overijssel. Of u nu in Meppel, Zwolle, Assen of de kop van Overijssel zit: persoonlijk contact en korte lijnen zijn standaard. Ook voor bedrijven in Niedersachsen bouw ik websites en chatbots in het Duits.',
    areas: ['Drenthe', 'Overijssel', 'Grensregio Niedersachsen'],
  },

  whenToStart: {
    label: 'Wanneer starten',
    title: 'Herkenbare situaties',
    items: [
      { title: 'Uw website is verouderd', text: 'Trage laadtijden, gebroken links of een ontwerp dat geen vertrouwen wekt. Tijd voor een nieuwe site die bezoekers omzet in klanten.' },
      { title: 'WordPress of Shopify schiet tekort', text: 'Templates en plug-ins beperken wat u kunt. Maatwerk geeft volledige controle over ontwerp, snelheid en functionaliteit.' },
      { title: 'Processen lopen handmatig', text: 'Orders, reserveringen of offertes via mail en Excel. Software op maat automatiseert en geeft overzicht.' },
      { title: 'Veel herhaalvragen van bezoekers', text: 'Openingstijden, prijzen, beschikbaarheid — een AI-chatbot beantwoordt ze 24/7 op basis van uw eigen content.' },
    ],
  },

  faq: {
    title: 'Veelgestelde vragen over diensten',
    items: [
      {
        q: 'Wat kost een website of webshop?',
        a: 'Dat hangt af van scope: een brochuresite begint vanaf circa €2.500, een webshop met orderbeheer vanaf circa €5.000. Na een kennismakingsgesprek ontvangt u een voorstel met vaste prijs — geen verrassingen achteraf.',
      },
      {
        q: 'Hoe lang duurt een traject?',
        a: 'Een brochuresite: 4–8 weken. Een webshop of maatwerksoftware: 8–16 weken, afhankelijk van complexiteit. U krijgt een realistische planning met mijlpalen voordat we starten.',
      },
      {
        q: 'Biedt u ook onderhoud aan?',
        a: 'Ja. Na oplevering kunt u een onderhoudsabonnement afsluiten voor updates, beveiliging en kleine aanpassingen. U bent nooit verplicht — maar veel klanten kiezen ervoor voor gemoedsrust.',
      },
      {
        q: 'WordPress of maatwerk — wat is beter?',
        a: 'Voor de meeste MKB-ondernemers in de regio levert maatwerk betere snelheid, veiligheid en flexibiliteit. WordPress kan werken voor eenvoudige blogs; voor webshops, boekingen en koppelingen is maatwerk vaak de betere keuze.',
      },
      {
        q: 'Kan ik een AI-chatbot toevoegen aan een bestaande site?',
        a: 'Ja. Een chatbot kan als widget op elke website worden geplaatst. Ideaal als aanvulling wanneer u al een site heeft maar veel bezoekersvragen wilt automatiseren.',
      },
    ],
  },
};

const websites = {
  hero: {
    label: 'Websites & Webshops',
    title: 'Website laten maken — maatwerk voor ondernemers in Drenthe en Overijssel',
    description:
      'U wilt een website die klanten oplevert, niet alleen mooi oogt. ultimAItech bouwt professionele websites en webshops op maat. Gevestigd in Wanneperveen — één aanspreekpunt, vaste prijsafspraken en oplevering inclusief documentatie.',
  },

  whyCustom: {
    title: 'Waarom een maatwerk website?',
    text: 'De meeste websites in de regio draaien op WordPress met een standaard thema. Dat werkt — tot het niet meer werkt. Trage laadtijden, beveiligingslekken, plug-in-conflicten en beperkte aanpasbaarheid zijn veelvoorkomende problemen.',
    benefits: [
      'Laadtijd onder 2 seconden — uw bezoekers hoeven niet te wachten, Google beloont snelheid',
      'Geen plug-in-afhankelijkheid — minder onderhoud, minder beveiligingsrisico\'s',
      'Volledige controle over ontwerp en functionaliteit — uw site doet precies wat uw bedrijf nodig heeft',
      'Toekomstbestendig — schaalbaar zonder dat u opnieuw hoeft te beginnen',
    ],
    comparison: {
      customLabel: 'Maatwerk (ultimAItech)',
      otherLabel: 'WordPress (standaard)',
      rows: [
        { label: 'Laadtijd', custom: '< 2 seconden', other: '3–6 seconden' },
        { label: 'Beveiliging', custom: '7/7 security headers', other: 'Afhankelijk van plug-ins' },
        { label: 'Onderhoud', custom: 'Minimaal', other: 'Wekelijkse updates nodig' },
        { label: 'Uniekheid', custom: '100% op maat', other: 'Herkenbaar sjabloon' },
        { label: 'SEO-basis', custom: 'Ingebouwd', other: 'Extra plug-ins vereist' },
      ],
    },
  },

  capabilities: [
    {
      icon: 'LayoutTemplate',
      title: 'Professionele website op maat',
      text: 'Een volledig responsive website die er op elk apparaat goed uitziet — van smartphone tot desktop. Gebouwd met schone code, geoptimaliseerde afbeeldingen en een structuur die Google begrijpt.',
      features: [
        'Responsive ontwerp (mobiel-eerst)',
        'SEO-geoptimaliseerde paginastructuur en metadata',
        'Snelle hosting met CDN (Cloudflare)',
        'SSL-certificaat en beveiligingsheaders',
        'Gestructureerde data (Schema.org) voor rijke zoekresultaten',
        'Toegankelijk volgens WCAG-richtlijnen',
        'CMS-integratie zodat u zelf content kunt beheren',
      ],
    },
    {
      icon: 'Store',
      title: 'Webshop laten maken',
      text: 'Een webshop die niet alleen producten toont, maar ook verkoopt. Veilig afrekenen, overzichtelijk voorraadbeheer en koppelingen met uw boekhouding.',
      features: [
        'Veilig betalen met iDEAL, creditcard en andere methoden',
        'Product- en voorraadbeheer',
        'Klantaccounts en bestelgeschiedenis',
        'Koppeling met boekhoudpakketten (Moneybird, e-Boekhouden, Exact)',
        'Automatische verzendlabels en track & trace',
      ],
    },
    {
      icon: 'ScanSearch',
      title: 'SEO en vindbaarheid',
      text: 'Elke website wordt opgeleverd met een solide SEO-basis. Geen loze belofte, maar meetbaar resultaat in Google Search Console.',
      features: [
        'Zoekwoordenonderzoek voor uw branche en regio',
        'Geoptimaliseerde paginatitels, meta-beschrijvingen en headings',
        'Technische SEO: sitemap, robots.txt, canonical URLs, hreflang',
        'Lokale SEO: Google Bedrijfsprofiel optimalisatie, regionale zoekwoorden',
        'Core Web Vitals optimalisatie (LCP, FID, CLS)',
      ],
    },
  ],

  audience: {
    title: 'Voor wie?',
    items: [
      'Ondernemers die een nieuwe website nodig hebben — u begint met ondernemen of uw huidige site is verouderd',
      'Bedrijven die beter vindbaar willen zijn — u heeft een website maar klanten vinden u niet via Google',
      'Webshops die meer willen verkopen — uw huidige webshop converteert niet of is te traag',
      'Bedrijven die onafhankelijk willen zijn van WordPress — u wilt een site die u niet elke week hoeft te updaten',
    ],
  },

  process: {
    label: 'Werkwijze',
    title: 'Van kennismaking tot oplevering',
    steps: [
      { icon: 'MessageCircle', title: 'Kennismaking', text: 'Vrijblijvend gesprek over uw wensen, doelgroep en budget.' },
      { icon: 'FileText', title: 'Voorstel met vaste prijs', text: 'Geen uurtje-factuurtje, maar een helder voorstel met mijlpalen.' },
      { icon: 'Palette', title: 'Ontwerp', text: 'Wireframes en visueel ontwerp, u geeft feedback vóórdat er code geschreven wordt.' },
      { icon: 'Code2', title: 'Bouw', text: 'Schone, geteste code met moderne technieken.' },
      { icon: 'Rocket', title: 'Oplevering', text: 'Live zetten met documentatie, instructie en een vaste periode nazorg.' },
    ],
  },

  faq: {
    title: 'Veelgestelde vragen',
    items: [
      {
        q: 'Wat kost een website laten maken?',
        a: 'Een professionele website op maat begint vanaf €1.500 voor een compacte bedrijfssite (5–7 pagina\'s). Een webshop of uitgebreidere site met koppelingen start vanaf €3.000. U ontvangt altijd een vaste prijs vooraf — geen verborgen kosten.',
      },
      {
        q: 'Hoe lang duurt het om een website te laten maken?',
        a: 'Een standaard bedrijfswebsite is binnen 3–4 weken klaar. Complexere projecten met webshop of koppelingen nemen 6–8 weken in beslag. U krijgt een concrete planning bij het voorstel.',
      },
      {
        q: 'Kan ik mijn website zelf beheren?',
        a: 'Ja. Elke website wordt opgeleverd met een gebruiksvriendelijk CMS waarmee u zelf teksten, afbeeldingen en pagina\'s kunt aanpassen. U krijgt een instructie erbij.',
      },
      {
        q: 'Waarom geen WordPress?',
        a: 'WordPress is prima voor eenvoudige blogs, maar voor zakelijke websites zijn er betere opties. Een maatwerk site laadt sneller, is veiliger, heeft geen plug-in-updates nodig en geeft u volledige controle.',
        link: { slug: 'maatwerk-website-vs-wordpress', label: 'Maatwerk website of WordPress — wat past bij jouw bedrijf?' },
      },
      {
        q: 'Bouw je ook voor bedrijven buiten Drenthe en Overijssel?',
        a: 'Mijn focus ligt op ondernemers in Drenthe en Overijssel, maar ik werk ook met bedrijven in de rest van Nederland en net over de grens in Duitsland (Niedersachsen). Contact verloopt dan via videobellen.',
      },
      {
        q: 'Wat gebeurt er na oplevering?',
        a: 'Na oplevering krijgt u een vaste periode nazorg (meestal 30 dagen). Daarna kunt u kiezen voor een onderhoudscontract voor updates, monitoring en technische ondersteuning.',
      },
    ],
  },

  cta: {
    headline: 'Klaar om uw website te laten maken?',
    text: 'Plan een vrijblijvend kennismakingsgesprek. Geen verkooppraatje — wel duidelijkheid over aanpak, kosten en planning.',
    button: 'Plan een gesprek',
    secondary: 'Bekijk alle diensten',
  },
};

const software = {
  hero: {
    label: 'Software op maat',
    title: 'Software op maat — gebouwd voor uw bedrijfsprocessen',
    description:
      'Standaard software past nooit helemaal. ultimAItech bouwt webapplicaties, koppelingen en automatiseringen op maat voor MKB-bedrijven in Drenthe en Overijssel. Geen overbodig pakket — wél software die precies doet wat uw bedrijf vraagt.',
  },

  whenCustom: {
    title: 'Wanneer maatwerk software?',
    text: 'Niet elk bedrijf heeft maatwerk nodig. Standaardpakketten zoals Exact, Moneybird of Shopify zijn uitstekend als ze bij uw werkwijze passen. Maar als u zich herkent in een van deze situaties, is maatwerk de betere keuze:',
    items: [
      'U kopieert handmatig gegevens tussen twee of meer systemen',
      'Uw workflow past niet in de standaard software die u nu gebruikt',
      'U heeft een uniek proces dat geen enkele bestaande tool afdekt',
      'U betaalt voor 10 modules maar gebruikt er 2',
      'U wilt systemen koppelen die niet standaard met elkaar praten',
      'Uw groeiende team loopt vast op Excel-bestanden en gedeelde mappen',
    ],
  },

  capabilities: [
    {
      icon: 'AppWindow',
      title: 'Webapplicaties',
      text: 'Complete webapplicaties die werken op elk apparaat — van voorraadsystemen en klantportalen tot planningstools en dashboards.',
      example: 'Een houthandel in Meppel die orders, voorraad en klantgegevens bijhield in drie losse systemen. Nu draait alles in één webapplicatie met automatische synchronisatie.',
      features: [
        'Moderne, snelle interface (React)',
        'Gebruikersbeheer met rollen en rechten',
        'Realtime data en rapportages',
        'Responsiefontwerp: werkt op desktop, tablet en telefoon',
        'Schaalbaar: groeit mee met uw bedrijf',
      ],
    },
    {
      icon: 'Cable',
      title: 'Koppelingen & integraties',
      text: 'Uw bestaande systemen met elkaar laten praten, zodat gegevens automatisch op de juiste plek terechtkomen.',
      example: 'Een webshop die bestellingen automatisch doorstuurt naar de boekhouding en verzendpartij — zonder handmatig overtypen.',
      features: [
        'Koppeling met boekhoudpakketten (Exact, Moneybird, e-Boekhouden)',
        'Voorraad- en ordersynchronisatie',
        'API-ontwikkeling en webhooks',
        'Eenmalige datamigratie of continue synchronisatie',
        'Koppeling met externe platforms (Bol.com, Amazon, Lightspeed)',
      ],
    },
    {
      icon: 'Workflow',
      title: 'Automatisering',
      text: 'Terugkerende taken automatiseren zodat u en uw team zich richten op werk dat er toe doet.',
      example: 'Een verhuurbedrijf dat automatisch beschikbaarheid bijwerkt, bevestigingsmails stuurt en een dagelijks overzicht genereert voor de planning.',
      features: [
        'Geautomatiseerde workflows (bestelverwerking, opvolging, notificaties)',
        'Geplande taken en rapportages',
        'Foutdetectie en automatische meldingen',
        'Documentgeneratie: facturen, offertes, rapporten',
        'E-mail- en notificatieflows',
      ],
    },
  ],

  tech: {
    label: 'Technologie',
    title: 'Gebouwd met moderne, bewezen technologie',
    text: 'Geen exotische frameworks die over twee jaar niet meer onderhouden worden. Solide keuzes die elke ontwikkelaar kan oppakken.',
    stack: [
      { name: 'React, Next.js, Tailwind CSS', category: 'Frontend' },
      { name: 'Node.js, Python', category: 'Backend' },
      { name: 'PostgreSQL, SQLite', category: 'Database' },
      { name: 'TypeScript', category: 'Taal' },
      { name: 'Docker, Linux, AWS', category: 'Infrastructuur' },
      { name: 'REST, GraphQL, webhooks', category: 'API\'s' },
    ],
  },

  process: {
    label: 'Werkwijze',
    title: 'Van inventarisatie tot oplevering',
    steps: [
      { icon: 'ClipboardList', title: 'Inventarisatie', text: 'Uw processen, knelpunten en wensen in kaart brengen. Welke taken kosten nu te veel tijd? Waar gaat het mis?' },
      { icon: 'FileText', title: 'Functioneel ontwerp', text: 'Wat moet de software doen? Schermen, workflows en koppelingen uitwerken vóórdat er code geschreven wordt.' },
      { icon: 'BadgeEuro', title: 'Vaste prijs', text: 'Een helder voorstel met scope, planning en een vaste prijs. Geen uurtje-factuurtje.' },
      { icon: 'Code2', title: 'Bouw in sprints', text: 'U ziet tussentijds de voortgang en geeft feedback bij elke mijlpaal.' },
      { icon: 'Rocket', title: 'Oplevering', text: 'Live zetten met documentatie, gebruikersinstructie en een vaste periode nazorg.' },
    ],
  },

  faq: {
    title: 'Veelgestelde vragen',
    items: [
      {
        q: 'Wat kost software op maat?',
        a: 'Dat hangt af van de complexiteit. Een eenvoudige koppeling of automatisering begint vanaf €2.000. Een complete webapplicatie met gebruikersbeheer en koppelingen start vanaf €5.000. U ontvangt altijd een vaste prijs vooraf met een duidelijke scopebeschrijving.',
      },
      {
        q: 'Hoe lang duurt het?',
        a: 'Een systeemkoppeling of automatisering is vaak binnen 2–4 weken gereed. Een webapplicatie neemt 6–12 weken in beslag, afhankelijk van de omvang. U krijgt een concrete planning bij het voorstel.',
      },
      {
        q: 'Kan ik mijn huidige software blijven gebruiken?',
        a: 'Meestal wel. Maatwerk software hoeft uw bestaande tools niet te vervangen — het kan juist de brug zijn tussen systemen die u al gebruikt. De meeste projecten zijn koppelingen of aanvullingen op wat er al draait.',
      },
      {
        q: 'Wie onderhoudt de software na oplevering?',
        a: 'Na oplevering krijgt u een vaste periode nazorg. Daarna kunt u kiezen voor een onderhoudscontract voor updates, bugfixes en technische ondersteuning. De code is altijd van u — u zit nergens aan vast.',
      },
      {
        q: 'Ik weet niet precies wat ik nodig heb. Kan ik toch contact opnemen?',
        a: 'Absoluut. De meeste ondernemers weten wat hun probleem is, maar niet welke technische oplossing het beste past. Dat is precies waar het kennismakingsgesprek voor is — samen bepalen we of maatwerk de juiste aanpak is.',
      },
      {
        q: 'Werk je ook met bedrijven buiten de regio?',
        a: 'Mijn focus ligt op Drenthe en Overijssel, maar softwareprojecten verlopen vaak grotendeels digitaal. Voor bedrijven in de rest van Nederland of over de grens in Duitsland werk ik via videobellen.',
      },
    ],
  },

  cta: {
    headline: 'Loopt u vast op uw huidige werkwijze?',
    text: 'Plan een vrijblijvend gesprek. Geen verkooppraatje — wel duidelijkheid over of maatwerk de juiste oplossing is en wat het gaat kosten.',
    button: 'Plan een gesprek',
    secondary: 'Bekijk alle diensten',
  },
};

const aiChatbots = {
  hero: {
    label: 'AI & Chatbots',
    title: 'AI-chatbot voor uw website — slimme klantenservice die altijd bereikbaar is',
    description:
      'Uw klanten hebben vragen. Een AI-chatbot beantwoordt de meest gestelde vragen direct, 24/7, op basis van uw eigen content. Gebouwd door ultimAItech, voor MKB-bedrijven in Drenthe en Overijssel.',
  },

  whatIs: {
    title: 'Wat is een AI-chatbot?',
    text: 'Een AI-chatbot is een gesprekspartner op uw website die vragen van bezoekers begrijpt en beantwoordt op basis van uw eigen informatie. Geen vaste beslisboom met vooraf ingetypte antwoorden, maar een slim systeem dat:',
    bullets: [
      'Natuurlijke taal begrijpt — bezoekers stellen hun vraag in hun eigen woorden',
      'Antwoordt op basis van uw content — de chatbot kent uw website, producten, diensten en FAQ',
      'Doorverwijst wanneer nodig — als de chatbot het antwoord niet weet, stuurt hij de bezoeker naar het juiste contactformulier of telefoonnummer',
      'Leert van uw feedback — antwoorden worden beter naarmate u aangeeft wat goed en fout is',
    ],
  },

  benefits: {
    title: 'Wat levert het op?',
    items: [
      {
        title: 'Minder herhaalvragen',
        text: 'De gemiddelde MKB-website ontvangt 60–80% van dezelfde vragen. Openingstijden, prijzen, levertijden, retouren. Een chatbot vangt deze op zodat u zich richt op vragen die persoonlijke aandacht vragen.',
      },
      {
        title: '24/7 bereikbaarheid',
        text: 'Uw chatbot slaapt niet. Bezoekers die \'s avonds of in het weekend uw site bezoeken, krijgen direct antwoord. Dat is het moment waarop ze beslissen — niet de volgende werkdag.',
      },
      {
        title: 'Hogere conversie',
        text: 'Een bezoeker die direct antwoord krijgt, haakt minder snel af. Onderzoek toont dat websites met een chatbot 20–30% meer leads genereren dan sites zonder.',
      },
      {
        title: 'Inzicht in klantvragen',
        text: 'Elke vraag die de chatbot ontvangt, wordt gelogd. Na een maand weet u precies welke vragen uw bezoekers stellen — en kunt u uw website, FAQ of aanbod daarop aanpassen.',
      },
    ],
  },

  examples: {
    title: 'Voorbeelden uit de praktijk',
    items: [
      {
        title: 'Botenverhuur',
        text: 'Een verhuurbedrijf bij Giethoorn krijgt dagelijks dezelfde vragen: "Heb ik een vaarbewijs nodig?", "Wat kost een fluisterboot per uur?", "Zijn er nog boten beschikbaar op zaterdag?" De chatbot beantwoordt dit direct met actuele informatie uit het reserveringssysteem.',
      },
      {
        title: 'Houthandel',
        text: 'Een houthandel in Meppel krijgt vragen over houtsoorten, afmetingen, levertijden en openingstijden. De chatbot kent de productcatalogus en kan specifieke vragen beantwoorden: "Hebben jullie eiken planken van 3 meter?" → antwoord met prijs en voorraadstatus.',
      },
      {
        title: 'Webdesign bureau',
        text: 'Een webdesigner krijgt vragen over kosten, doorlooptijd en wat er bij een website komt kijken. De chatbot beantwoordt oriënterende vragen en plant een kennismakingsgesprek in wanneer de bezoeker verder wil.',
      },
    ],
  },

  flow: {
    label: 'Hoe het werkt',
    title: 'Van content tot live chatbot',
    steps: [
      { icon: 'ScanSearch', title: 'Content verzamelen', text: 'Ik analyseer uw website, FAQ, prijslijsten en overige documentatie. Dit wordt de kennisbasis van uw chatbot.' },
      { icon: 'Bot', title: 'Chatbot bouwen en trainen', text: 'De chatbot wordt geconfigureerd met uw content, huisstijl en tone of voice. U bepaalt hoe de bot zich gedraagt: formeel of informeel, uitgebreid of beknopt.' },
      { icon: 'ListChecks', title: 'Testen en bijsturen', text: 'Voordat de chatbot live gaat, testen we samen met realistische vragen. Antwoorden die niet kloppen worden bijgestuurd.' },
      { icon: 'LayoutDashboard', title: 'Live en monitoren', text: 'De chatbot gaat live op uw website. U krijgt toegang tot een dashboard met alle gesprekken, zodat u kunt zien welke vragen gesteld worden en hoe de bot presteert.' },
    ],
  },

  tech: {
    title: 'Technische details',
    rows: [
      { aspect: 'AI-model', spec: 'GPT-4 of vergelijkbaar (state-of-the-art)' },
      { aspect: 'Kennisbasis', spec: 'Uw website, documenten, FAQ, productdata' },
      { aspect: 'Talen', spec: 'Nederlands, Duits, Engels' },
      { aspect: 'Integratie', spec: 'Widget op uw website, optioneel WhatsApp/e-mail' },
      { aspect: 'Privacy', spec: 'Data wordt niet gebruikt voor AI-training. AVG-compliant' },
      { aspect: 'Hosting', spec: 'EU-servers, geen data buiten Europa' },
    ],
  },

  faq: {
    title: 'Veelgestelde vragen',
    items: [
      {
        q: 'Wat kost een AI-chatbot?',
        a: 'Een basischatbot op basis van uw websitecontent begint vanaf €750 eenmalig + €50/maand voor hosting en AI-kosten. Uitgebreidere chatbots met koppelingen aan reserveringssystemen, productcatalogi of CRM beginnen vanaf €2.000.',
      },
      {
        q: 'Kan de chatbot foute antwoorden geven?',
        a: 'De chatbot antwoordt uitsluitend op basis van uw eigen content. Als de informatie niet beschikbaar is, zegt de bot eerlijk dat hij het antwoord niet weet en verwijst door naar persoonlijk contact. Hallucinaties worden geminimaliseerd door de kennisbasis af te bakenen.',
      },
      {
        q: 'Moet ik technische kennis hebben?',
        a: 'Nee. Ik bouw, configureer en onderhoud de chatbot voor u. Als uw content wijzigt (nieuwe producten, aangepaste prijzen), update ik de kennisbasis.',
      },
      {
        q: 'In welke talen werkt de chatbot?',
        a: 'De chatbot beheerst Nederlands, Duits en Engels. Ideaal voor bedrijven in de grensregio die ook Duitse klanten bedienen.',
      },
      {
        q: 'Vervangt een chatbot mijn klantenservice?',
        a: 'Nee, een chatbot is een aanvulling. Hij vangt de veelgestelde vragen op zodat u en uw team zich richten op complexe vragen en persoonlijk contact. De chatbot verwijst door wanneer menselijke aandacht nodig is.',
      },
      {
        q: 'Hoe zit het met privacy (AVG)?',
        a: 'Gesprekken worden verwerkt op EU-servers. Persoonsgegevens worden niet opgeslagen tenzij de bezoeker daar toestemming voor geeft (bijv. bij het achterlaten van een e-mailadres). De chatbot voldoet aan de AVG.',
      },
    ],
  },

  cta: {
    headline: 'Wilt u weten wat een chatbot voor uw bedrijf kan betekenen?',
    text: 'Plan een vrijblijvend gesprek. Ik laat u zien hoe een chatbot er op uw website uit zou zien en welke vragen hij kan beantwoorden.',
    button: 'Plan een gesprek',
    secondary: 'Terug naar diensten',
  },
};

const projects = {
  hero: {
    label: 'Projecten',
    title: 'Werk dat u zelf kunt beoordelen',
    description:
      'Echte projecten, openbaar te bekijken. Geen anonieme testimonials of vage claims, maar concreet werk dat u zelf kunt inspecteren — inclusief de uitdagende trajecten waarin een oude site of template wordt vervangen door maatwerk.',
  },

  intro: {
    title: 'Open portfolio, geen loze beloftes',
    text: 'Elke case op deze pagina is live te bekijken — van bootverhuur met boekingsflow tot houthandel met maatwerk webshop en beschoeiing na een Shopify-template. U ziet niet alleen het eindresultaat, maar ook de uitdaging (verouderde site, WordPress-builder, template-beperkingen) en de aanpak. Dat is bewust: ondernemers in Drenthe en Overijssel verdienen inzicht in wat een traject werkelijk inhoudt voordat ze een beslissing nemen. Klik op een project voor de volledige case study, of plan een gesprek als u vergelijkbaar werk voor uw bedrijf wilt bespreken.',
  },

  caseStudyUi: {
    challengeTitle: 'De uitdaging',
    solutionTitle: 'De oplossing',
    deliverablesTitle: 'Belangrijkste deliverables',
    ctaLive: 'Bekijk live site',
    ctaFullCase: 'Bekijk volledige use case',
    backToProjects: 'Terug naar projecten',
  },

  cases: [
    {
      label: 'Recreatie & boekingen',
      title: 'Nijenhuis Botenverhuur',
      subtitle: 'Van verouderde site naar een duidelijke boekingservaring — mét blog voor content en vindbaarheid.',
      description:
        'De oude website had een verouderde uitstraling, gebroken links en geen heldere navigatie. Dat is vervangen door een moderne, boekingsgerichte site voor een familiebedrijf in Wanneperveen: bootverhuur bij Giethoorn en Nationaal Park Weerribben-Wieden, met duidelijke routes naar vakantiehuis, camping en jachthaven. Daarnaast is een blog toegevoegd: actuele artikelen over het vaargebied, seizoen en tips — zodat de site ook inhoudelijk kan groeien en beter vindbaar blijft in de regio.',
      situation: '',
      slug: 'nijenhuis-botenverhuur',
      seoTitle: 'Case: Nijenhuis Botenverhuur — ultimAItech',
      seoDescription:
        'Van verouderde site naar boekingsgerichte website en blog voor bootverhuur bij Giethoorn en Weerribben-Wieden. Lees uitdaging, oplossing en deliverables.',
      image: '/assets/images/usecases/nijenhuis-usecase.jpeg',
      imageAlt: 'Screenshot van de website nijenhuis-botenverhuur.com',
      highlights: [
        'Homepage met boekingswidget en duidelijke Customer journey',
        'Bootcategorieën met prijzen, beschikbaarheid en motoropties',
        'Bestemmingspagina\'s voor Giethoorn, Belt-Schutsloot en Wanneperveen',
        'Blog voor regionale content, seizoenstips en SEO',
        'Cross-sell naar vakantiehuis, camping en jachthaven',
      ],
      challenge: {
        intro:
          'De bestaande site voldeed niet meer: bezoekers vonden moeilijk wat ze zochten en de uitstraling wekte geen vertrouwen voor een vakantie-ervaring op het water.',
        points: [
          'Verouderde, niet-responsieve uitstraling en inconsistente huisstijl.',
          'Gebroken links en onduidelijke navigatie naar boottypen en boeken.',
          'Geen heldere boekingsflow: veel handmatige vragen en telefoonverkeer.',
          'Weinig ruimte voor regionale content en vindbaarheid in het seizoen.',
        ],
      },
      solution: {
        intro:
          'Een nieuwe, snelle site met een duidelijke customer journey: van oriëntatie naar bootkeuze, datum en afrekenen — aangevuld met een blog voor Giethoorn en omgeving.',
        points: [
          'Homepage met boekingswidget en duidelijke stappen voor de gast.',
          'Bootcategorieën met prijzen, beschikbaarheid en motoropties.',
          'Bestemmingspagina\'s voor Giethoorn, Belt-Schutsloot en Wanneperveen.',
          'Blog voor seizoen, tips en SEO; cross-sell naar huis, camping en haven.',
        ],
      },
      deliverables: [
        { icon: 'LayoutGrid', title: 'Homepage met boekingswidget en heldere customer journey' },
        { icon: 'Ship', title: 'Bootcategorieën met prijzen, beschikbaarheid en motoropties' },
        { icon: 'ScanSearch', title: 'SEO & regionale landingspagina\'s voor het vaargebied' },
        { icon: 'ShoppingCart', title: 'Cross-sell naar vakantiehuis, camping en jachthaven' },
      ],
      detailBlocks: [
        {
          title: 'Context',
          body: 'Nijenhuis Botenverhuur is een familiebedrijf in Wanneperveen, actief rond Giethoorn en Nationaal Park Weerribben-Wieden. De oude site was organisch gegroeid: informatie stond verspreid, boekingen liepen deels via losse mailtjes en de concurrentie in toerisme vraagt om een strakke, betrouwbare online eerste indruk.',
        },
        {
          title: 'Aanpak & resultaat',
          body: 'We hebben de informatiearchitectuur opnieuw opgebouwd rond de belangrijkste conversie: een reservering afronden. Daarbij zijn bestemmingspagina’s en blogartikelen ingericht zodat de site ook buiten het hoogseizoen vindbaar blijft. Het live resultaat is te volgen op nijenhuis-botenverhuur.com — inclusief actuele blog en duidelijke routes naar aanvullende diensten.',
        },
      ],
      facts: [
        {
          title: 'Type bedrijf',
          text: 'Familiebedrijf voor botenverhuur, vakantiehuis, camping en jachthaven in Wanneperveen bij Giethoorn.',
        },
        {
          title: 'Boekingen & content',
          text: 'Directe boekingsflow met datumkeuze, boottype en winkelwagen. Aanvullend een blog voor vindbaarheid en vertrouwen bij nieuwe gasten.',
        },
        {
          title: 'Regio',
          text: 'Pagina\'s en content gericht op Giethoorn, Weerribben-Wieden en omliggende plaatsen.',
        },
      ],
      ctaVisit: 'Bezoek de website',
      ctaAsk: 'Vergelijkbaar project bespreken',
      externalUrl: 'https://nijenhuis-botenverhuur.com',
    },
    {
      label: 'Houthandel & webshop',
      title: 'Houthandel Jan Sok',
      subtitle: 'Van WordPress met websitebouwer naar maatwerk webdesign met eigen webshop en orderbeheer.',
      description:
        'Het vorige traject draaide op WordPress met een websitebouwer: een basis layout zonder strakke professionele structuur en beperkte ruimte voor een volwassen webshop. Dat is volledig vervangen door een eigen ontwerp en een op maat gebouwde webshop. Orders lopen niet meer vast in een generiek template, maar door een orderbeheersysteem dat is afgestemd op hoe Jan Sok werkt — van aanvraag tot afhandeling.',
      situation:
        'Uitgangspunt: WordPress met een standaard builder — weinig hiërarchie, beperkte uitstraling en geen integraal verhaal voor een groeiende houthandel met online verkoop.',
      slug: 'houthandel-jan-sok',
      seoTitle: 'Case: Houthandel Jan Sok — ultimAItech',
      seoDescription:
        'Van WordPress-builder naar maatwerk webshop en orderbeheer voor een houthandel. Uitdaging, oplossing en concrete deliverables.',
      image: '/assets/images/usecases/houthandel-jan-sok-usecase.jpeg',
      imageAlt: 'Screenshot van de website houthandeljansok.nl',
      highlights: [
        'Volledig custom webdesign — geen template, wél merk en overzicht',
        'Webshop op maat met productstructuur passend bij assortiment en klanten',
        'Eigen orderbeheer: inzicht in status, levering en vervolgstappen',
        'Heldere schaalbare structuur i.p.v. een kant-en-klare bouwer-layout',
      ],
      challenge: {
        intro:
          'De site moest zowel vertrouwen wekken bij particulieren en aannemers als een volwassen kanaal voor online houtverkoop worden — met ruimte voor maatvoering en logistiek.',
        points: [
          'WordPress met visual builder: beperkte merkbeleving en weinig vrijheid in layout.',
          'Geen strak e-commerce fundament: lastig om catalogus en orderflow op schaal te houden.',
          'Orderstatus en vervolgstappen waren niet transparant voor klant en team.',
          'Weinig ruimte voor een duidelijke producthiërarchie (soorten, lengtes, toepassingen).',
        ],
      },
      solution: {
        intro:
          'Volledig maatwerk front-end en shop: productstructuur en orderbeheer afgestemd op het echte werk van Jan Sok, met een rustige, professionele uitstraling.',
        points: [
          'Custom webdesign zonder template — merk, hiërarchie en overzicht centraal.',
          'Webshop op maat met assortimentslogica die past bij hout en klanttypes.',
          'Eigen orderbeheer met duidelijke status, levering en vervolgacties.',
          'Schaalbare structuur: klaar voor groei zonder opnieuw tegen templatelimieten aan te lopen.',
        ],
      },
      deliverables: [
        { icon: 'Palette', title: 'Volledig maatwerk webdesign en merkgerichte lay-out' },
        { icon: 'ShoppingCart', title: 'Webshop met productstructuur op maat van het assortiment' },
        { icon: 'Layers', title: 'Orderbeheer en overzicht van aanvraag tot levering' },
        { icon: 'LayoutGrid', title: 'Schaalbare sitestructuur i.p.v. kant-en-klare builder-blokken' },
      ],
      detailBlocks: [
        {
          title: 'Context',
          body: 'Jan Sok levert hout en bouwmaterialen aan een mix van particulieren en professionals. De oude site combineerde een builder-gevoel met beperkte shoplogica: lastig om complexe productkeuzes en levertijden helder te maken.',
        },
        {
          title: 'Aanpak & resultaat',
          body: 'We zijn opnieuw begonnen bij informatiearchitectuur en checkout: welke stappen een klant ziet, hoe maatwerk en voorraad worden gecommuniceerd, en hoe intern orders blijven traceerbaar. Live: houthandeljansok.nl.',
        },
      ],
      facts: [
        {
          title: 'Uitdaging',
          text: 'Oude WordPress-site met websitebouwer: beperkte professionaliteit en geen strak e-commerce fundament.',
        },
        {
          title: 'Aanpak',
          text: 'Nieuwe site en shop vanaf de grond, met maatwerk frontend en backend voor catalogus, orders en intern proces.',
        },
        {
          title: 'Resultaat',
          text: 'Eén consistent kanaal: professionele presentatie én praktisch orderbeheer in één systeem.',
        },
      ],
      ctaVisit: 'Bezoek de website',
      ctaAsk: 'Vergelijkbaar traject bespreken',
      externalUrl: 'https://houthandeljansok.nl',
    },
    {
      label: 'Beschoeiing & projecten',
      title: 'WAL Beschoeiing',
      subtitle: 'Van Shopify-template naar maatwerk webshop met orderbeheer voor projectgestuurde verkopen.',
      description:
        'De eerdere site was een Shopify-webshop op een standaardtemplate: weinig onderscheidend, beperkte vrijheid in layout en geen echte koppeling met hoe beschoeiingsprojecten verlopen — vaak maatwerk, planning en vervolgacties. Nu staat een volledig eigen webdesign centraal, met een webshop en orderbeheer dat is ingericht op projecten: bezoekers zien duidelijk wat WAL doet, en intern blijft de orderstroom overzichtelijk.',
      situation:
        'Uitgangspunt: Shopify met een template-build — snel live, maar weinig maatwerk voor een specialist in beschoeiing en grondwerk.',
      slug: 'wal-beschoeiing',
      seoTitle: 'Case: WAL Beschoeiing — ultimAItech',
      seoDescription:
        'Van Shopify-template naar maatwerk webshop en projectgericht orderbeheer voor beschoeiing. Uitdaging, oplossing en deliverables.',
      image: '/assets/images/usecases/wal-beschoeiing-usecase.jpeg',
      imageAlt: 'Screenshot van de website wal-beschoeiing.nl',
      highlights: [
        'Maatwerk webdesign i.p.v. een generieke shop-template',
        'Webshop en pagina\'s die het projectmatige karakter van beschoeiing ondersteunen',
        'Eigen orderbeheer zonder Shopify-templatebeperkingen',
        'Professionele structuur: diensten, werkwijze en conversie op maat van de doelgroep',
      ],
      challenge: {
        intro:
          'Shopify met een standaardtemplate bracht snelheid, maar geen verhaal dat past bij projectmatige beschoeiing: offertes, planning en nazorg vroegen om maatwerk buiten de template-rails.',
        points: [
          'Weinig onderscheidend visueel en beperkte vrijheid in pagina-opbouw.',
          'Generieke shopflow: lastig om diensten, werkwijze en projectcases te verbinden.',
          'Orderpad niet afgestemd op vervolgstappen na eerste aanvraag.',
          'Intern: beperkte grip op maatwerkorders versus standaardproducten.',
        ],
      },
      solution: {
        intro:
          'Eigen ontwerp en shopflow: pagina\'s en orderbeheer die het projectkarakter van beschoeiing ondersteunen, met een professionele uitstraling richting aannemers en gemeenten.',
        points: [
          'Maatwerk webdesign i.p.v. generieke shop-template.',
          'Webshop en landingspagina\'s die beschoeiing en werkwijze helder maken.',
          'Eigen orderbeheer zonder templatebeperkingen van het oude platform.',
          'Conversiegerichte structuur: diensten, vertrouwen en duidelijke vervolgstappen.',
        ],
      },
      deliverables: [
        { icon: 'Palette', title: 'Maatwerk webdesign en merkgerichte presentatie' },
        { icon: 'Layers', title: 'Webshop en pagina\'s voor projectmatige beschoeiing' },
        { icon: 'ShoppingCart', title: 'Orderbeheer afgestemd op aanvragen en vervolg' },
        { icon: 'Building2', title: 'Professionele structuur voor diensten en doelgroep' },
      ],
      detailBlocks: [
        {
          title: 'Context',
          body: 'WAL richt zich op beschoeiing en grondwerk voor klanten die kwaliteit en planning serieus nemen. De oude Shopify-setup was commercieel bruikbaar, maar vertelde het verhaal van projecten en expertise onvoldoende.',
        },
        {
          title: 'Aanpak & resultaat',
          body: 'We hebben het traject opnieuw vormgegeven rond duidelijke diensten, cases en een orderflow die past bij offerte-gedreven werk. Live: wal-beschoeiing.nl.',
        },
      ],
      facts: [
        {
          title: 'Uitdaging',
          text: 'Shopify met template: snel live, maar weinig ruimte voor maatwerkprojecten en een duidelijke werkwijze.',
        },
        {
          title: 'Aanpak',
          text: 'Eigen ontwerp en shopflow afgestemd op beschoeiing, aanvragen en vervolg — los van template-rails.',
        },
        {
          title: 'Resultaat',
          text: 'Professionele uitstraling én praktische orderstroom voor projectmatige orders.',
        },
      ],
      ctaVisit: 'Bezoek de website',
      ctaAsk: 'Vergelijkbaar traject bespreken',
      externalUrl: 'https://wal-beschoeiing.nl',
    },
  ],

  cta: {
    headline: 'Wilt u vergelijkbaar werk voor uw bedrijf?',
    text: 'Bespreek wat een soortgelijk project voor uw situatie zou betekenen — scope, aanpak en verwachte resultaten.',
    button: 'Plan een gesprek',
    secondary: 'Bekijk diensten',
  },
};

const about = {
  hero: {
    label: 'Over ultimAItech',
    title: 'Persoonlijk, vakkundig en altijd bereikbaar',
    description:
      'ultimAItech is opgericht vanuit Wanneperveen, Overijssel. Als zelfstandig ontwikkelaar bouw ik websites en software op maat voor ondernemers in Drenthe en Overijssel — met persoonlijk contact, vaste afspraken en een portfolio dat u zelf kunt beoordelen.',
  },

  story: {
    title: 'Eén aanspreekpunt, geen omwegen',
    text: 'Als u met ultimAItech werkt, werkt u rechtstreeks met mij. Geen tussenpersonen, geen onduidelijke verantwoordelijkheden, geen wisselende contactpersonen. Ik neem uw project van begin tot eind op me — van het eerste gesprek tot de oplevering en nazorg. Mijn focus ligt op ondernemers in Drenthe en Overijssel die een betrouwbare partner zoeken voor websites, webshops en maatwerksoftware. Projecten als Nijenhuis Botenverhuur, Houthandel Jan Sok en WAL Beschoeiing laten zien wat concreet mogelijk is: van boekingsplatforms tot webshops met orderbeheer.',
    values: [
      'Transparante communicatie bij elke stap — u weet altijd waar u aan toe bent',
      'Vaste prijsafspraken zonder verrassingen — scope en kosten staan vooraf vast',
      'Documentatie en overdracht zodat u niet afhankelijk bent van één persoon',
      'Bereikbaar voor vragen, ook na oplevering — met nazorg en ondersteuning',
    ],
  },

  expertise: {
    label: 'Expertise',
    title: 'Wat ik bouw',
    text: 'Ik werk met moderne webtechnologie: snelle, veilige websites en webapplicaties die schalen met uw bedrijf. Geen WordPress-templates of Shopify-beperkingen — alles op maat, afgestemd op uw processen en merk.',
    items: [
      { title: 'Websites & webshops', text: 'Brochuresites, webshops, bestemmingspagina\'s en landingspagina\'s. Snel, vindbaar en gericht op conversie.' },
      { title: 'Software op maat', text: 'Orderbeheer, reserveringssystemen, koppelingen en interne dashboards voor processen die standaardsoftware niet afdekt.' },
      { title: 'AI-chatbots', text: 'Chatbots op basis van uw eigen content, in Nederlands, Duits en Engels — als aanvulling op website of software.' },
      { title: 'Migraties', text: 'Van WordPress, Shopify of verouderde sites naar maatwerk — zonder functionaliteit te verliezen.' },
    ],
  },

  region: {
    label: 'Regio',
    title: 'Werkgebied',
    text: 'Gevestigd in Wanneperveen, actief in heel Drenthe en Overijssel. Persoonlijk contact en korte lijnen — ook voor ondernemers in de grensregio Niedersachsen, met Duitstalige websites en chatbots.',
    areas: ['Drenthe', 'Overijssel', 'Grensregio Niedersachsen'],
  },

  business: {
    title: 'Bedrijfsgegevens',
    name: 'ultimAItech',
    location: 'Wanneperveen, Overijssel',
    kvk: '98782800',
    btw: 'NL576150447B01',
    email: 'info@ultimaitech.com',
    areas: ['Drenthe', 'Overijssel', 'Grensregio Niedersachsen'],
  },

  howIWork: {
    label: 'Werkwijze',
    title: 'Zo werk ik',
    steps: [
      { title: 'Luisteren', text: 'Eerst begrijpen wat u nodig heeft en waarom, voordat ik een voorstel doe. Geen standaardpakketten — elke situatie is anders.' },
      { title: 'Helder voorstel', text: 'Een concreet voorstel met vaste prijs, planning en duidelijke afspraken. U weet precies wat er gebouwd wordt en wanneer.' },
      { title: 'Bouwen met feedback', text: 'U ziet tussentijds resultaat en geeft feedback bij elke mijlpaal. Geen verrassingen aan het eind van het traject.' },
      { title: 'Opleveren en ondersteunen', text: 'Oplevering met documentatie en een vaste periode ondersteuning. U kunt er direct mee aan de slag.' },
    ],
  },

  faq: {
    title: 'Veelgestelde vragen',
    items: [
      {
        q: 'Waarom een solo-ontwikkelaar in plaats van een bureau?',
        a: 'U spreekt altijd met dezelfde persoon, van intake tot nazorg. Geen accountmanagers of wisselende teams. Dat betekent snellere beslissingen, lagere kosten en directe verantwoordelijkheid.',
      },
      {
        q: 'Werkt u met vaste prijzen?',
        a: 'Ja. Na een kennismakingsgesprek ontvangt u een voorstel met vaste prijs voor de afgesproken scope. Geen uurtje-factuurtje en geen verrassingen achteraf.',
      },
      {
        q: 'Wat gebeurt er na oplevering?',
        a: 'U ontvangt documentatie en instructie. Optioneel kunt u een onderhoudsabonnement afsluiten. Ik blijf bereikbaar voor vragen en kleine aanpassingen.',
      },
      {
        q: 'In welke talen werkt u?',
        a: 'Nederlands, Duits en Engels — voor websites, chatbots en communicatie. Ideaal voor ondernemers in de grensregio die ook Duitse klanten bedienen.',
      },
      {
        q: 'Moet ik langs komen of kan het op afstand?',
        a: 'Beide. Kennismakingsgesprekken kunnen online of bij u op locatie in Drenthe/Overijssel. De bouw verloopt grotendeels digitaal, met tussentijdse demo\'s en feedbackmomenten.',
      },
    ],
  },

  cta: {
    headline: 'Wilt u weten wat ik voor u kan betekenen?',
    text: 'Plan een vrijblijvend kennismakingsgesprek. Geen verplichtingen, wel direct duidelijkheid over wat er mogelijk is.',
    button: 'Plan een gesprek',
    secondary: 'Bekijk projecten',
  },
};

const contact = {
  hero: {
    label: 'Contact',
    title: 'Neem contact op',
    description:
      'Een vraag over een website, webshop, software of AI-chatbot? Stuur een bericht of plan direct een vrijblijvend gesprek. Ik reageer binnen één werkdag — persoonlijk, zonder verkooppraatje. Gevestigd in Wanneperveen, actief in Drenthe, Overijssel en de grensregio.',
  },

  process: {
    label: 'Wat gebeurt er daarna',
    title: 'Van bericht tot gesprek',
    steps: [
      { title: 'U stuurt een bericht', text: 'Via het formulier hieronder. Vertel kort waar u aan denkt — website, webshop, software of chatbot.' },
      { title: 'Ik reageer binnen één werkdag', text: 'Met een korte reactie en eventueel een voorstel voor een kennismakingsgesprek — online of bij u op locatie.' },
      { title: 'Vrijblijvend gesprek', text: 'We bespreken uw wensen, doelen en budget. Geen verplichtingen, wel direct duidelijkheid over wat haalbaar is.' },
      { title: 'Voorstel met vaste prijs', text: 'Als we verder willen, ontvangt u een concreet voorstel met scope, planning en vaste prijs.' },
    ],
  },

  topics: {
    label: 'Waarover',
    title: 'Waar kunt u mij voor bereiken',
    items: [
      { title: 'Nieuwe website of webshop', text: 'Van brochuresite tot volledige webshop met orderbeheer. Maatwerk in plaats van templates.' },
      { title: 'Software op maat', text: 'Orderbeheer, reserveringen, koppelingen of interne tools die uw processen stroomlijnen.' },
      { title: 'AI-chatbot', text: 'Een chatbot op uw website die vragen beantwoordt op basis van uw eigen content — 24/7 bereikbaar.' },
      { title: 'Vernieuwing of migratie', text: 'Van WordPress, Shopify of een verouderde site naar een snelle, veilige maatwerkoplossing.' },
      { title: 'Advies of second opinion', text: 'Niet zeker wat u nodig heeft? Een kort gesprek kan al veel duidelijkheid geven.' },
    ],
  },

  region: {
    label: 'Regio',
    title: 'Werkgebied',
    text: 'ultimAItech is gevestigd in Wanneperveen en werkt voor ondernemers in heel Drenthe en Overijssel — van Meppel en Zwolle tot Assen en de kop van Overijssel. Kennismakingsgesprekken kunnen online of bij u op locatie; veel klanten waarderen een persoonlijk gesprek voordat ze een traject starten. Ook bereikbaar voor bedrijven in Niedersachsen, met communicatie in het Duits.',
    areas: ['Drenthe', 'Overijssel', 'Grensregio Niedersachsen'],
    mapTitle: 'Locatie',
  },

  form: {
    nameLabel: 'Naam',
    namePlaceholder: 'Uw naam',
    emailLabel: 'E-mailadres',
    emailPlaceholder: 'uw@email.nl',
    companyLabel: 'Bedrijfsnaam (optioneel)',
    companyPlaceholder: 'Uw bedrijf',
    intentLabel: 'Waar kan ik u mee helpen?',
    intentOptions: [
      { value: 'website', label: 'Website of webshop' },
      { value: 'software', label: 'Software op maat' },
      { value: 'ai-chatbot', label: 'AI-chatbot' },
      { value: 'redesign', label: 'Vernieuwing of migratie' },
      { value: 'other', label: 'Anders / advies' },
    ],
    messageLabel: 'Uw bericht',
    messagePlaceholder: 'Vertel kort waar u aan denkt...',
    submit: 'Verstuur bericht',
    successTitle: 'Bericht verstuurd!',
    successText: 'Bedankt voor uw bericht. Ik neem zo snel mogelijk contact met u op, meestal binnen één werkdag.',
  },

  info: {
    title: 'Direct contact',
    email: 'info@ultimaitech.com',
    location: 'Wanneperveen, Overijssel',
    availability: 'Maandag t/m vrijdag, 09:00 – 17:00',
    locationLabel: 'Locatie',
    availabilityLabel: 'Beschikbaarheid',
  },

  faq: {
    title: 'Veelgestelde vragen',
    items: [
      {
        q: 'Hoe snel reageert u?',
        a: 'Binnen één werkdag, meestal dezelfde dag. Voor dringende vragen kunt u ook direct mailen naar info@ultimaitech.com.',
      },
      {
        q: 'Krijg ik meteen een prijsindicatie?',
        a: 'Na een kort gesprek kan ik een bandbreedte geven. Een concreet voorstel met vaste prijs volgt na een kennismaking waarin we scope en wensen bespreken.',
      },
      {
        q: 'Hoe verloopt een kennismakingsgesprek?',
        a: 'Ongeveer 30–45 minuten, online of bij u op locatie. We bespreken uw situatie, doelen en budget. Geen verplichtingen — wel direct duidelijkheid.',
      },
      {
        q: 'Werkt u ook in het Duits of Engels?',
        a: 'Ja. Communicatie, websites en chatbots kunnen in Nederlands, Duits en Engels. Ideaal voor de grensregio.',
      },
      {
        q: 'Ik heb al een website — kan ik toch contact opnemen?',
        a: 'Zeker. Veel klanten komen voor vernieuwing, migratie van WordPress/Shopify, of een chatbot als aanvulling. Beschrijf uw situatie in het formulier.',
      },
      {
        q: 'Is een eerste gesprek echt vrijblijvend?',
        a: 'Ja. Een kennismaking kost u niets en verplicht u tot niets. Het doel is om te begrijpen of en hoe ik u kan helpen — met eerlijk advies, ook als dat betekent dat maatwerk (nog) niet nodig is.',
      },
    ],
  },
};

const blog = {
  hero: {
    label: 'Blog',
    title: 'Nieuws & inzichten',
    description:
      'Artikelen over webontwikkeling, software op maat, lokale SEO en AI-chatbots — uit de praktijk voor ondernemers in Drenthe en Overijssel. Praktische tips over kosten, keuzes en vindbaarheid. Geen verkooppraatjes.',
  },

  intro: {
    title: 'Kennis delen uit de praktijk',
    text: 'Op deze blog deel ik inzichten uit projecten en de dagelijkse praktijk als website- en softwareontwikkelaar in Wanneperveen. U leest hier over onderwerpen die MKB-ondernemers in Drenthe en Overijssel direct raken: wat kost een website, wanneer kiest u voor maatwerk in plaats van WordPress, hoe verbetert u uw vindbaarheid in de regio, en wanneer is een AI-chatbot zinvol? De artikelen zijn geschreven om u te helpen betere beslissingen te nemen — of u nu met mij werkt of met een andere partij. Veel stukken gaan over concrete situaties: een webshop die vastloopt op templates, een site die niet meer vindbaar is in Google, of processen die handmatig blijven terwijl automatisering tijd bespaart. Nieuwe artikelen verschijnen regelmatig; kom gerust terug of neem contact op als u een onderwerp mist.',
  },

  topics: {
    label: 'Thema\'s',
    title: 'Onderwerpen',
    items: [
      { title: 'Websites & webshops', text: 'Kosten, keuzes tussen maatwerk en WordPress, snelheid, beveiliging en wanneer een nieuwe site nodig is. Inclusief vergelijkingen en realistische prijsindicaties voor MKB in de regio.' },
      { title: 'Lokale SEO', text: 'Gevonden worden in Drenthe en Overijssel — Google Mijn Bedrijf, regionale content, bestemmingspagina\'s en waar veel ondernemers de mist in gaan.' },
      { title: 'Software & automatisering', text: 'Wanneer standaardsoftware tekortschiet en maatwerk loont — orderbeheer, koppelingen, interne tools en het terugverdienen van investeringen.' },
      { title: 'AI & chatbots', text: 'Praktische toepassingen voor MKB — wat een chatbot kan, wat het kost, privacy (AVG) en wanneer het zinvol is als aanvulling op uw site.' },
    ],
  },

  whyRead: {
    title: 'Waarom deze blog?',
    text: 'Het internet staat vol algemene tips die weinig te maken hebben met een houthandel in Overijssel of een recreatiebedrijf bij Giethoorn. Deze artikelen zijn geschreven vanuit projecten in de regio: wat werkt, wat niet, en welke keuzes ondernemers later beuëten. Geen clickbait, wel eerlijk advies. Zoekt u een partner voor uitvoering? Bekijk de diensten en projecten — of neem contact op voor een vrijblijvend gesprek.',
  },

  faq: {
    title: 'Veelgestelde vragen over de blog',
    items: [
      {
        q: 'Voor wie zijn deze artikelen geschreven?',
        a: 'Voor ondernemers en MKB in Drenthe, Overijssel en de grensregio die een website, webshop of software overwegen. De tips zijn praktisch en toepasbaar, ongeacht met wie u uiteindelijk werkt.',
      },
      {
        q: 'Hoe vaak verschijnen er nieuwe artikelen?',
        a: 'Regelmatig, afhankelijk van beschikbare tijd na klantprojecten. De focus ligt op kwaliteit en relevantie, niet op een vast publicatieschema.',
      },
      {
        q: 'Kan ik een onderwerp voorstellen?',
        a: 'Ja. Stuur een bericht via het contactformulier als u een specifiek onderwerp mist. Ik kijk of het past bij de doelgroep en plan het in waar mogelijk.',
      },
      {
        q: 'Zijn de artikelen ook in het Duits en Engels?',
        a: 'De blog is beschikbaar in Nederlands, Duits en Engels. Elk artikel heeft een vertaling op de corresponderende taalversie van de site.',
      },
      {
        q: 'Kan ik de artikelen citeren of delen?',
        a: 'Ja, met bronvermelding (ultimAItech en link naar het artikel). De inhoud is bedoeld om kennis te delen met ondernemers in de regio.',
      },
      {
        q: 'Waar vind ik markdown-versies voor AI-systemen?',
        a: 'Gepubliceerde artikelen zijn ook beschikbaar als markdown onder /blog/md/ — handig voor AI-crawlers en zoekmachines die gestructureerde content prefereren.',
      },
    ],
  },

  readMore: 'Lees meer',
  noPosts: 'Nog geen artikelen beschikbaar.',
};

const privacy = {
  title: 'Privacybeleid',
  lastUpdated: 'Laatst bijgewerkt: mei 2026',
  intro: 'ultimAItech, gevestigd in Wanneperveen (Overijssel), is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid. Wij respecteren uw privacy en verwerken persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG). Dit beleid beschrijft welke gegevens wij verzamelen, waarom, hoe lang wij ze bewaren en welke rechten u heeft.',
  sections: [
    {
      title: 'Welke gegevens verzamelen wij?',
      text: 'Wanneer u ons contactformulier invult, verzamelen wij uw naam, e-mailadres, eventueel bedrijfsnaam en de inhoud van uw bericht. Als u een intentie selecteert (website, software, chatbot), slaan wij die keuze op. Deze gegevens gebruiken wij uitsluitend om uw vraag te beantwoorden of een offerte op te stellen. Wij verzamelen geen gegevens via marketingcookies of gedragstracking op deze website.',
    },
    {
      title: 'Hoe gebruiken wij uw gegevens?',
      text: 'Uw gegevens worden alleen gebruikt voor het doel waarvoor u ze heeft verstrekt: het beantwoorden van uw vraag, het uitbrengen van een offerte of het voeren van een gesprek over een mogelijk project. Wij gebruiken uw gegevens niet voor ongevraagde marketing. Wij delen uw gegevens niet met derden, behalve wanneer dat noodzakelijk is voor de dienstverlening (bijv. formulierverwerking via FormSubmit) of wanneer de wet dit vereist.',
    },
    {
      title: 'Verwerkingsgrondslag',
      text: 'Wij verwerken uw persoonsgegevens op basis van uw toestemming (wanneer u het contactformulier invult) en op basis van gerechtvaardigd belang (wanneer wij contact met u onderhouden over een lopende of afgeronde opdracht). Voor offertes en overeenkomsten verwerken wij gegevens ter uitvoering van een overeenkomst of ter voorbereiding daarvan.',
    },
    {
      title: 'Bewaartermijn',
      text: 'Wij bewaren uw gegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld. Contactformuliergegevens worden maximaal twee jaar na het laatste contact bewaard, tenzij een langere bewaartermijn nodig is voor een lopende of afgeronde opdracht (bijv. facturatie of garantie). Daarna worden gegevens verwijderd of geanonimiseerd.',
    },
    {
      title: 'Uw rechten',
      text: 'U heeft recht op inzage, correctie, verwijdering, beperking van verwerking, dataportabiliteit en bezwaar tegen verwerking van uw persoonsgegevens. U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens. Neem voor het uitoefenen van uw rechten contact op via info@ultimaitech.com. Wij reageren binnen één maand.',
    },
    {
      title: 'Cookies',
      text: 'Deze website plaatst geen marketing- of gedragstrackingcookies. Hosting en formulierlevering (FormSubmit) kunnen technische logs verwerken die nodig zijn om de dienst te leveren, zoals IP-adres en tijdstip van verzending. Als er later optionele analytics worden ingeschakeld, wordt dit beleid bijgewerkt en wordt u geïnformeerd.',
    },
    {
      title: 'Beveiliging',
      text: 'Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik. Communicatie via het contactformulier verloopt via een beveiligde verbinding (HTTPS). Formuliergegevens worden verwerkt door onze formulierprovider; wij hebben geen invloed op hun beveiligingsmaatregelen maar kiezen voor betrouwbare partijen.',
    },
    {
      title: 'Wijzigingen',
      text: 'Wij kunnen dit privacybeleid aanpassen wanneer onze diensten of de wetgeving wijzigen. De datum van de laatste wijziging staat bovenaan deze pagina. Bij substantiële wijzigingen informeren wij u waar mogelijk.',
    },
    {
      title: 'Contact',
      text: 'Heeft u vragen over dit privacybeleid of over de verwerking van uw persoonsgegevens? Neem contact op via info@ultimaitech.com of via het contactformulier op deze website. Verantwoordelijke: ultimAItech, Wanneperveen, Overijssel, KVK 98782800. Wij streven ernaar binnen één maand te reageren op verzoeken met betrekking tot uw privacyrechten.',
    },
  ],
};

const terms = {
  title: 'Algemene voorwaarden',
  lastUpdated: 'Laatst bijgewerkt: mei 2026',
  intro: 'Deze algemene voorwaarden zijn van toepassing op alle dienstverlening door ultimAItech, gevestigd in Wanneperveen, Overijssel (KVK 98782800). Door een offerte te aanvaarden of een overeenkomst aan te gaan, gaat u akkoord met deze voorwaarden. Afwijkingen zijn alleen geldig indien schriftelijk overeengekomen.',
  sections: [
    {
      title: 'Definities',
      text: 'In deze voorwaarden wordt verstaan onder: Opdrachtnemer: ultimAItech, de zelfstandig website- en softwareontwikkelaar. Opdrachtgever: de natuurlijke of rechtspersoon die een overeenkomst aangaat met ultimAItech. Werk: de door ultimAItech te leveren websites, software, chatbots of andere diensten zoals beschreven in de offerte.',
    },
    {
      title: 'Offertes en overeenkomsten',
      text: 'Alle offertes zijn vrijblijvend en geldig gedurende 30 dagen, tenzij anders vermeld. Een overeenkomst komt tot stand na schriftelijke aanvaarding van de offerte door de opdrachtgever (e-mail is voldoende). De offerte en eventuele bijlagen vormen onderdeel van de overeenkomst. Wijzigingen in scope of planning worden schriftelijk vastgelegd en kunnen de prijs en planning beïnvloeden.',
    },
    {
      title: 'Uitvoering',
      text: 'ultimAItech voert de werkzaamheden naar beste vermogen uit en zal daarbij de nodige zorgvuldigheid in acht nemen. Oplevering geschiedt volgens de in de offerte vastgelegde planning. De opdrachtgever levert tijdig benodigde informatie, content en feedback. Vertraging door late aanlevering van de opdrachtgever kan de planning verschuiven.',
    },
    {
      title: 'Betaling',
      text: 'Betaling geschiedt conform de in de offerte genoemde betalingsregeling, tenzij schriftelijk anders overeengekomen. De standaard betalingstermijn is 14 dagen na factuurdatum. Bij niet-tijdige betaling is de opdrachtgever van rechtswege in verzuim en is wettelijke rente verschuldigd. ultimAItech behoudt zich het recht voor werkzaamheden op te schorten bij achterstallige betaling.',
    },
    {
      title: 'Intellectueel eigendom',
      text: 'Na volledige betaling gaat het eigendom van het opgeleverde werk (code, ontwerp, contentstructuur) over op de opdrachtgever, tenzij anders overeengekomen. Gebruikte open-source componenten blijven onder hun eigen licenties vallen. ultimAItech behoudt het recht om het werk op te nemen in portfolio en referenties, tenzij de opdrachtgever dit schriftelijk uitsluit.',
    },
    {
      title: 'Garantie & acceptatie',
      text: 'ultimAItech levert werk dat voldoet aan de in de offerte beschreven specificaties. Na oplevering heeft de opdrachtgever 14 dagen om gebreken te melden die afwijken van de overeengekomen scope. Kleine correcties binnen de scope worden kosteloos uitgevoerd. Garantie op het werk geldt voor de periode zoals vermeld in de offerte, doorgaans 30 dagen na oplevering voor bugfixes.',
    },
    {
      title: 'Aansprakelijkheid',
      text: 'De aansprakelijkheid van ultimAItech is beperkt tot het bedrag dat voor de betreffende opdracht in rekening is gebracht, met een maximum van het factuurbedrag van de desbetreffende opdracht. ultimAItech is niet aansprakelijk voor indirecte schade, gevolgschade, gederfde winst of dataverlies, behalve in geval van opzet of grove schuld.',
    },
    {
      title: 'Opzegging & annulering',
      text: 'De opdrachtgever kan een lopende opdracht schriftelijk opzeggen. Reeds geleverd werk en gemaakte uren worden gefactureerd conform de offerte. Bij annulering door de opdrachtgever vóór aanvang kan een annuleringsvergoeding van toepassing zijn zoals vermeld in de offerte. ultimAItech kan de overeenkomst beëindigen bij niet-nakoming door de opdrachtgever, na schriftelijke ingebrekestelling.',
    },
    {
      title: 'Vertrouwelijkheid',
      text: 'Beide partijen behandelen vertrouwelijke informatie die zij in het kader van de opdracht ontvangen als geheim. Deze verplichting blijft gelden na beëindiging van de overeenkomst. ultimAItech verwerkt persoonsgegevens conform het privacybeleid en de AVG.',
    },
    {
      title: 'Toepasselijk recht',
      text: 'Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Overijssel. Partijen zullen eerst trachten een geschil in onderling overleg op te lossen.',
    },
  ],
};

const dictionary = { locale, slugs, nav, footer, home, services, websites, software, aiChatbots, projects, about, blog, contact, privacy, terms };

export type Dictionary = typeof dictionary;

export default dictionary;
