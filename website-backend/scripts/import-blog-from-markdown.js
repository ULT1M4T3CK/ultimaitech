/**
 * Server-side blog import from deployed markdown (HTML_ROOT/blog/md/posts/{nl,de,en}/).
 * Run: cd /opt/website-backend && node scripts/import-blog-from-markdown.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const { query } = require('../src/db');

const LOCALES = ['nl', 'de', 'en'];
const SITE_URL = (process.env.SITE_URL || 'https://ultimaitech.com').replace(/\/$/, '');
const HTML_ROOT = process.env.HTML_ROOT || '/var/www/ultimaitech/html';
const POSTS_ROOT = path.join(HTML_ROOT, 'blog', 'md', 'posts');
const BLOG_BASE = { nl: '/blog/', de: '/de/blog/', en: '/en/blog/' };
const ADMIN_EMAIL = process.env.WEBSITE_ADMIN_EMAIL || 'info@ultimaitech.com';

function normalizePublishedAt(date) {
  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    return date.toISOString();
  }
  const raw = String(date || '').trim();
  if (!raw) return '2026-05-22T12:00:00.000Z';
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return `${raw}T12:00:00.000Z`;
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  return '2026-05-22T12:00:00.000Z';
}

function readLocalePosts(locale) {
  const dir = path.join(POSTS_ROOT, locale);
  if (!fs.existsSync(dir)) {
    throw new Error(`Missing ${dir}`);
  }
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((file) => {
      const { data, content: mdBody } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      const slug = String(data.slug || '').trim();
      const title = String(data.title || '').trim();
      const description = String(data.description || '').trim();
      const date = data.date || '2026-05-22';
      const publishedAt = normalizePublishedAt(date);
      const html = marked.parse(mdBody.trim());
      const excerpt = description || mdBody.replace(/^#.+$/m, '').replace(/[#*_`[\]()]/g, '').trim().slice(0, 220);
      return {
        slug,
        locale,
        title,
        excerpt,
        content: html,
        publishedAt,
        metaTitle: title,
        metaDescription: description,
        canonicalUrl: `${SITE_URL}${BLOG_BASE[locale]}${slug}/`,
        authorName: data.author || 'ultimAItech',
        authorEmail: ADMIN_EMAIL,
      };
    });
}

async function main() {
  const byLocale = {};
  for (const locale of LOCALES) {
    byLocale[locale] = readLocalePosts(locale);
    console.log(`[import-blog] ${locale}: ${byLocale[locale].length} posts`);
  }

  const sql = `
    INSERT INTO blog_posts (
      slug, locale, title, excerpt, cover_image_url, content, status, published_at,
      author_name, author_email, meta_title, meta_description, meta_image_url,
      canonical_url, noindex, key_takeaways
    ) VALUES (
      $1, $2, $3, $4, NULL, $5, 'published', $6,
      $7, $8, $9, $10, NULL, $11, FALSE, NULL
    )
    ON CONFLICT (slug, locale) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      content = EXCLUDED.content,
      status = EXCLUDED.status,
      published_at = EXCLUDED.published_at,
      author_name = EXCLUDED.author_name,
      author_email = EXCLUDED.author_email,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      canonical_url = EXCLUDED.canonical_url,
      updated_at = NOW()
    RETURNING slug, locale;
  `;

  let count = 0;
  for (const locale of LOCALES) {
    for (const post of byLocale[locale]) {
      await query(sql, [
        post.slug,
        post.locale,
        post.title,
        post.excerpt,
        post.content,
        post.publishedAt,
        post.authorName,
        post.authorEmail,
        post.metaTitle,
        post.metaDescription,
        post.canonicalUrl,
      ]);
      count += 1;
    }
  }

  console.log(`[import-blog] Upserted ${count} posts from ${POSTS_ROOT}`);
}

main().catch((err) => {
  console.error('[import-blog] Failed:', err);
  process.exit(1);
});
