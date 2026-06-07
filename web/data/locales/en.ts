const locale = 'en';

const slugs = {
  home: '/en/',
  services: '/en/services/',
  websites: '/en/services/websites/',
  software: '/en/services/software/',
  aiChatbots: '/en/services/ai-chatbots/',
  projects: '/en/work/',
  about: '/en/about/',
  blog: '/en/blog/',
  blogPost: '/en/blog/_post/',
  contact: '/en/contact/',
  privacy: '/en/privacy/',
  terms: '/en/terms/',
  offer: '/en/offer/',
};

const nav = [
  { name: 'Home', path: slugs.home },
  { name: 'Services', path: slugs.services },
  { name: 'Work', path: slugs.projects },
  { name: 'About', path: slugs.about },
  { name: 'Blog', path: slugs.blog },
  { name: 'Contact', path: slugs.contact },
];

const footer = {
  tagline: 'Reliable websites and custom software from Wanneperveen — for businesses in Drenthe, Overijssel and the Lower Saxony border region.',
  ctaBand: {
    headline: 'Want a clear plan for your site or software?',
    sub: 'No sales pitch — clarity on approach, scope, and next steps. Reply within one business day.',
    cta: 'Schedule a call',
  },
  copyright: `© ${new Date().getFullYear()} ultimAItech. All rights reserved.`,
  bottomLine: 'Registered with the Chamber of Commerce in Overijssel.',
  columns: {
    diensten: {
      title: 'Services',
      links: [
        ['Websites & webshops', slugs.websites],
        ['Custom software', slugs.software],
        ['AI & chatbots', slugs.aiChatbots],
      ],
    },
    bedrijf: {
      title: 'Company',
      links: [
        ['About', slugs.about],
        ['Work', slugs.projects],
        ['Blog', slugs.blog],
        ['Contact', slugs.contact],
      ],
    },
    vertrouwen: {
      title: 'Trust',
      links: [
        ['Privacy', slugs.privacy],
        ['Terms', slugs.terms],
      ],
    },
  },
};

const home = {
  hero: {
    headline: 'Reliable websites and custom software — from Wanneperveen.',
    subtext:
      'For businesses in Drenthe, Overijssel and the Lower Saxony border region that need a website, webshop or custom application that works, loads fast and lasts for years. One point of contact, fixed agreements, predictable delivery.',
    cta1: 'Schedule a free consultation',
    cta2: 'View projects',
    trustLine: 'Fixed pricing · direct contact · delivery with documentation',
  },

  intro: {
    title: 'What is ultimAItech?',
    text: 'ultimAItech is an independent website and software developer based in Wanneperveen, Overijssel. I build professional websites, webshops and custom software for businesses in Drenthe, Overijssel and the Lower Saxony border region — from recreation companies and timber traders to webshops and service providers. No agency with layers: you work directly with me, with fixed pricing, a clear process and delivery including documentation. AI chatbots are an add-on service for businesses that want to strengthen their website or software with smart customer service.',
  },

  socialProof: {
    label: 'Why teams choose us',
    items: [
      { value: '1', label: 'single point of contact from intake to delivery' },
      { value: 'GDPR', label: 'thoughtful handling of personal data' },
      { value: 'NL · DE · EN', label: 'content and comms in your language' },
    ],
  },

  whoWeServe: {
    label: 'Who we serve',
    title: 'Businesses that want results, not noise',
    items: [
      { title: 'Recreation & tourism', text: 'Booking platforms, destination pages and blogs for businesses in and around Giethoorn, Weerribben-Wieden and the border region.' },
      { title: 'Trade & webshops', text: 'Custom webshops and order management for timber trade, sheet piling and other sectors where standard templates fall short.' },
      { title: 'SMB & services', text: 'Professional websites and web applications for businesses that want to be more visible online and streamline processes.' },
      { title: 'NL/DE border region', text: 'Websites and chatbots in Dutch, German and English — ideal for businesses that also serve German customers.' },
    ],
  },

  principles: [
    {
      icon: 'Shield',
      title: 'Professionalism',
      text: 'Solid craftsmanship, clean delivery and clear communication at every step. No empty promises — demonstrable results you can assess yourself, including live projects in the portfolio.',
    },
    {
      icon: 'CheckCircle2',
      title: 'Reliability',
      text: 'A deal is a deal. Fixed pricing, clear planning and a single point of contact from start to finish. You know upfront what you get, when it is ready and what it costs.',
    },
    {
      icon: 'Heart',
      title: 'Trust',
      text: 'Transparent methods, honest advice and documentation you can verify yourself. Your project is in good hands — also after delivery, with aftercare and availability for questions.',
    },
  ],

  services: [
    {
      icon: 'MonitorSmartphone',
      title: 'Websites & webshops',
      text: 'Professional websites and webshops that load fast, rank well in search engines and turn visitors into customers.',
      link: slugs.websites,
      cta: 'More about websites',
    },
    {
      icon: 'Blocks',
      title: 'Custom software',
      text: 'Web applications, integrations and automations that do exactly what your business needs.',
      link: slugs.software,
      cta: 'More about software',
    },
    {
      icon: 'BotMessageSquare',
      title: 'AI & chatbots',
      text: 'An AI chatbot on your website that answers questions based on your own content — available 24/7, fewer repetitive enquiries.',
      link: slugs.aiChatbots,
      cta: 'More about AI',
    },
  ],

  region: {
    label: 'Region',
    title: 'Active in Drenthe and Overijssel',
    text: 'Based in Wanneperveen, working throughout Drenthe and Overijssel — from Meppel and Zwolle to Assen and the northern tip of Overijssel. Personal contact, short lines of communication and knowledge of the local market make the difference: I understand how businesses in the region work and what their customers expect. Also available for businesses across the border in Lower Saxony, with websites and chatbots in German.',
    areas: ['Drenthe', 'Overijssel', 'Lower Saxony border region'],
  },

  featuredProject: {
    label: 'Featured project',
    title: 'Nijenhuis Botenverhuur',
    description:
      'Full renewal: from an outdated site with broken links to a booking-led website and blog for boating near Giethoorn and Weerribben-Wieden.',
    highlights: [
      'Direct booking flow with date selection and boat category',
      'Destination pages for Giethoorn, Belt-Schutsloot and Wanneperveen',
      'Blog with regional content for discoverability and trust',
      'Cross-sell for holiday home, camping and marina',
    ],
    cta: 'View projects',
    ctaExternal: 'Visit the website',
    externalUrl: 'https://nijenhuis-botenverhuur.com',
  },

  howWeWork: {
    label: 'Process',
    title: 'From first conversation to delivery',
    subtitle: 'A clear process without surprises — so you know exactly what to expect.',
    steps: [
      {
        step: '01',
        title: 'Introduction',
        text: 'A free consultation about your needs, goals and budget. No obligations, but immediate clarity on what is feasible and which approach fits best.',
      },
      {
        step: '02',
        title: 'Proposal & planning',
        text: 'A clear proposal with fixed pricing, concrete milestones and a realistic timeline. You know exactly what will be built, when and at what cost.',
      },
      {
        step: '03',
        title: 'Build & feedback',
        text: 'You see progress at each milestone and provide feedback before we move on. No surprises at the end — you are involved in every important decision.',
      },
      {
        step: '04',
        title: 'Delivery & aftercare',
        text: 'Delivery with documentation, training and a fixed aftercare period. You can get started right away and are not dependent on me for daily adjustments.',
      },
    ],
  },

  cta: {
    headline: 'Ready to discuss your project?',
    subtext:
      'Schedule a free consultation. Together we will determine the best approach for your website, webshop or software project.',
    button: 'Schedule a consultation',
    secondary: 'View services',
  },
};

