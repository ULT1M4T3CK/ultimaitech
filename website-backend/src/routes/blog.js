const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sanitizeHtml = require('sanitize-html');
const { query } = require('../db');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

const BLOG_STATUSES = new Set(['draft', 'published', 'archived']);
const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads');
const blogUploadDir = path.join(uploadDir, 'blog');
const publicUploadBase = process.env.PUBLIC_UPLOAD_BASE || '/api/uploads';

fs.mkdirSync(blogUploadDir, { recursive: true });

function normalizePublicUrlString(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/\/admin\/api\/uploads\//g, '/api/uploads/');
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, blogUploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      return cb(null, true);
    }

    const err = new Error('Only image uploads are allowed.');
    err.status = 400;
    cb(err);
  },
});

const VALID_LOCALES = new Set(['nl', 'de', 'en']);

function normalizeLocale(value) {
  const locale = String(value || 'nl').trim().toLowerCase();
  return VALID_LOCALES.has(locale) ? locale : 'nl';
}

router.get('/posts', async (req, res, next) => {
  try {
    const locale = normalizeLocale(req.query.locale);
    const { rows } = await query(
      `SELECT *
       FROM blog_posts
       WHERE locale = $1
         AND status = 'published'
         AND published_at IS NOT NULL
         AND published_at <= NOW()
       ORDER BY published_at DESC, created_at DESC`,
      [locale]
    );

    res.json(rows.map(serializePost));
  } catch (err) {
    next(err);
  }
});

router.get('/posts/:slug', async (req, res, next) => {
  try {
    const locale = normalizeLocale(req.query.locale);
    const { rows } = await query(
      `SELECT *
       FROM blog_posts
       WHERE slug = $1
         AND locale = $2
         AND status = 'published'
         AND published_at IS NOT NULL
         AND published_at <= NOW()
       LIMIT 1`,
      [req.params.slug, locale]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    res.json(serializePost(rows[0]));
  } catch (err) {
    next(err);
  }
});

router.use('/admin', authenticateAdmin);

router.get('/admin/posts', async (_req, res, next) => {
  try {
    const { rows } = await query(
      `SELECT *
       FROM blog_posts
       ORDER BY COALESCE(published_at, updated_at) DESC, created_at DESC`
    );

    res.json(rows.map(serializePost));
  } catch (err) {
    next(err);
  }
});

router.get('/admin/posts/:id', async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    res.json(serializePost(post));
  } catch (err) {
    next(err);
  }
});

router.post('/admin/posts', async (req, res, next) => {
  try {
    const payload = await normalizePayload(req.body, null, req.admin.email);
    const { rows } = await query(
      `INSERT INTO blog_posts (
         slug, locale, title, excerpt, cover_image_url, content, status, published_at,
         author_name, author_email, meta_title, meta_description, meta_image_url,
         canonical_url, noindex, key_takeaways
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       RETURNING *`,
      [
        payload.slug,
        payload.locale,
        payload.title,
        payload.excerpt,
        payload.coverImageUrl,
        payload.content,
        payload.status,
        payload.publishedAt,
        payload.authorName,
        payload.authorEmail,
        payload.metaTitle,
        payload.metaDescription,
        payload.metaImageUrl,
        payload.canonicalUrl,
        payload.noindex,
        payload.keyTakeaways,
      ]
    );

    res.status(201).json(serializePost(rows[0]));
  } catch (err) {
    next(err);
  }
});

router.put('/admin/posts/:id', async (req, res, next) => {
  try {
    const existing = await getPostById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    const payload = await normalizePayload(req.body, existing, req.admin.email);
    const { rows } = await query(
      `UPDATE blog_posts
       SET slug = $1,
           locale = $2,
           title = $3,
           excerpt = $4,
           cover_image_url = $5,
           content = $6,
           status = $7,
           published_at = $8,
           author_name = $9,
           author_email = $10,
           meta_title = $11,
           meta_description = $12,
           meta_image_url = $13,
           canonical_url = $14,
           noindex = $15,
           key_takeaways = $16,
           author_id = NULL
       WHERE id = $17
       RETURNING *`,
      [
        payload.slug,
        payload.locale,
        payload.title,
        payload.excerpt,
        payload.coverImageUrl,
        payload.content,
        payload.status,
        payload.publishedAt,
        payload.authorName,
        payload.authorEmail,
        payload.metaTitle,
        payload.metaDescription,
        payload.metaImageUrl,
        payload.canonicalUrl,
        payload.noindex,
        payload.keyTakeaways,
        req.params.id,
      ]
    );

    res.json(serializePost(rows[0]));
  } catch (err) {
    next(err);
  }
});

router.delete('/admin/posts/:id', async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    await query('DELETE FROM blog_posts WHERE id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.post('/admin/uploads', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }

    res.status(201).json({
      url: normalizePublicUrlString(`${publicUploadBase}/blog/${req.file.filename}`),
      filename: req.file.filename,
    });
  } catch (err) {
    next(err);
  }
});

