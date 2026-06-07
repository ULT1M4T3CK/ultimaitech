/**
 * Dynamic sitemap generation with NL/DE/EN hreflang alternates + blog posts.
 */
const fs = require('fs');
const path = require('path');
const { query } = require('../db');

const SITE_URL = process.env.SITE_URL || 'https://ultimaitech.com';

const ROUTE_SLUGS = {
  home: { nl: '/', de: '/de/', en: '/en/', changefreq: 'monthly', priority: '1.0' },
  services: { nl: '/diensten/', de: '/de/leistungen/', en: '/en/services/', changefreq: 'monthly', priority: '0.9' },
  websites: { nl: '/diensten/websites/', de: '/de/leistungen/websites/', en: '/en/services/websites/', changefreq: 'monthly', priority: '0.9' },
  software: { nl: '/diensten/software/', de: '/de/leistungen/software/', en: '/en/services/software/', changefreq: 'monthly', priority: '0.9' },
  aiChatbots: { nl: '/diensten/ai-chatbots/', de: '/de/leistungen/ki-chatbots/', en: '/en/services/ai-chatbots/', changefreq: 'monthly', priority: '0.8' },
  projects: { nl: '/projecten/', de: '/de/projekte/', en: '/en/work/', changefreq: 'monthly', priority: '0.8' },
  about: { nl: '/over/', de: '/de/ueber/', en: '/en/about/', changefreq: 'monthly', priority: '0.8' },
  blog: { nl: '/blog/', de: '/de/blog/', en: '/en/blog/', changefreq: 'weekly', priority: '0.9' },
  contact: { nl: '/contact/', de: '/de/kontakt/', en: '/en/contact/', changefreq: 'monthly', priority: '0.8' },
  privacy: { nl: '/privacy/', de: '/de/datenschutz/', en: '/en/privacy/', changefreq: 'monthly', priority: '0.3' },
  terms: { nl: '/voorwaarden/', de: '/de/agb/', en: '/en/terms/', changefreq: 'monthly', priority: '0.3' },
};

const PROJECT_CASE_BASE = {
  nl: '/projecten/',
  de: '/de/projekte/',
  en: '/en/work/',
};

const BLOG_BASE = {
  nl: '/blog/',
  de: '/de/blog/',
  en: '/en/blog/',
};

const CASE_SLUGS = ['nijenhuis-botenverhuur', 'houthandel-jan-sok', 'wal-beschoeiing'];

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function hreflangAlternates(pathByLocale) {
  const lines = ['nl', 'de', 'en'].map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(SITE_URL + pathByLocale[l])}" />`
  );
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(SITE_URL + pathByLocale.nl)}" />`);
  return lines.join('\n');
}

function urlEntry(loc, changefreq, priority, alternates, lastmod = null) {
  let xml = `  <url>
    <loc>${escapeXml(loc)}</loc>`;
  if (lastmod) xml += `\n    <lastmod>${lastmod}</lastmod>`;
  xml += `\n    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
  </url>`;
  return xml;
}

function staticSitemapXml() {
  const staticPath = path.resolve(__dirname, '../../../public/sitemap.xml');
  if (fs.existsSync(staticPath)) {
    return fs.readFileSync(staticPath, 'utf8');
  }
  return null;
}

async function sitemapHandler(_req, res, next) {
  try {
    const urls = [];

    for (const route of Object.values(ROUTE_SLUGS)) {
      for (const locale of ['nl', 'de', 'en']) {
        const pathByLocale = { nl: route.nl, de: route.de, en: route.en };
        urls.push(
          urlEntry(
            `${SITE_URL}${route[locale]}`,
            route.changefreq,
            route.priority,
            hreflangAlternates(pathByLocale)
          )
        );
      }
    }

    for (const slug of CASE_SLUGS) {
      for (const locale of ['nl', 'de', 'en']) {
        const pathByLocale = {
          nl: `${PROJECT_CASE_BASE.nl}${slug}/`,
          de: `${PROJECT_CASE_BASE.de}${slug}/`,
          en: `${PROJECT_CASE_BASE.en}${slug}/`,
        };
        urls.push(
          urlEntry(
            `${SITE_URL}${pathByLocale[locale]}`,
            'monthly',
            '0.75',
            hreflangAlternates(pathByLocale)
          )
        );
      }
    }

    const { rows: posts } = await query(
      `SELECT slug, locale, updated_at, published_at
       FROM blog_posts
       WHERE status = 'published'
         AND published_at IS NOT NULL
         AND published_at <= NOW()
       ORDER BY published_at DESC`
    );

    const slugs = [...new Set(posts.map((p) => p.slug))];
    for (const slug of slugs) {
      for (const locale of ['nl', 'de', 'en']) {
        const post = posts.find((p) => p.slug === slug && p.locale === locale);
        if (!post) continue;
        const pathByLocale = {
          nl: `${BLOG_BASE.nl}${slug}/`,
          de: `${BLOG_BASE.de}${slug}/`,
          en: `${BLOG_BASE.en}${slug}/`,
        };
        const lastmod = post.updated_at || post.published_at;
        const lastmodStr = lastmod ? new Date(lastmod).toISOString().slice(0, 10) : null;
        urls.push(
          urlEntry(
            `${SITE_URL}${pathByLocale[locale]}`,
            'monthly',
            '0.8',
            hreflangAlternates(pathByLocale),
            lastmodStr
          )
        );
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

    res.type('application/xml').send(xml);
  } catch (err) {
    const fallback = staticSitemapXml();
    if (fallback) {
      return res.type('application/xml').send(fallback);
    }
    next(err);
  }
}

module.exports = { sitemapHandler };