const services = {
  hero: {
    label: 'Services',
    title: 'What I can do for you',
    description:
      'From a professional website to custom software and smart AI applications. Always with personal attention, fixed agreements and a clear result — for businesses in Drenthe, Overijssel and the border region.',
  },

  intro: {
    title: 'Three pillars, one point of contact',
    text: 'ultimAItech offers three core services: websites and webshops, custom software and AI chatbots. Most clients start with a website or webshop; when processes become more complex, I build custom software or integrations. AI chatbots are an add-on — useful when your site gets many visitor questions or when you serve Dutch and German customers. Everything under one roof, with one developer who guides your project from start to finish. View the projects to see what is concretely possible, or schedule a consultation to discuss your situation.',
  },

  pillars: [
    {
      icon: 'MonitorSmartphone',
      title: 'Websites & webshops',
      text: 'Professional websites and webshops that load fast, rank well in Google and turn visitors into customers. Suitable for brochure sites, webshops, landing pages and destination pages. Custom builds instead of WordPress templates — faster, more secure and fully aligned with your brand.',
      link: slugs.websites,
      cta: 'More about websites',
      fit: ['Businesses that need a new or refreshed website', 'Companies that want to be more visible online', 'Webshops that want to sell more'],
    },
    {
      icon: 'Blocks',
      title: 'Custom software',
      text: 'Web applications, integrations with existing systems and automations that save time and reduce errors. Built with modern technology, tailored to your processes — from order management and booking systems to internal dashboards and API integrations.',
      link: slugs.software,
      cta: 'More about software',
      fit: ['Businesses with processes that can be better automated', 'Teams that need integrations between systems', 'Organisations that want a unique application built'],
    },
    {
      icon: 'BotMessageSquare',
      title: 'AI & chatbots',
      text: 'An AI chatbot on your website that answers questions based on your own content. Smart customer service that is always available — in Dutch, German and English. Ideal as an add-on to an existing website or as part of a new project.',
      link: slugs.aiChatbots,
      cta: 'More about AI',
      fit: ['Websites with many visitor questions', 'Businesses looking to support customer service', 'Teams wanting to make internal knowledge more accessible'],
    },
  ],

  approach: {
    label: 'Approach',
    title: 'How I work',
    points: [
      'Personal contact — you always speak with the same person, from intake to aftercare',
      'Fixed pricing agreements — no surprises afterwards; scope and costs are set upfront',
      'Transparent planning — you know exactly when things are ready, with interim demos',
      'Documentation and handover — you are never dependent on me alone; everything is transferable',
      'Regional focus — knowledge of Drenthe, Overijssel and the border region; also German-language projects',
    ],
  },

  region: {
    label: 'Region',
    title: 'Services in Drenthe, Overijssel and border region',
    text: 'ultimAItech is based in Wanneperveen and works for businesses throughout Drenthe and Overijssel. Whether you are in Meppel, Zwolle, Assen or the northern tip of Overijssel: personal contact and short lines of communication are standard. I also build websites and chatbots in German for businesses in Lower Saxony.',
    areas: ['Drenthe', 'Overijssel', 'Lower Saxony border region'],
  },

  whenToStart: {
    label: 'When to start',
    title: 'Recognisable situations',
    items: [
      { title: 'Your website is outdated', text: 'Slow load times, broken links or a design that does not inspire trust. Time for a new site that turns visitors into customers.' },
      { title: 'WordPress or Shopify falls short', text: 'Templates and plugins limit what you can do. Custom builds give full control over design, speed and functionality.' },
      { title: 'Processes run manually', text: 'Orders, bookings or quotes via email and Excel. Custom software automates and provides overview.' },
      { title: 'Many repetitive visitor questions', text: 'Opening hours, prices, availability — an AI chatbot answers them 24/7 based on your own content.' },
    ],
  },

  faq: {
    title: 'Frequently asked questions about services',
    items: [
      {
        q: 'What does a website or webshop cost?',
        a: 'It depends on scope: a brochure site starts from around €2,500, a webshop with order management from around €5,000. After a consultation you receive a proposal with fixed pricing — no surprises afterwards.',
      },
      {
        q: 'How long does a project take?',
        a: 'A brochure site: 4–8 weeks. A webshop or custom software: 8–16 weeks, depending on complexity. You receive a realistic timeline with milestones before we start.',
      },
      {
        q: 'Do you offer maintenance?',
        a: 'Yes. After delivery you can take out a maintenance subscription for updates, security and small adjustments. You are not obliged — but many clients choose it for peace of mind.',
      },
      {
        q: 'WordPress or custom — which is better?',
        a: 'For most SMB businesses in the region, custom delivers better speed, security and flexibility. WordPress can work for simple blogs; for webshops, bookings and integrations, custom is often the better choice.',
      },
      {
        q: 'Can I add an AI chatbot to an existing site?',
        a: 'Yes. A chatbot can be placed as a widget on any website. Ideal as an add-on when you already have a site but want to automate many visitor questions.',
      },
    ],
  },
};