async function normalizePayload(body, existingPost, adminEmail) {
  const title = String(body.title || '').trim();
  const rawContent = String(body.content || '');
  const content = sanitizeContent(rawContent);
  const plainContent = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, ' ')
    .trim();
  const hasEmbeddedImage = /<img\b/i.test(content);
  const requestedStatus = String(body.status || existingPost?.status || 'draft').toLowerCase();
  const status = BLOG_STATUSES.has(requestedStatus) ? requestedStatus : 'draft';

  if (!title) {
    const err = new Error('Title is required.');
    err.status = 400;
    throw err;
  }

  if (!plainContent && !hasEmbeddedImage) {
    const err = new Error('Content is required.');
    err.status = 400;
    throw err;
  }

  const baseSlug = slugify(String(body.slug || title));
  if (!baseSlug) {
    const err = new Error('Slug could not be generated from this title.');
    err.status = 400;
    throw err;
  }

  const locale = normalizeLocale(body.locale || existingPost?.locale || 'nl');
  const slug = await ensureUniqueSlug(baseSlug, locale, existingPost?.id || null);
  const excerpt = buildExcerpt(body.excerpt, content, title);
  const coverImageUrl = body.coverImageUrl ? String(body.coverImageUrl).trim() : null;
  const metaTitle = normalizeOptionalText(body.metaTitle, 255);
  const metaDescription = normalizeOptionalText(body.metaDescription);
  const metaImageUrl = normalizeOptionalText(body.metaImageUrl);
  const canonicalUrl = normalizeOptionalText(body.canonicalUrl);
  const noindex = normalizeBoolean(body.noindex, existingPost?.noindex || false);
  const keyTakeaways = normalizeMultilineText(body.keyTakeaways);

  let publishedAt = parseDateTime(body.publishedAt) || existingPost?.published_at || null;
  if (status === 'published' && !publishedAt) {
    publishedAt = new Date().toISOString();
  }
  if (status !== 'published') {
    publishedAt = null;
  }

  return {
    slug,
    locale,
    title,
    excerpt,
    coverImageUrl,
    content,
    status,
    publishedAt,
    authorName: 'Website Admin',
    authorEmail: adminEmail,
    metaTitle,
    metaDescription,
    metaImageUrl,
    canonicalUrl,
    noindex,
    keyTakeaways,
  };
}

function sanitizeContent(content) {
  return sanitizeHtml(content, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 's', 'blockquote',
      'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4',
      'pre', 'code', 'img',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'class'],
      p: ['class'],
      h1: ['class'],
      h2: ['class'],
      h3: ['class'],
      h4: ['class'],
      blockquote: ['class'],
      ul: ['class'],
      ol: ['class'],
      li: ['class', 'data-list'],
      pre: ['class'],
    },
    allowedClasses: {
      p: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      h1: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      h2: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      h3: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      h4: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      blockquote: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      ul: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      ol: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      li: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      pre: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      img: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer',
          target: attribs.target || '_blank',
        },
      }),
    },
  }).trim();
}

function buildExcerpt(excerpt, content, title) {
  const raw = String(excerpt || '').trim();
  if (raw) {
    return raw.slice(0, 220);
  }

  const plainText = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, ' ')
    .trim();

  return (plainText || title).slice(0, 220);
}

function parseDateTime(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function normalizeOptionalText(value, maxLength = null) {
  if (value === null || value === undefined) {
    return null;
  }

  const normalized = String(value).trim();
  if (!normalized) {
    return null;
  }

  return maxLength ? normalized.slice(0, maxLength) : normalized;
}

function normalizeMultilineText(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const normalized = String(value)
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();

  return normalized || null;
}

function normalizeBoolean(value, fallback = false) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }

  return Boolean(fallback);
}

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180);
}

async function ensureUniqueSlug(baseSlug, locale, excludedId) {
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const params = excludedId ? [candidate, locale, excludedId] : [candidate, locale];
    const clause = excludedId ? 'AND id <> $3' : '';
    const { rows } = await query(
      `SELECT 1 FROM blog_posts WHERE slug = $1 AND locale = $2 ${clause} LIMIT 1`,
      params
    );

    if (!rows.length) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

async function getPostById(id) {
  const { rows } = await query(
    `SELECT *
     FROM blog_posts
     WHERE id = $1
     LIMIT 1`,
    [id]
  );

  return rows[0];
}

function serializePost(row) {
  return {
    id: row.id,
    slug: row.slug,
    locale: row.locale || 'nl',
    title: row.title,
    excerpt: row.excerpt,
    coverImageUrl: row.cover_image_url != null ? normalizePublicUrlString(row.cover_image_url) : null,
    content: row.content,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    authorName: row.author_name || null,
    authorEmail: row.author_email || null,
    metaTitle: row.meta_title || null,
    metaDescription: row.meta_description || null,
    metaImageUrl: row.meta_image_url != null ? normalizePublicUrlString(row.meta_image_url) : null,
    canonicalUrl: row.canonical_url || null,
    noindex: Boolean(row.noindex),
    keyTakeaways: row.key_takeaways || null,
  };
}

module.exports = router;
