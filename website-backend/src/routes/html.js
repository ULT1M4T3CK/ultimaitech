/**
 * Serves the main SPA index.html with path-specific meta tags injected.
 * Fixes the issue where crawlers (Google, social scrapers) see homepage canonical for all URLs
 * because they receive the same static index.html before React runs.
 */
const fs = require('fs');
const path = require('path');
const { query } = require('../db');
const { getMetaForPath, SITE_URL, OG_IMAGE, blogPostAlternates, buildBaseJsonLd } = require('../data/seo');
const { injectBody } = require('../data/seoBody');

const SITE_NAME = 'ultimAItech';

function resolveHtmlPath() {
  if (process.env.HTML_ROOT) {
    return path.join(process.env.HTML_ROOT, 'index.html');
  }
  const distPath = path.resolve(__dirname, '../../../dist/index.html');
  const srcPath = path.resolve(__dirname, '../../../index.html');
  return fs.existsSync(distPath) ? distPath : srcPath;
}
const htmlPath = resolveHtmlPath();

function escapeHtmlAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function stripHtmlTags(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function getOfferMetaByToken(token) {
  if (!token || !String(token).trim()) return null;
  try {
    const { rows } = await query(
      `SELECT title, body_html, status, valid_until
       FROM client_offers
       WHERE share_token = $1
       LIMIT 1`,
      [String(token).trim()]
    );
    if (!rows.length) return null;
    const row = rows[0];
    if (row.status !== 'active') return null;
    if (row.valid_until && new Date(row.valid_until) < new Date()) return null;
    const plain = stripHtmlTags(row.body_html).slice(0, 200);
    const title = row.title;
    const description = plain || 'Private client proposal from ultimAItech.';
    const canonical = `${SITE_URL}/offer/${encodeURIComponent(token)}/`;
    return {
      title: `${title} | ${SITE_NAME}`,
      description,
      canonical,
      robots: 'noindex, nofollow',
      ogTitle: title,
      ogDescription: description,
      ogImage: OG_IMAGE,
      ogType: 'website',
      ogSiteName: SITE_NAME,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: OG_IMAGE,
    };
  } catch {
    return null;
  }
}

function offerUnavailableMeta(pathname) {
  const clean = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const canonical = `${SITE_URL}${clean}`;
  return {
    title: `Proposal | ${SITE_NAME}`,
    description: 'This proposal is unavailable or the link has expired.',
    canonical,
    robots: 'noindex, nofollow',
    ogTitle: 'Proposal',
    ogDescription: 'This proposal is unavailable or the link has expired.',
    ogImage: OG_IMAGE,
    ogType: 'website',
    twitterTitle: 'Proposal',
    twitterDescription: 'This proposal is unavailable or the link has expired.',
    twitterImage: OG_IMAGE,
  };
}

function getBlogOgImage(slug) {
  const safeSlug = String(slug || '').replace(/[^a-z0-9-]/gi, '');
  if (!safeSlug) return OG_IMAGE;
  return `${SITE_URL}/og/blog/${safeSlug}.png`;
}

async function getBlogPostMeta(slug, locale = 'nl') {
  const { rows } = await query(
    `SELECT canonical_url, meta_title, meta_description, meta_image_url, title, excerpt,
            cover_image_url, noindex, locale, published_at, updated_at, author_name
     FROM blog_posts
     WHERE slug = $1
       AND locale = $2
       AND status = 'published'
       AND published_at IS NOT NULL
       AND published_at <= NOW()
     LIMIT 1`,
    [slug, locale]
  );
  if (!rows.length) return null;
  const row = rows[0];
  const canonical = row.canonical_url || `${SITE_URL}${locale === 'de' ? '/de/blog/' : locale === 'en' ? '/en/blog/' : '/blog/'}${slug}/`;
  const title = row.meta_title || row.title;
  const description = row.meta_description || row.excerpt;
  const image = row.meta_image_url || row.cover_image_url || getBlogOgImage(slug);
  const robots = row.noindex ? 'noindex, nofollow' : 'index, follow';
  const datePublished = row.published_at ? new Date(row.published_at).toISOString() : undefined;
  const dateModified = row.updated_at
    ? new Date(row.updated_at).toISOString()
    : datePublished;
  return {
    title: `${title} | ${SITE_NAME} Blog`,
    description,
    canonical,
    alternates: blogPostAlternates(slug),
    robots,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogType: 'article',
    ogSiteName: SITE_NAME,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      image,
      datePublished,
      dateModified,
      author: {
        '@type': 'Person',
        name: row.author_name && row.author_name !== 'Website Admin' ? row.author_name : 'Andre Hassler',
        url: `${SITE_URL}/over/`,
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: canonical,
      inLanguage: locale === 'de' ? 'de-DE' : locale === 'en' ? 'en-US' : 'nl-NL',
      url: canonical,
    },
  };
}

async function resolveMeta(pathname) {
  const offerMatch = pathname.match(/^\/offer\/([^/]+)\/?$/);
  if (offerMatch) {
    const offerMeta = await getOfferMetaByToken(offerMatch[1]);
    if (offerMeta) return offerMeta;
    return offerUnavailableMeta(pathname);
  }
  const blogMatch = pathname.match(/^\/(?:de\/|en\/)?blog\/([^/]+)\/?$/);
  if (blogMatch) {
    let locale = 'nl';
    if (pathname.startsWith('/de/')) locale = 'de';
    else if (pathname.startsWith('/en/')) locale = 'en';
    const postMeta = await getBlogPostMeta(blogMatch[1], locale);
    if (postMeta) return postMeta;
  }
  return getMetaForPath(pathname);
}

function injectMeta(html, meta) {
  const c = escapeHtmlAttr(meta.canonical);
  const t = escapeHtmlAttr(meta.title);
  const d = escapeHtmlAttr(meta.description);
  const r = escapeHtmlAttr(meta.robots || 'index, follow');
  const oi = escapeHtmlAttr(meta.ogTitle || meta.title);
  const od = escapeHtmlAttr(meta.ogDescription || meta.description);
  const oimg = escapeHtmlAttr(meta.ogImage || OG_IMAGE);
  const otype = escapeHtmlAttr(meta.ogType || 'website');
  const ti = escapeHtmlAttr(meta.twitterTitle || meta.title);
  const td = escapeHtmlAttr(meta.twitterDescription || meta.description);
  const timg = escapeHtmlAttr(meta.twitterImage || meta.ogImage || OG_IMAGE);

  let out = html
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${c}" />`)
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${d}" />`)
    .replace(/<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${r}" />`);

  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${c}" />`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${oi}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${od}" />`
  );
  out = out.replace(
    /<meta property="og:image" content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${oimg}" />`
  );
  out = out.replace(
    /<meta property="og:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${otype}" />`
  );

  out = out.replace(
    /<meta property="twitter:url" content="[^"]*"\s*\/?>/,
    `<meta property="twitter:url" content="${c}" />`
  );
  out = out.replace(
    /<meta property="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta property="twitter:title" content="${ti}" />`
  );
  out = out.replace(
    /<meta property="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta property="twitter:description" content="${td}" />`
  );
  out = out.replace(
    /<meta property="twitter:image" content="[^"]*"\s*\/?>/,
    `<meta property="twitter:image" content="${timg}" />`
  );

  if (Array.isArray(meta.alternates) && meta.alternates.length) {
    out = out.replace(/\n?\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/g, '');
    const hreflangTags = meta.alternates
      .map((alt) => `<link rel="alternate" hreflang="${escapeHtmlAttr(alt.hreflang)}" href="${escapeHtmlAttr(alt.href)}" />`)
      .join('\n    ');
    out = out.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${c}" />\n    ${hreflangTags}`
    );
  }

  const jsonLdBlocks = [buildBaseJsonLd(), meta.jsonLd].filter(Boolean);
  if (jsonLdBlocks.length) {
    out = out.replace(/\n?\s*<script type="application\/ld\+json" data-seo-runtime>[\s\S]*?<\/script>/g, '');
    const scripts = jsonLdBlocks
      .map((jsonLd) => `<script type="application/ld+json" data-seo-runtime>${JSON.stringify(jsonLd)}</script>`)
      .join('\n    ');
    out = out.replace('</head>', `    ${scripts}\n  </head>`);
  }

  return out;
}