const websites = {
  hero: {
    label: 'Websites & Webshops',
    title: 'Custom websites for businesses in Drenthe and Overijssel',
    description:
      'You want a website that brings in customers, not just looks good. ultimAItech builds professional custom websites and webshops. Based in Wanneperveen — one point of contact, fixed pricing and delivery including documentation.',
  },

  whyCustom: {
    title: 'Why a custom website?',
    text: 'Most websites in the region run on WordPress with a standard theme. That works — until it does not. Slow load times, security issues, plugin conflicts and limited flexibility are common problems.',
    benefits: [
      'Load time under 2 seconds — visitors do not have to wait, Google rewards speed',
      'No plugin dependency — less maintenance, fewer security risks',
      'Full control over design and functionality — your site does exactly what your business needs',
      'Future-proof — scalable without starting over',
    ],
    comparison: {
      customLabel: 'Custom (ultimAItech)',
      otherLabel: 'WordPress (standard)',
      rows: [
        { label: 'Load time', custom: '< 2 seconds', other: '3–6 seconds' },
        { label: 'Security', custom: '7/7 security headers', other: 'Depends on plugins' },
        { label: 'Maintenance', custom: 'Minimal', other: 'Weekly updates needed' },
        { label: 'Uniqueness', custom: '100% custom', other: 'Recognisable template' },
        { label: 'SEO foundation', custom: 'Built in', other: 'Extra plugins required' },
      ],
    },
  },

  capabilities: [
    {
      icon: 'LayoutTemplate',
      title: 'Professional custom website',
      text: 'A fully responsive website that looks great on every device — from smartphone to desktop. Built with clean code, optimised images and a structure Google understands.',
      features: [
        'Responsive design (mobile-first)',
        'SEO-optimised page structure and metadata',
        'Fast hosting with CDN (Cloudflare)',
        'SSL certificate and security headers',
        'Structured data (Schema.org) for rich search results',
        'Accessible according to WCAG guidelines',
        'CMS integration so you can manage content yourself',
      ],
    },
    {
      icon: 'Store',
      title: 'Custom webshop',
      text: 'A webshop that does not just display products but actually sells. Secure checkout, clear stock management and integrations with your accounting.',
      features: [
        'Secure payments with iDEAL, credit card and other methods',
        'Product and stock management',
        'Customer accounts and order history',
        'Integration with accounting packages (Moneybird, e-Boekhouden, Exact)',
        'Automatic shipping labels and track & trace',
      ],
    },
    {
      icon: 'ScanSearch',
      title: 'SEO and visibility',
      text: 'Every website is delivered with a solid SEO foundation. No empty promises — measurable results in Google Search Console.',
      features: [
        'Keyword research for your industry and region',
        'Optimised page titles, meta descriptions and headings',
        'Technical SEO: sitemap, robots.txt, canonical URLs, hreflang',
        'Local SEO: Google Business Profile optimisation, regional keywords',
        'Core Web Vitals optimisation (LCP, FID, CLS)',
      ],
    },
  ],

  audience: {
    title: 'Who is this for?',
    items: [
      'Business owners who need a new website — you are starting out or your current site is outdated',
      'Businesses that want to be more visible — you have a website but customers cannot find you via Google',
      'Webshops that want to sell more — your current shop does not convert or is too slow',
      'Businesses that want independence from WordPress — you want a site you do not have to update every week',
    ],
  },

  process: {
    label: 'Process',
    title: 'From introduction to delivery',
    steps: [
      { icon: 'MessageCircle', title: 'Introduction', text: 'Free consultation about your needs, audience and budget.' },
      { icon: 'FileText', title: 'Fixed-price proposal', text: 'No hourly billing — a clear proposal with milestones.' },
      { icon: 'Palette', title: 'Design', text: 'Wireframes and visual design; you give feedback before any code is written.' },
      { icon: 'Code2', title: 'Build', text: 'Clean, tested code with modern techniques.' },
      { icon: 'Rocket', title: 'Delivery', text: 'Go live with documentation, training and a fixed aftercare period.' },
    ],
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'How much does a custom website cost?',
        a: 'A professional custom website starts from €1,500 for a compact business site (5–7 pages). A webshop or more extensive site with integrations starts from €3,000. You always receive a fixed price upfront — no hidden costs.',
      },
      {
        q: 'How long does it take to build a website?',
        a: 'A standard business website is ready within 3–4 weeks. More complex projects with a webshop or integrations take 6–8 weeks. You receive a concrete timeline with the proposal.',
      },
      {
        q: 'Can I manage my website myself?',
        a: 'Yes. Every website is delivered with a user-friendly CMS so you can edit text, images and pages yourself. Training is included.',
      },
      {
        q: 'Why not WordPress?',
        a: 'WordPress is fine for simple blogs, but for business websites there are better options. A custom site loads faster, is more secure, needs no plugin updates and gives you full control.',
        link: { slug: 'maatwerk-website-vs-wordpress', label: 'Custom website or WordPress — what fits your business?' },
      },
      {
        q: 'Do you also work with businesses outside Drenthe and Overijssel?',
        a: 'My focus is on businesses in Drenthe and Overijssel, but I also work with companies elsewhere in the Netherlands and just across the border in Germany (Lower Saxony). Contact then happens via video calls.',
      },
      {
        q: 'What happens after delivery?',
        a: 'After delivery you receive a fixed aftercare period (usually 30 days). After that you can choose a maintenance contract for updates, monitoring and technical support.',
      },
    ],
  },

  cta: {
    headline: 'Ready to get your website built?',
    text: 'Schedule a free consultation. No sales pitch — just clarity on approach, costs and timeline.',
    button: 'Schedule a consultation',
    secondary: 'View all services',
  },
};

const software = {
  hero: {
    label: 'Custom Software',
    title: 'Custom software — built for your business processes',
    description:
      'Standard software never fits perfectly. ultimAItech builds web applications, integrations and automations for SMEs in Drenthe and Overijssel. No bloated package — software that does exactly what your business needs.',
  },

  whenCustom: {
    title: 'When is custom software the right choice?',
    text: 'Not every business needs custom software. Standard packages like Exact, Moneybird or Shopify are excellent when they fit your workflow. But if you recognise any of these situations, custom is the better choice:',
    items: [
      'You copy data manually between two or more systems',
      'Your workflow does not fit the standard software you use now',
      'You have a unique process that no existing tool covers',
      'You pay for 10 modules but only use 2',
      'You want to connect systems that do not talk to each other by default',
      'Your growing team is stuck on Excel files and shared folders',
    ],
  },

  capabilities: [
    {
      icon: 'AppWindow',
      title: 'Web applications',
      text: 'Complete web applications that work on every device — from stock systems and client portals to planning tools and dashboards.',
      example: 'A timber merchant in Meppel kept orders, stock and customer data in three separate systems. Now everything runs in one web application with automatic synchronisation.',
      features: [
        'Modern, fast interface (React)',
        'User management with roles and permissions',
        'Real-time data and reporting',
        'Responsive design: works on desktop, tablet and phone',
        'Scalable: grows with your business',
      ],
    },
    {
      icon: 'Cable',
      title: 'Integrations',
      text: 'Make your existing systems talk to each other so data automatically ends up in the right place.',
      example: 'A webshop that automatically forwards orders to accounting and the shipping provider — without manual retyping.',
      features: [
        'Integration with accounting packages (Exact, Moneybird, e-Boekhouden)',
        'Stock and order synchronisation',
        'API development and webhooks',
        'One-time data migration or continuous synchronisation',
        'Integration with external platforms (Bol.com, Amazon, Lightspeed)',
      ],
    },
    {
      icon: 'Workflow',
      title: 'Automation',
      text: 'Automate recurring tasks so you and your team focus on work that matters.',
      example: 'A rental business that automatically updates availability, sends confirmation emails and generates a daily overview for planning.',
      features: [
        'Automated workflows (order processing, follow-up, notifications)',
        'Scheduled tasks and reports',
        'Error detection and automatic alerts',
        'Document generation: invoices, quotes, reports',
        'Email and notification flows',
      ],
    },
  ],

  tech: {
    label: 'Technology',
    title: 'Built with modern, proven technology',
    text: 'No exotic frameworks that will not be maintained in two years. Solid choices any developer can pick up.',
    stack: [
      { name: 'React, Next.js, Tailwind CSS', category: 'Frontend' },
      { name: 'Node.js, Python', category: 'Backend' },
      { name: 'PostgreSQL, SQLite', category: 'Database' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Docker, Linux, AWS', category: 'Infrastructure' },
      { name: 'REST, GraphQL, webhooks', category: 'APIs' },
    ],
  },

  process: {
    label: 'Process',
    title: 'From discovery to delivery',
    steps: [
      { icon: 'ClipboardList', title: 'Discovery', text: 'Map your processes, bottlenecks and requirements. Which tasks take too much time now? Where do things go wrong?' },
      { icon: 'FileText', title: 'Functional design', text: 'What should the software do? Screens, workflows and integrations worked out before any code is written.' },
      { icon: 'BadgeEuro', title: 'Fixed price', text: 'A clear proposal with scope, timeline and fixed price. No hourly billing.' },
      { icon: 'Code2', title: 'Build in sprints', text: 'You see progress along the way and give feedback at each milestone.' },
      { icon: 'Rocket', title: 'Delivery', text: 'Go live with documentation, user training and a fixed aftercare period.' },
    ],
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'How much does custom software cost?',
        a: 'That depends on complexity. A simple integration or automation starts from €2,000. A complete web application with user management and integrations starts from €5,000. You always receive a fixed price upfront with a clear scope description.',
      },
      {
        q: 'How long does it take?',
        a: 'A system integration or automation is often ready within 2–4 weeks. A web application takes 6–12 weeks depending on scope. You receive a concrete timeline with the proposal.',
      },
      {
        q: 'Can I keep using my current software?',
        a: 'Usually yes. Custom software does not have to replace your existing tools — it can be the bridge between systems you already use. Most projects are integrations or additions to what is already running.',
      },
      {
        q: 'Who maintains the software after delivery?',
        a: 'After delivery you receive a fixed aftercare period. After that you can choose a maintenance contract for updates, bug fixes and technical support. The code is always yours — you are never locked in.',
      },
      {
        q: 'I am not sure what I need. Can I still get in touch?',
        a: 'Absolutely. Most business owners know their problem but not which technical solution fits best. That is exactly what the introductory call is for — together we determine whether custom is the right approach.',
      },
      {
        q: 'Do you also work with businesses outside the region?',
        a: 'My focus is on Drenthe and Overijssel, but software projects often run largely digitally. For businesses elsewhere in the Netherlands or across the border in Germany I work via video calls.',
      },
    ],
  },

  cta: {
    headline: 'Stuck with your current way of working?',
    text: 'Schedule a free consultation. No sales pitch — just clarity on whether custom is the right solution and what it will cost.',
    button: 'Schedule a consultation',
    secondary: 'View all services',
  },
};

