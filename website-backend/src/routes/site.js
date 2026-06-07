const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { query } = require('../db');
const { authenticateAdmin } = require('../middleware/auth');
const { defaultContent, defaultSeo, defaultAssets } = require('../db/seed-site-cms');

const router = express.Router();

const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads');
const siteUploadDir = path.join(uploadDir, 'site');
/** Public URL prefix for uploaded files. Use /api/uploads (not /admin/api/...) so images are not blocked by common filter lists. */
const publicUploadBase = process.env.PUBLIC_UPLOAD_BASE || '/api/uploads';

fs.mkdirSync(siteUploadDir, { recursive: true });

/** Legacy rows stored /admin/api/uploads/... — normalize for API responses (nginx serves /api/uploads/site/ from Node). */
function normalizePublicUrlString(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/\/admin\/api\/uploads\//g, '/api/uploads/');
}

function normalizePublicUrlsDeep(value) {
  if (value == null) return value;
  if (typeof value === 'string') return normalizePublicUrlString(value);
  if (Array.isArray(value)) return value.map(normalizePublicUrlsDeep);
  if (typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = normalizePublicUrlsDeep(v);
    }
    return out;
  }
  return value;
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, siteUploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase() || '.png';
      cb(null, `${Date.now()}-${crypto.randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      return cb(null, true);
    }
    cb(new Error('Only image uploads are allowed.'), false);
  },
});

async function getSiteSettings() {
  const { rows } = await query(
    `SELECT content, seo, assets FROM site_settings WHERE id = 1 LIMIT 1`
  );
  return rows[0] || null;
}

/** Detect legacy (flat, non-locale-wrapped) payload and wrap as { nl: <legacy> }. */
function ensureLocaleWrapped(obj, defaults) {
  if (!obj || typeof obj !== 'object') return defaults;
  if (obj.nl !== undefined || obj.de !== undefined || obj.en !== undefined) return obj;
  return { nl: obj, de: {}, en: {} };
}

async function ensureSiteSettings() {
  let row = await getSiteSettings();
  if (!row) {
    await query(
      `INSERT INTO site_settings (id, content, seo, assets)
       VALUES (1, $1::jsonb, $2::jsonb, $3::jsonb)
       ON CONFLICT (id) DO NOTHING`,
      [JSON.stringify(defaultContent), JSON.stringify(defaultSeo), JSON.stringify(defaultAssets)]
    );
    row = await getSiteSettings();
  }
  const rawContent = (row?.content && typeof row.content === 'object') ? row.content : (row?.content ? JSON.parse(row.content) : defaultContent);
  const rawSeo = (row?.seo && typeof row.seo === 'object') ? row.seo : (row?.seo ? JSON.parse(row.seo) : defaultSeo);
  const assets = (row?.assets && typeof row.assets === 'object') ? row.assets : (row?.assets ? JSON.parse(row.assets) : defaultAssets);

  const content = ensureLocaleWrapped(rawContent, defaultContent);
  const seo = ensureLocaleWrapped(rawSeo, defaultSeo);

  return { content, seo, assets };
}

router.get('/', async (_req, res, next) => {
  try {
    const data = await ensureSiteSettings();
    res.set('Cache-Control', 'private, no-store');
    res.json(normalizePublicUrlsDeep(data));
  } catch (err) {
    next(err);
  }
});

router.get('/admin', authenticateAdmin, async (_req, res, next) => {
  try {
    const data = await ensureSiteSettings();
    res.json(normalizePublicUrlsDeep(data));
  } catch (err) {
    next(err);
  }
});

router.put('/admin', authenticateAdmin, async (req, res, next) => {
  try {
    const { content, seo, assets } = req.body;
    const existing = await ensureSiteSettings();

    const newContent = content !== undefined ? (typeof content === 'object' ? content : JSON.parse(content || '{}')) : existing.content;
    const newSeo = seo !== undefined ? (typeof seo === 'object' ? seo : JSON.parse(seo || '{}')) : existing.seo;
    const newAssets = assets !== undefined ? (typeof assets === 'object' ? assets : JSON.parse(assets || '{}')) : existing.assets;

    await query(
      `INSERT INTO site_settings (id, content, seo, assets, updated_at)
       VALUES (1, $1::jsonb, $2::jsonb, $3::jsonb, NOW())
       ON CONFLICT (id) DO UPDATE SET
         content = EXCLUDED.content,
         seo = EXCLUDED.seo,
         assets = EXCLUDED.assets,
         updated_at = NOW()`,
      [JSON.stringify(newContent), JSON.stringify(newSeo), JSON.stringify(newAssets)]
    );

    const data = await ensureSiteSettings();
    res.json(normalizePublicUrlsDeep(data));
  } catch (err) {
    next(err);
  }
});

router.post('/admin/uploads', authenticateAdmin, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }
    const rawUrl = `${publicUploadBase}/site/${req.file.filename}`;
    res.status(201).json({
      url: normalizePublicUrlString(rawUrl),
      filename: req.file.filename,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
