const http = require('http');
const https = require('https');
const PDFDocument = require('pdfkit');
const { convert } = require('html-to-text');
const { sanitizeBodyHtml } = require('./offerSanitize');

const SITE_URL = (process.env.SITE_URL || 'https://ultimaitech.com').replace(/\/$/, '');

function fetchUrlBuffer(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { timeout: 12000 }, (res) => {
      if (res.statusCode !== 200) {
        resolve(null);
        res.resume();
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
  });
}

function safeFilename(title) {
  const base = String(title || 'proposal')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  return base || 'proposal';
}

/**
 * @param {import('express').Response} res
 * @param {object} offer
 * @param {boolean} download
 */
async function streamOfferPdf(res, offer, download) {
  const { title, clientLabel, bodyHtml, lineItems, validUntil } = offer;

  const logoUrl = `${SITE_URL}/assets/images/logo.png`;
  const logoBuf = await fetchUrlBuffer(logoUrl);

  const safeHtml = sanitizeBodyHtml(bodyHtml);
  let bodyText;
  try {
    bodyText = convert(safeHtml, {
      wordwrap: 92,
      preserveNewlines: true,
      selectors: [{ selector: 'a', options: { hideLinkHrefIfSameAsText: true } }],
    });
  } catch {
    bodyText = safeHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const filename = `ultimAItech-proposal-${safeFilename(title)}.pdf`;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader(
    'Content-Disposition',
    download
      ? `attachment; filename="${filename.replace(/"/g, '')}"`
      : `inline; filename="${filename.replace(/"/g, '')}"`
  );

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 54, bottom: 54, left: 54, right: 54 },
    info: {
      Title: String(title || 'Proposal'),
      Author: 'ultimAItech',
      Subject: 'Client proposal',
      Keywords: 'ultimAItech, proposal',
    },
  });

  const done = new Promise((resolve, reject) => {
    res.once('error', reject);
    doc.once('error', reject);
    res.once('finish', resolve);
  });

  doc.pipe(res);

  const navy = '#0f172a';
  const slate = '#475569';
  const muted = '#64748b';
  const lineCol = '#e2e8f0';
  const left = doc.page.margins.left;
  const contentW = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  if (logoBuf) {
    try {
      doc.image(logoBuf, left, doc.y, { width: 128 });
      doc.moveDown(3.2);
    } catch {
      doc.fontSize(16).fillColor(navy).font('Helvetica-Bold').text('ultimAItech');
      doc.moveDown(0.4);
      doc.fontSize(8.5).fillColor(muted).font('Helvetica').text('Technology that empowers your potential');
      doc.moveDown(1);
    }
  } else {
    doc.fontSize(16).fillColor(navy).font('Helvetica-Bold').text('ultimAItech');
    doc.moveDown(0.25);
    doc.fontSize(8.5).fillColor(muted).font('Helvetica').text('Technology that empowers your potential');
    doc.moveDown(1);
  }

  doc.fontSize(17).fillColor(navy).font('Helvetica-Bold').text(String(title || 'Proposal'), {
    width: contentW,
    align: 'left',
  });
  doc.moveDown(0.35);

  if (clientLabel) {
    doc.fontSize(10).fillColor(slate).font('Helvetica').text(`Prepared for: ${clientLabel}`);
    doc.moveDown(0.35);
  }

  doc
    .fontSize(8.5)
    .fillColor(muted)
    .font('Helvetica')
    .text(
      new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  doc.moveDown(0.75);

  const yLine = doc.y;
  doc.strokeColor(lineCol).lineWidth(0.5).moveTo(left, yLine).lineTo(left + contentW, yLine).stroke();
  doc.moveDown(0.85);

  doc.fontSize(10).fillColor(navy).font('Helvetica').text(bodyText, {
    width: contentW,
    align: 'left',
    lineGap: 2,
  });

  if (Array.isArray(lineItems) && lineItems.length > 0) {
    doc.moveDown(1.1);
    doc.fontSize(11).fillColor(navy).font('Helvetica-Bold').text('Investment summary');
    doc.moveDown(0.4);
    lineItems.forEach((item) => {
      const d = String(item.description || '').trim() || '—';
      const amt = String(item.amount || '').trim();
      const row = amt ? `${d}  ·  ${amt}` : d;
      doc.fontSize(9.5).fillColor(navy).font('Helvetica').text(row, { width: contentW });
      doc.moveDown(0.32);
    });
  }

  if (validUntil) {
    doc.moveDown(0.75);
    doc
      .fontSize(8.5)
      .fillColor(slate)
      .font('Helvetica')
      .text(
        `Valid until ${new Date(validUntil).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}.`
      );
  }

  doc.moveDown(1.4);
  doc
    .fontSize(7.5)
    .fillColor('#94a3b8')
    .font('Helvetica')
    .text('ultimAItech  ·  ultimaitech.com  ·  info@ultimaitech.com', {
      align: 'center',
      width: contentW,
    });

  doc.end();

  return done;
}

module.exports = { streamOfferPdf };