const aiChatbots = {
  hero: {
    label: 'AI & Chatbots',
    title: 'AI chatbot for your website — smart customer service that is always available',
    description:
      'Your customers have questions. An AI chatbot answers the most common ones instantly, 24/7, based on your own content. Built by ultimAItech for SMEs in Drenthe and Overijssel.',
  },

  whatIs: {
    title: 'What is an AI chatbot?',
    text: 'An AI chatbot is a conversational partner on your website that understands visitor questions and answers them based on your own information. Not a fixed decision tree with pre-typed answers, but a smart system that:',
    bullets: [
      'Understands natural language — visitors ask in their own words',
      'Answers based on your content — the chatbot knows your website, products, services and FAQ',
      'Refers when needed — if the chatbot does not know the answer, it directs visitors to the right contact form or phone number',
      'Learns from your feedback — answers improve as you indicate what is right and wrong',
    ],
  },

  benefits: {
    title: 'What does it deliver?',
    items: [
      {
        title: 'Fewer repetitive questions',
        text: 'The average SME website receives 60–80% of the same questions. Opening hours, prices, delivery times, returns. A chatbot catches these so you focus on questions that need personal attention.',
      },
      {
        title: '24/7 availability',
        text: 'Your chatbot does not sleep. Visitors who browse your site in the evening or at weekends get an immediate answer. That is when they decide — not the next business day.',
      },
      {
        title: 'Higher conversion',
        text: 'A visitor who gets an immediate answer is less likely to leave. Research shows websites with a chatbot generate 20–30% more leads than sites without.',
      },
      {
        title: 'Insight into customer questions',
        text: 'Every question the chatbot receives is logged. After a month you know exactly what your visitors ask — and can adjust your website, FAQ or offering accordingly.',
      },
    ],
  },

  examples: {
    title: 'Real-world examples',
    items: [
      {
        title: 'Boat rental',
        text: 'A rental business near Giethoorn gets the same questions daily: "Do I need a boating licence?", "How much is an electric boat per hour?", "Are boats available on Saturday?" The chatbot answers directly with current information from the booking system.',
      },
      {
        title: 'Timber merchant',
        text: 'A timber merchant in Meppel gets questions about wood types, dimensions, delivery times and opening hours. The chatbot knows the product catalogue and can answer specific questions: "Do you have oak planks 3 metres long?" → answer with price and stock status.',
      },
      {
        title: 'Web design agency',
        text: 'A web designer gets questions about costs, timeline and what is involved in a website. The chatbot answers exploratory questions and schedules an introductory call when the visitor wants to go further.',
      },
    ],
  },

  flow: {
    label: 'How it works',
    title: 'From content to live chatbot',
    steps: [
      { icon: 'ScanSearch', title: 'Collect content', text: 'I analyse your website, FAQ, price lists and other documentation. This becomes the knowledge base of your chatbot.' },
      { icon: 'Bot', title: 'Build and train', text: 'The chatbot is configured with your content, branding and tone of voice. You decide how the bot behaves: formal or informal, detailed or concise.' },
      { icon: 'ListChecks', title: 'Test and refine', text: 'Before the chatbot goes live, we test together with realistic questions. Answers that are wrong are corrected.' },
      { icon: 'LayoutDashboard', title: 'Live and monitor', text: 'The chatbot goes live on your website. You get access to a dashboard with all conversations so you can see which questions are asked and how the bot performs.' },
    ],
  },

  tech: {
    title: 'Technical details',
    rows: [
      { aspect: 'AI model', spec: 'GPT-4 or equivalent (state-of-the-art)' },
      { aspect: 'Knowledge base', spec: 'Your website, documents, FAQ, product data' },
      { aspect: 'Languages', spec: 'Dutch, German, English' },
      { aspect: 'Integration', spec: 'Widget on your website, optional WhatsApp/email' },
      { aspect: 'Privacy', spec: 'Data is not used for AI training. GDPR-compliant' },
      { aspect: 'Hosting', spec: 'EU servers, no data outside Europe' },
    ],
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'How much does an AI chatbot cost?',
        a: 'A basic chatbot based on your website content starts from €750 one-off + €50/month for hosting and AI costs. More advanced chatbots with connections to booking systems, product catalogues or CRM start from €2,000.',
      },
      {
        q: 'Can the chatbot give wrong answers?',
        a: 'The chatbot answers exclusively based on your own content. If the information is not available, the bot honestly says it does not know and refers to personal contact. Hallucinations are minimised by limiting the knowledge base.',
      },
      {
        q: 'Do I need technical knowledge?',
        a: 'No. I build, configure and maintain the chatbot for you. When your content changes (new products, updated prices), I update the knowledge base.',
      },
      {
        q: 'Which languages does the chatbot support?',
        a: 'The chatbot supports Dutch, German and English. Ideal for businesses in the border region that also serve German customers.',
      },
      {
        q: 'Does a chatbot replace my customer service?',
        a: 'No, a chatbot is a supplement. It catches frequently asked questions so you and your team focus on complex questions and personal contact. The chatbot refers when human attention is needed.',
      },
      {
        q: 'What about privacy (GDPR)?',
        a: 'Conversations are processed on EU servers. Personal data is not stored unless the visitor gives consent (e.g. when leaving an email address). The chatbot complies with GDPR.',
      },
    ],
  },

  cta: {
    headline: 'Want to know what a chatbot could mean for your business?',
    text: 'Schedule a free consultation. I will show you how a chatbot would look on your website and which questions it can answer.',
    button: 'Schedule a consultation',
    secondary: 'Back to services',
  },
};