let cachedHtml = null;
let cachedHtmlPath = null;

function loadHtml() {
  const resolved = path.resolve(htmlPath);
  if (cachedHtml !== null && cachedHtmlPath === resolved) {
    return cachedHtml;
  }
  try {
    cachedHtml = fs.readFileSync(resolved, 'utf8');
    cachedHtmlPath = resolved;
    return cachedHtml;
  } catch (err) {
    cachedHtml = null;
    cachedHtmlPath = null;
    throw err;
  }
}

function loadHtmlForPath(pathname) {
  if (pathname.startsWith('/offer/') && pathname.replace(/\/$/, '').split('/').filter(Boolean).length >= 2) {
    const offerPath = path.resolve(__dirname, '../../../dist/offer/index.html');
    if (fs.existsSync(offerPath)) {
      return fs.readFileSync(offerPath, 'utf8');
    }
  }
  return loadHtml();
}

async function htmlHandler(req, res, next) {
  try {
    const pathname = req.path || '/';
    if (pathname.startsWith('/api') || pathname === '/sitemap.xml') {
      return next();
    }

    const meta = await resolveMeta(pathname);
    let html = loadHtmlForPath(pathname);
    html = injectMeta(html, meta);
    html = await injectBody(html, pathname);

    res.type('text/html').send(html);
  } catch (err) {
    next(err);
  }
}

/** Directory containing built index.html (for express.static: /assets, favicons, etc.). */
function getHtmlStaticRoot() {
  return path.dirname(path.resolve(htmlPath));
}

module.exports = { htmlHandler, loadHtml, getHtmlStaticRoot };
