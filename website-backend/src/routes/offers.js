const crypto = require('crypto');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { query } = require('../db');
const { authenticateAdmin } = require('../middleware/auth');
const { sanitizeBodyHtml } = require('../lib/offerSanitize');
const { streamOfferPdf } = require('../lib/offerPdf');

const router = express.Router();

const STATUSES = new Set(['draft', 'active', 'archived']);

const publicOfferLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

function normalizeLineItems(raw) {
  if (raw == null) return [];
  if (!Array.isArray(raw)) {
    throw Object.assign(new Error('lineItems must be an array.'), { status: 400 });
  }
  return raw.map((row) => {
    if (!row || typeof row !== 'object') {
      throw Object.assign(new Error('Each line item must be an object.'), { status: 400 });
    }
    return {
      description: String(row.description ?? '').trim(),
      amount: String(row.amount ?? '').trim(),
    };
  });
}

function serializeRow(row) {
  const lineItems =
    row.line_items && typeof row.line_items === 'object'
      ? row.line_items
      : JSON.parse(row.line_items || '[]');

  return {
    id: row.id,
    shareToken: row.share_token,
    clientLabel: row.client_label || '',
    title: row.title,
    bodyHtml: row.body_html || '',
    lineItems: Array.isArray(lineItems) ? lineItems : [],
    status: row.status,
    validUntil: row.valid_until ? new Date(row.valid_until).toISOString() : null,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : null,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : null,
  };
}

function parseValidUntil(value) {
  if (value === null || value === undefined || value === '') return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    throw Object.assign(new Error('Invalid validUntil date.'), { status: 400 });
  }
  return d.toISOString();
}

/** @returns {Promise<null | { title: string, clientLabel: string, bodyHtml: string, lineItems: object[], validUntil: string|null }>} */
async function loadPublicOfferForToken(token) {
  const t = String(token || '').trim();
  if (!t) return null;

  const { rows } = await query(
    `SELECT title, client_label, body_html, line_items, valid_until, status
     FROM client_offers
     WHERE share_token = $1
     LIMIT 1`,
    [t]
  );

  if (!rows.length) return null;
  const row = rows[0];
  if (row.status !== 'active') return null;
  if (row.valid_until && new Date(row.valid_until) < new Date()) return null;

  const lineItems = normalizeLineItems(
    typeof row.line_items === 'object' ? row.line_items : JSON.parse(row.line_items || '[]')
  );

  return {
    title: row.title,
    clientLabel: row.client_label || '',
    bodyHtml: sanitizeBodyHtml(row.body_html || ''),
    lineItems,
    validUntil: row.valid_until ? new Date(row.valid_until).toISOString() : null,
  };
}

router.get('/public/:token/pdf', publicOfferLimiter, async (req, res, next) => {
  try {
    const token = String(req.params.token || '').trim();
    const offer = await loadPublicOfferForToken(token);
    if (!offer) {
      return res.status(404).type('text/plain').send('Offer not found.');
    }
    const download = req.query.download === '1' || req.query.download === 'true';
    await streamOfferPdf(res, offer, download);
  } catch (err) {
    next(err);
  }
});

router.get('/public/:token', publicOfferLimiter, async (req, res, next) => {
  try {
    const token = String(req.params.token || '').trim();
    const offer = await loadPublicOfferForToken(token);
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found.' });
    }

    res.set('Cache-Control', 'private, no-store');
    res.json({
      title: offer.title,
      clientLabel: offer.clientLabel,
      bodyHtml: offer.bodyHtml,
      lineItems: offer.lineItems,
      validUntil: offer.validUntil,
    });
  } catch (err) {
    next(err);
  }
});

router.use('/admin', authenticateAdmin);

router.get('/admin', async (_req, res, next) => {
  try {
    const { rows } = await query(
      `SELECT * FROM client_offers ORDER BY updated_at DESC NULLS LAST, created_at DESC`
    );
    res.json(rows.map(serializeRow));
  } catch (err) {
    next(err);
  }
});

router.get('/admin/:id', async (req, res, next) => {
  try {
    const { rows } = await query(`SELECT * FROM client_offers WHERE id = $1 LIMIT 1`, [
      req.params.id,
    ]);
    if (!rows.length) {
      return res.status(404).json({ error: 'Offer not found.' });
    }
    res.json(serializeRow(rows[0]));
  } catch (err) {
    next(err);
  }
});

router.post('/admin', async (req, res, next) => {
  try {
    const title = String(req.body?.title ?? '').trim();
    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const status = String(req.body?.status ?? 'draft').toLowerCase();
    if (!STATUSES.has(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const shareToken = crypto.randomBytes(24).toString('hex');
    const clientLabel = String(req.body?.clientLabel ?? '').trim() || null;
    const bodyHtml = sanitizeBodyHtml(req.body?.bodyHtml ?? '');
    const lineItems = normalizeLineItems(req.body?.lineItems);
    let validUntil = null;
    try {
      validUntil = parseValidUntil(req.body?.validUntil);
    } catch (e) {
      return res.status(e.status || 400).json({ error: e.message });
    }

    const { rows } = await query(
      `INSERT INTO client_offers (
         share_token, client_label, title, body_html, line_items, status, valid_until, updated_at
       )
       VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, NOW())
       RETURNING *`,
      [
        shareToken,
        clientLabel,
        title,
        bodyHtml,
        JSON.stringify(lineItems),
        status,
        validUntil,
      ]
    );

    res.status(201).json(serializeRow(rows[0]));
  } catch (err) {
    next(err);
  }
});

router.put('/admin/:id', async (req, res, next) => {
  try {
    const { rows: existingRows } = await query(`SELECT * FROM client_offers WHERE id = $1 LIMIT 1`, [
      req.params.id,
    ]);
    if (!existingRows.length) {
      return res.status(404).json({ error: 'Offer not found.' });
    }

    const title = String(req.body?.title ?? '').trim();
    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const status = String(req.body?.status ?? 'draft').toLowerCase();
    if (!STATUSES.has(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const clientLabel = String(req.body?.clientLabel ?? '').trim() || null;
    const bodyHtml = sanitizeBodyHtml(req.body?.bodyHtml ?? '');
    let lineItems;
    try {
      lineItems = normalizeLineItems(req.body?.lineItems);
    } catch (e) {
      return res.status(e.status || 400).json({ error: e.message });
    }

    let validUntil;
    try {
      validUntil = parseValidUntil(req.body?.validUntil);
    } catch (e) {
      return res.status(e.status || 400).json({ error: e.message });
    }

    const { rows } = await query(
      `UPDATE client_offers
       SET client_label = $1,
           title = $2,
           body_html = $3,
           line_items = $4::jsonb,
           status = $5,
           valid_until = $6,
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [
        clientLabel,
        title,
        bodyHtml,
        JSON.stringify(lineItems),
        status,
        validUntil,
        req.params.id,
      ]
    );

    res.json(serializeRow(rows[0]));
  } catch (err) {
    next(err);
  }
});

router.delete('/admin/:id', async (req, res, next) => {
  try {
    const { rowCount } = await query(`DELETE FROM client_offers WHERE id = $1`, [req.params.id]);
    if (!rowCount) {
      return res.status(404).json({ error: 'Offer not found.' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