const projects = {
  hero: {
    label: 'Work',
    title: 'Work you can judge for yourself',
    description:
      'Real projects, publicly accessible. No anonymous testimonials or vague claims — concrete work you can inspect yourself, including projects where an outdated site or template was replaced with bespoke design and tooling.',
  },

  intro: {
    title: 'Open portfolio, no empty promises',
    text: 'Every case study on this page is live and inspectable — from boat rental with booking flow to timber trade with custom webshop and sheet piling after a Shopify template. You see not only the end result, but also the challenge (outdated site, WordPress builder, template limitations) and the approach. That is intentional: businesses in Drenthe and Overijssel deserve insight into what a project actually involves before making a decision. Click a project for the full case study, or schedule a consultation if you want to discuss similar work for your business.',
  },

  caseStudyUi: {
    challengeTitle: 'The challenge',
    solutionTitle: 'The solution',
    deliverablesTitle: 'Key deliverables',
    ctaLive: 'View live site',
    ctaFullCase: 'View full use case',
    backToProjects: 'Back to work',
  },

  cases: [
    {
      label: 'Leisure & bookings',
      title: 'Nijenhuis Botenverhuur',
      subtitle: 'From an outdated site to a clear booking journey — plus a blog for content and discoverability.',
      description:
        'The previous website looked dated, had broken links and no clear structure. It was replaced with a modern, booking-led site for a family business in Wanneperveen: boat rental near Giethoorn and Nationaal Park Weerribben-Wieden, with clear paths to holiday home, marina and camping. A blog was added as well: practical articles about the boating area, season and tips — so the site can grow with fresh content and stay visible in local search.',
      situation: '',
      slug: 'nijenhuis-botenverhuur',
      seoTitle: 'Case study: Nijenhuis Botenverhuur — ultimAItech',
      seoDescription:
        'From a dated site to a booking-led experience and blog for boat rental near Giethoorn and Weerribben-Wieden. Challenge, solution and deliverables.',
      image: '/assets/images/usecases/nijenhuis-usecase.jpeg',
      imageAlt: 'Screenshot of the nijenhuis-botenverhuur.com website',
      highlights: [
        'Homepage with booking widget and a clear customer journey',
        'Boat categories with pricing, availability and motor options',
        'Destination pages for Giethoorn, Belt-Schutsloot and Wanneperveen',
        'Blog for regional content, seasonal tips and SEO',
        'Cross-sell for holiday home, camping and marina',
      ],
      challenge: {
        intro:
          'The legacy site no longer supported the business: visitors struggled to find what they needed, and the experience did not feel trustworthy for a holiday on the water.',
        points: [
          'Outdated, inconsistent visual identity and weak mobile polish.',
          'Broken links and unclear navigation to boat types and booking.',
          'No clear booking flow: too many manual questions and phone calls.',
          'Limited room for regional content and off-season discoverability.',
        ],
      },
      solution: {
        intro:
          'A new, fast site with a clear customer journey: from orientation to boat choice, date and checkout — supported by a blog for Giethoorn and the surrounding area.',
        points: [
          'Homepage with booking widget and clear steps for guests.',
          'Boat categories with pricing, availability and motor options.',
          'Destination pages for Giethoorn, Belt-Schutsloot and Wanneperveen.',
          'Blog for season, tips and SEO; cross-sell to house, camping and marina.',
        ],
      },
      deliverables: [
        { icon: 'LayoutGrid', title: 'Homepage with booking widget and a clear customer journey' },
        { icon: 'Ship', title: 'Boat categories with pricing, availability and motor options' },
        { icon: 'ScanSearch', title: 'SEO and regional landing pages for the boating area' },
        { icon: 'ShoppingCart', title: 'Cross-sell paths to holiday home, camping and marina' },
      ],
      detailBlocks: [
        {
          title: 'Context',
          body: 'Nijenhuis Botenverhuur is a family business in Wanneperveen, active around Giethoorn and Weerribben-Wieden National Park. The old site had grown organically: scattered information, partly manual bookings — in tourism, the first online impression has to feel reliable.',
        },
        {
          title: 'Approach & outcome',
          body: 'We rebuilt information architecture around the main conversion: completing a reservation. Destination pages and blog posts keep the site visible outside peak season. Live at nijenhuis-botenverhuur.com.',
        },
      ],
      facts: [
        {
          title: 'Business type',
          text: 'Family-run boat rental with holiday home, camping and marina in Wanneperveen near Giethoorn.',
        },
        {
          title: 'Bookings & content',
          text: 'Direct booking flow with date selection, boat type and cart — plus a blog for visibility and trust with new guests.',
        },
        {
          title: 'Region',
          text: 'Pages and messaging focused on Giethoorn, Weerribben-Wieden and surrounding villages.',
        },
      ],
      ctaVisit: 'Visit the website',
      ctaAsk: 'Discuss a similar project',
      externalUrl: 'https://nijenhuis-botenverhuur.com',
    },
    {
      label: 'Timber trade & shop',
      title: 'Houthandel Jan Sok',
      subtitle: 'From WordPress + page builder to bespoke web design with a custom shop and order management.',
      description:
        'The old setup was WordPress with a generic site builder: a basic layout without a strong professional structure and limited room for a serious online shop. That was fully replaced with custom design and a tailor-made webshop. Orders no longer sit inside a rigid template — they run through an order-management layer aligned with how Jan Sok works, from enquiry to fulfilment.',
      situation:
        'Starting point: WordPress with a standard builder — weak hierarchy, limited polish and no coherent foundation for a growing timber business selling online.',
      slug: 'houthandel-jan-sok',
      seoTitle: 'Case study: Houthandel Jan Sok — ultimAItech',
      seoDescription:
        'From WordPress builder to bespoke webshop and order management for a timber merchant. Challenge, solution and deliverables.',
      image: '/assets/images/usecases/houthandel-jan-sok-usecase.jpeg',
      imageAlt: 'Screenshot of the houthandeljansok.nl website',
      highlights: [
        'Fully custom web design — no template, strong brand and clarity',
        'Bespoke shop structure aligned with products and customers',
        'Dedicated order management with visibility on status and next steps',
        'Clear, scalable IA instead of a page-builder layout',
      ],
      challenge: {
        intro:
          'The site had to earn trust with consumers and contractors alike, and support serious online timber sales — including sizing and logistics.',
        points: [
          'WordPress with a visual builder: limited brand expression and layout freedom.',
          'No robust e-commerce foundation for catalogue and checkout at scale.',
          'Order status and follow-up were not transparent for customers and staff.',
          'Little room for a clear product hierarchy (species, lengths, use cases).',
        ],
      },
      solution: {
        intro:
          'Bespoke front end and shop: product structure and order management aligned with how Jan Sok actually works, with a calm, professional look.',
        points: [
          'Custom web design without templates — brand, hierarchy and overview first.',
          'Tailor-made shop logic suited to timber assortments and customer types.',
          'Dedicated order management with clear status, delivery and next actions.',
          'Scalable structure: ready to grow without hitting template walls again.',
        ],
      },
      deliverables: [
        { icon: 'Palette', title: 'Fully bespoke web design and brand-led layout' },
        { icon: 'ShoppingCart', title: 'Webshop with product structure aligned to the catalogue' },
        { icon: 'Layers', title: 'Order management and traceability from enquiry to delivery' },
        { icon: 'LayoutGrid', title: 'Scalable site structure instead of page-builder blocks' },
      ],
      detailBlocks: [
        {
          title: 'Context',
          body: 'Jan Sok supplies timber and building materials to a mix of retail and trade customers. The old site felt like a builder project with limited shop logic: complex product choices and lead times were hard to explain.',
        },
        {
          title: 'Approach & outcome',
          body: 'We restarted with information architecture and checkout: which steps customers see, how custom sizes and stock are communicated, and how orders stay traceable internally. Live at houthandeljansok.nl.',
        },
      ],
      facts: [
        {
          title: 'Challenge',
          text: 'Legacy WordPress site with a site builder: limited professionalism and no robust e-commerce foundation.',
        },
        {
          title: 'Approach',
          text: 'New site and shop built from the ground up, with bespoke front end and back end for catalogue, orders and internal flow.',
        },
        {
          title: 'Outcome',
          text: 'One coherent channel: professional presentation and practical order handling in a single system.',
        },
      ],
      ctaVisit: 'Visit the website',
      ctaAsk: 'Discuss a similar engagement',
      externalUrl: 'https://houthandeljansok.nl',
    },
    {
      label: 'Sheet piling & projects',
      title: 'WAL Beschoeiing',
      subtitle: 'From a Shopify template shop to bespoke design with order management for project-led sales.',
      description:
        'The previous site was a Shopify store on a standard theme: little differentiation, limited layout freedom and no real fit for how sheet-piling projects unfold — often bespoke, planned work with follow-up steps. The new solution centres on custom web design with a shop and order flow tuned to projects: visitors understand what WAL delivers, and internally orders stay traceable outside generic Shopify constraints.',
      situation:
        'Starting point: Shopify with a template build — quick to launch, but limited flexibility for a specialist contractor.',
      slug: 'wal-beschoeiing',
      seoTitle: 'Case study: WAL Beschoeiing — ultimAItech',
      seoDescription:
        'From Shopify template to bespoke webshop and project-led order management for sheet piling. Challenge, solution and deliverables.',
      image: '/assets/images/usecases/wal-beschoeiing-usecase.jpeg',
      imageAlt: 'Screenshot of the wal-beschoeiing.nl website',
      highlights: [
        'Bespoke web design instead of a generic shop template',
        'Shop and pages shaped around project-led sheet-piling work',
        'Dedicated order management beyond template limitations',
        'Professional structure for services, process and conversion',
      ],
      challenge: {
        intro:
          'Shopify on a standard theme was fast to ship, but it did not tell the story of project-led sheet piling: quotes, planning and aftercare needed a bespoke flow outside theme rails.',
        points: [
          'Limited differentiation and constrained page composition.',
          'Generic shop journey: hard to connect services, methodology and reference work.',
          'Order path not shaped for follow-up after the first enquiry.',
          'Internally: weak control over bespoke jobs versus standard lines.',
        ],
      },
      solution: {
        intro:
          'Custom design and shop flow: pages and order management that reflect project-shaped sheet piling, with a professional front for contractors and public-sector buyers.',
        points: [
          'Bespoke web design instead of a generic shop template.',
          'Shop and landing pages that explain sheet piling and how WAL works.',
          'Dedicated order management without the old template constraints.',
          'Conversion-led structure: services, trust and clear next steps.',
        ],
      },
      deliverables: [
        { icon: 'Palette', title: 'Bespoke web design and brand-led presentation' },
        { icon: 'Layers', title: 'Shop and pages for project-led sheet piling' },
        { icon: 'ShoppingCart', title: 'Order management tuned to enquiries and follow-up' },
        { icon: 'Building2', title: 'Professional structure for services and audience' },
      ],
      detailBlocks: [
        {
          title: 'Context',
          body: 'WAL focuses on sheet piling and groundworks for clients who care about quality and planning. The previous Shopify setup worked commercially but under-told the project and expertise narrative.',
        },
        {
          title: 'Approach & outcome',
          body: 'We restructured around clear services, proof points and an order flow that fits quote-led work. Live at wal-beschoeiing.nl.',
        },
      ],
      facts: [
        {
          title: 'Challenge',
          text: 'Shopify on a template: quick to launch, but little room for bespoke project flows and a clear process story.',
        },
        {
          title: 'Approach',
          text: 'Custom design and shop flow aligned with sheet piling, enquiries and follow-up — not constrained by theme rails.',
        },
        {
          title: 'Outcome',
          text: 'A professional front and a practical order path for project-shaped work.',
        },
      ],
      ctaVisit: 'Visit the website',
      ctaAsk: 'Discuss a similar engagement',
      externalUrl: 'https://wal-beschoeiing.nl',
    },
  ],

  cta: {
    headline: 'Want similar work for your business?',
    text: 'Discuss what a comparable project would look like for your situation — scope, approach and expected results.',
    button: 'Schedule a consultation',
    secondary: 'View services',
  },
};

const about = {
  hero: {
    label: 'About ultimAItech',
    title: 'Personal, skilled and always reachable',
    description:
      'ultimAItech was founded in Wanneperveen, Overijssel. As an independent developer, I build websites and custom software for businesses in Drenthe, Overijssel and the Lower Saxony border region — with personal contact, fixed agreements and a portfolio you can assess yourself.',
  },

  story: {
    title: 'One point of contact, no detours',
    text: 'When you work with ultimAItech, you work directly with me. No intermediaries, no unclear responsibilities, no changing contact persons. I take your project from start to finish — from the first conversation to delivery and aftercare. My focus is on businesses in Drenthe, Overijssel and the border region that need a reliable partner for websites, webshops and custom software. Projects like Nijenhuis Botenverhuur, Houthandel Jan Sok and WAL Beschoeiing show what is concretely possible: from booking platforms to webshops with order management.',
    values: [
      'Transparent communication at every step — you always know where you stand',
      'Fixed pricing agreements without surprises — scope and costs are set upfront',
      'Documentation and handover so you are not dependent on one person',
      'Available for questions, even after delivery — with aftercare and support',
    ],
  },

  expertise: {
    label: 'Expertise',
    title: 'What I build',
    text: 'I work with modern web technology: fast, secure websites and web applications that scale with your business. No WordPress templates or Shopify limitations — everything custom, aligned with your processes and brand.',
    items: [
      { title: 'Websites & webshops', text: 'Brochure sites, webshops, destination pages and landing pages. Fast, discoverable and focused on conversion.' },
      { title: 'Custom software', text: 'Order management, booking systems, integrations and internal dashboards for processes standard software does not cover.' },
      { title: 'AI chatbots', text: 'Chatbots based on your own content, in Dutch, German and English — as an add-on to website or software.' },
      { title: 'Migrations', text: 'From WordPress, Shopify or outdated sites to custom builds — without losing functionality.' },
    ],
  },

  region: {
    label: 'Region',
    title: 'Service area',
    text: 'Based in Wanneperveen, active throughout Drenthe and Overijssel. Personal contact and short lines of communication — also for businesses in the Lower Saxony border region, with German-language websites and chatbots.',
    areas: ['Drenthe', 'Overijssel', 'Lower Saxony border region'],
  },

  business: {
    title: 'Business details',
    name: 'ultimAItech',
    location: 'Wanneperveen, Overijssel',
    kvk: '98782800',
    btw: 'NL576150447B01',
    email: 'info@ultimaitech.com',
    areas: ['Drenthe', 'Overijssel', 'Lower Saxony border region'],
  },

  howIWork: {
    label: 'Process',
    title: 'How I work',
    steps: [
      { title: 'Listen', text: 'First understand what you need and why, before making a proposal. No standard packages — every situation is different.' },
      { title: 'Clear proposal', text: 'A concrete proposal with fixed pricing, planning and clear agreements. You know exactly what will be built and when.' },
      { title: 'Build with feedback', text: 'You see interim results and give feedback at every milestone. No surprises at the end of the project.' },
      { title: 'Deliver and support', text: 'Delivery with documentation and a fixed support period. You can get started right away.' },
    ],
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Why a solo developer instead of an agency?',
        a: 'You always speak with the same person, from intake to aftercare. No account managers or changing teams. That means faster decisions, lower costs and direct accountability.',
      },
      {
        q: 'Do you work with fixed pricing?',
        a: 'Yes. After a consultation you receive a proposal with fixed pricing for the agreed scope. No hourly billing and no surprises afterwards.',
      },
      {
        q: 'What happens after delivery?',
        a: 'You receive documentation and training. Optionally you can take out a maintenance subscription. I remain available for questions and small adjustments.',
      },
      {
        q: 'Which languages do you work in?',
        a: 'Dutch, German and English — for websites, chatbots and communication. Ideal for businesses in the border region that also serve German customers.',
      },
      {
        q: 'Do I need to visit or can it be remote?',
        a: 'Both. Consultations can be online or at your location in Drenthe/Overijssel. The build is largely digital, with interim demos and feedback moments.',
      },
    ],
  },

  cta: {
    headline: 'Want to know what I can do for you?',
    text: 'Schedule a free consultation. No obligations — just immediate clarity about what is possible.',
    button: 'Schedule a consultation',
    secondary: 'View projects',
  },
};

const contact = {
  hero: {
    label: 'Contact',
    title: 'Get in touch',
    description:
      'A question about a website, webshop, software or AI chatbot? Send a message or schedule a free consultation directly. I respond within one working day — personal, no sales pitch. Based in Wanneperveen, active in Drenthe, Overijssel and the border region.',
  },

  process: {
    label: 'What happens next',
    title: 'From message to conversation',
    steps: [
      { title: 'You send a message', text: 'Via the form below. Briefly describe what you have in mind — website, webshop, software or chatbot.' },
      { title: 'I respond within one working day', text: 'With a short reply and possibly a proposal for a consultation — online or at your location.' },
      { title: 'Free consultation', text: 'We discuss your needs, goals and budget. No obligations — but immediate clarity on what is feasible.' },
      { title: 'Proposal with fixed pricing', text: 'If we want to proceed, you receive a concrete proposal with scope, timeline and fixed pricing.' },
    ],
  },

  topics: {
    label: 'Topics',
    title: 'What you can contact me about',
    items: [
      { title: 'New website or webshop', text: 'From brochure site to full webshop with order management. Custom builds instead of templates.' },
      { title: 'Custom software', text: 'Order management, bookings, integrations or internal tools that streamline your processes.' },
      { title: 'AI chatbot', text: 'A chatbot on your website that answers questions based on your own content — available 24/7.' },
      { title: 'Renewal or migration', text: 'From WordPress, Shopify or an outdated site to a fast, secure custom solution.' },
      { title: 'Advice or second opinion', text: 'Not sure what you need? A short conversation can already provide a lot of clarity.' },
    ],
  },

  region: {
    label: 'Region',
    title: 'Service area',
    text: 'ultimAItech is based in Wanneperveen and works for businesses throughout Drenthe and Overijssel — from Meppel and Zwolle to Assen. Consultations can be online or at your location; many clients value a personal conversation before starting a project. Also available for businesses in Lower Saxony, with communication in German.',
    areas: ['Drenthe', 'Overijssel', 'Lower Saxony border region'],
    mapTitle: 'Location',
  },

  form: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email address',
    emailPlaceholder: 'your@email.com',
    companyLabel: 'Company name (optional)',
    companyPlaceholder: 'Your company',
    intentLabel: 'How can I help you?',
    intentOptions: [
      { value: 'website', label: 'Website or webshop' },
      { value: 'software', label: 'Custom software' },
      { value: 'ai-chatbot', label: 'AI chatbot' },
      { value: 'redesign', label: 'Renewal or migration' },
      { value: 'other', label: 'Other / advice' },
    ],
    messageLabel: 'Your message',
    messagePlaceholder: 'Briefly describe what you have in mind...',
    submit: 'Send message',
    successTitle: 'Message sent!',
    successText: 'Thank you for your message. I will get back to you as soon as possible, usually within one working day.',
  },

  info: {
    title: 'Direct contact',
    email: 'info@ultimaitech.com',
    location: 'Wanneperveen, Overijssel',
    availability: 'Monday to Friday, 09:00 – 17:00 CET',
    locationLabel: 'Location',
    availabilityLabel: 'Availability',
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'How quickly do you respond?',
        a: 'Within one working day, usually the same day. For urgent questions you can also email info@ultimaitech.com directly.',
      },
      {
        q: 'Will I get a price indication right away?',
        a: 'After a short conversation I can give a range. A concrete proposal with fixed pricing follows after a consultation where we discuss scope and requirements.',
      },
      {
        q: 'How does a consultation work?',
        a: 'About 30–45 minutes, online or at your location. We discuss your situation, goals and budget. No obligations — but immediate clarity.',
      },
      {
        q: 'Do you also work in German or Dutch?',
        a: 'Yes. Communication, websites and chatbots can be in Dutch, German and English. Ideal for the border region.',
      },
      {
        q: 'I already have a website — can I still get in touch?',
        a: 'Certainly. Many clients come for renewal, migration from WordPress/Shopify, or a chatbot as an add-on. Describe your situation in the form.',
      },
      {
        q: 'Is a first conversation really free?',
        a: 'Yes. A consultation costs you nothing and obliges you to nothing. The goal is to understand whether and how I can help — with honest advice, even if that means custom work is not (yet) needed.',
      },
    ],
  },
};

const blog = {
  hero: {
    label: 'Blog',
    title: 'News & insights',
    description:
      'Articles on web development, custom software, local SEO and AI chatbots — from practice for businesses in Drenthe, Overijssel and the border region. Practical tips on costs, choices and discoverability. No sales pitches.',
  },

  intro: {
    title: 'Sharing knowledge from practice',
    text: 'On this blog I share insights from projects and daily practice as a website and software developer in Wanneperveen. You will read about topics that directly affect SMB businesses in Drenthe and Overijssel: what does a website cost, when do you choose custom over WordPress, how do you improve discoverability in the region, and when is an AI chatbot useful? The articles are written to help you make better decisions — whether you work with me or another provider. Many pieces cover concrete situations: a webshop stuck on templates, a site no longer found in Google, or processes that stay manual while automation would save time. New articles appear regularly; feel free to return or get in touch if you miss a topic.',
  },

  topics: {
    label: 'Topics',
    title: 'What we write about',
    items: [
      { title: 'Websites & webshops', text: 'Costs, choices between custom and WordPress, speed, security and when a new site is needed. Including comparisons and realistic price indications for SMB in the region.' },
      { title: 'Local SEO', text: 'Being found in Drenthe and Overijssel — Google Business Profile, regional content, destination pages and common mistakes businesses make.' },
      { title: 'Software & automation', text: 'When standard software falls short and custom pays off — order management, integrations, internal tools and return on investment.' },
      { title: 'AI & chatbots', text: 'Practical applications for SMB — what a chatbot can do, what it costs, privacy (GDPR) and when it makes sense as an add-on.' },
    ],
  },

  whyRead: {
    title: 'Why this blog?',
    text: 'The internet is full of generic tips that have little to do with a timber trade in Overijssel or a recreation business near Giethoorn. These articles are written from projects in the region: what works, what does not, and which choices business owners later regret. No clickbait — honest advice. Looking for a partner to build? View services and projects — or get in touch for a free consultation.',
  },

  faq: {
    title: 'Frequently asked questions about the blog',
    items: [
      {
        q: 'Who are these articles written for?',
        a: 'For business owners and SMB in Drenthe, Overijssel and the border region considering a website, webshop or software. The tips are practical and applicable regardless of who you ultimately work with.',
      },
      {
        q: 'How often are new articles published?',
        a: 'Regularly, depending on available time after client projects. The focus is on quality and relevance, not a fixed publishing schedule.',
      },
      {
        q: 'Can I suggest a topic?',
        a: 'Yes. Send a message via the contact form if you miss a specific topic. I will check if it fits the audience and schedule it where possible.',
      },
      {
        q: 'Are articles also available in Dutch and German?',
        a: 'The blog is available in Dutch, German and English. Each article has a translation on the corresponding language version of the site.',
      },
      {
        q: 'Can I quote or share the articles?',
        a: 'Yes, with attribution (ultimAItech and link to the article). The content is meant to share knowledge with businesses in the region.',
      },
    ],
  },

  readMore: 'Read more',
  noPosts: 'No articles available yet.',
};

const privacy = {
  title: 'Privacy Policy',
  lastUpdated: 'Last updated: May 2026',
  intro: 'ultimAItech, based in Wanneperveen (Overijssel), is responsible for processing personal data as described in this privacy policy. We respect your privacy and process personal data in accordance with the General Data Protection Regulation (GDPR). This policy describes what data we collect, why, how long we retain it and what rights you have.',
  sections: [
    {
      title: 'What data do we collect?',
      text: 'When you fill in our contact form, we collect your name, email address, optionally your company name and the content of your message. If you select an intent (website, software, chatbot), we store that choice. We use this data exclusively to respond to your enquiry or prepare a quote. We do not collect data via marketing cookies or behavioural tracking on this website.',
    },
    {
      title: 'How do we use your data?',
      text: 'Your data is only used for the purpose for which you provided it: responding to your enquiry, preparing a quote or having a conversation about a possible project. We do not use your data for unsolicited marketing. We do not share your data with third parties except when necessary for service delivery (e.g. form processing via FormSubmit) or when required by law.',
    },
    {
      title: 'Legal basis',
      text: 'We process your personal data based on your consent (when you fill in the contact form) and on legitimate interest (when we maintain contact with you about an ongoing or completed assignment). For quotes and agreements we process data for the performance or preparation of a contract.',
    },
    {
      title: 'Retention period',
      text: 'We do not retain your data longer than necessary for the purpose for which it was collected. Contact form data is retained for a maximum of two years after the last contact, unless a longer retention period is needed for an ongoing or completed assignment (e.g. invoicing or warranty). Data is then deleted or anonymised.',
    },
    {
      title: 'Your rights',
      text: 'You have the right to access, correct, delete, restrict processing, data portability and object to processing of your personal data. You may also lodge a complaint with the supervisory authority. Contact info@ultimaitech.com to exercise your rights. We respond within one month.',
    },
    {
      title: 'Cookies',
      text: 'This website does not place marketing or behavioural tracking cookies. Hosting and form delivery (FormSubmit) may process technical logs required to provide the service, such as IP address and time of submission. If optional analytics are enabled later, this policy will be updated and you will be informed.',
    },
    {
      title: 'Security',
      text: 'We take appropriate technical and organisational measures to protect your personal data against unauthorised access, loss or misuse. Communication via the contact form uses a secure connection (HTTPS). Form data is processed by our form provider; we have no control over their security measures but choose reliable providers.',
    },
    {
      title: 'Changes',
      text: 'We may update this privacy policy when our services or legislation change. The date of the last update is at the top of this page. For substantial changes we will inform you where possible.',
    },
    {
      title: 'Contact',
      text: 'Do you have questions about this privacy policy or the processing of your personal data? Contact us at info@ultimaitech.com or via the contact form on this website. Data controller: ultimAItech, Wanneperveen, Overijssel, KVK 98782800.',
    },
  ],
};

const terms = {
  title: 'Terms and Conditions',
  lastUpdated: 'Last updated: May 2026',
  intro: 'These terms and conditions apply to all services provided by ultimAItech, based in Wanneperveen, Overijssel (KVK 98782800). By accepting a quote or entering into an agreement, you agree to these terms. Deviations are only valid if agreed in writing.',
  sections: [
    {
      title: 'Definitions',
      text: 'In these terms: Contractor: ultimAItech, the independent website and software developer. Client: the natural or legal person entering into an agreement with ultimAItech. Work: the websites, software, chatbots or other services to be delivered by ultimAItech as described in the quote.',
    },
    {
      title: 'Quotes and agreements',
      text: 'All quotes are non-binding and valid for 30 days unless otherwise stated. An agreement is established upon written acceptance of the quote by the client (email is sufficient). The quote and any attachments form part of the agreement. Changes in scope or timeline are recorded in writing and may affect price and planning.',
    },
    {
      title: 'Execution',
      text: 'ultimAItech will perform the work to the best of its ability with due care. Delivery takes place according to the schedule set out in the quote. The client provides required information, content and feedback in a timely manner. Delays caused by late delivery from the client may shift the timeline.',
    },
    {
      title: 'Payment',
      text: 'Payment is made in accordance with the payment arrangement stated in the quote, unless otherwise agreed in writing. The standard payment term is 14 days from the invoice date. In case of late payment the client is automatically in default and statutory interest is due. ultimAItech reserves the right to suspend work in case of payment arrears.',
    },
    {
      title: 'Intellectual property',
      text: 'After full payment, ownership of the delivered work (code, design, content structure) transfers to the client, unless otherwise agreed. Open-source components used remain under their own licences. ultimAItech retains the right to include the work in its portfolio and references unless the client excludes this in writing.',
    },
    {
      title: 'Warranty & acceptance',
      text: 'ultimAItech delivers work that meets the specifications described in the quote. After delivery the client has 14 days to report defects that deviate from the agreed scope. Minor corrections within scope are performed at no charge. Warranty on the work applies for the period stated in the quote, typically 30 days after delivery for bug fixes.',
    },
    {
      title: 'Liability',
      text: 'The liability of ultimAItech is limited to the amount charged for the relevant assignment, with a maximum of the invoice amount for that assignment. ultimAItech is not liable for indirect damage, consequential damage, lost profits or data loss, except in case of intent or gross negligence.',
    },
    {
      title: 'Cancellation',
      text: 'The client may cancel an ongoing assignment in writing. Work already delivered and hours worked are invoiced according to the quote. If the client cancels before start, a cancellation fee may apply as stated in the quote. ultimAItech may terminate the agreement in case of non-performance by the client, after written notice.',
    },
    {
      title: 'Confidentiality',
      text: 'Both parties treat confidential information received in the context of the assignment as secret. This obligation continues after termination of the agreement. ultimAItech processes personal data in accordance with the privacy policy and GDPR.',
    },
    {
      title: 'Applicable law',
      text: 'Dutch law applies to all agreements. Disputes will be submitted to the competent court in the district of Overijssel. Parties will first attempt to resolve a dispute by mutual agreement.',
    },
  ],
};

const dictionary = { locale, slugs, nav, footer, home, services, websites, software, aiChatbots, projects, about, blog, contact, privacy, terms };

export type Dictionary = typeof dictionary;

export default dictionary;
