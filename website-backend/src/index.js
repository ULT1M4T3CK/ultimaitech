require('dotenv').config();
const fs = require('fs');
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const siteRoutes = require('./routes/site');
const offersRoutes = require('./routes/offers');
const { sitemapHandler } = require('./routes/sitemap');
const { htmlHandler, getHtmlStaticRoot } = require('./routes/html');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3002;
const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads');
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://challenges.cloudflare.com'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameSrc: ['https://challenges.cloudflare.com'],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'self'"],
      },
    },
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use('/api/uploads', express.static(uploadDir));
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/site', siteRoutes);
app.use('/api/offers', offersRoutes);
app.get('/api/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));
app.get('/sitemap.xml', sitemapHandler);

const htmlStaticRoot = getHtmlStaticRoot();
if (fs.existsSync(htmlStaticRoot)) {
  app.use(express.static(htmlStaticRoot, { index: false }));
}

app.get(/.*/, htmlHandler);
app.use(errorHandler);

async function start() {
  const isProd = process.env.NODE_ENV === 'production';
  const dbUrl = String(process.env.DATABASE_URL || '').trim();

  if (isProd && !dbUrl) {
    console.error('[website-backend] FATAL: DATABASE_URL is required in production');
    process.exit(1);
  }

  if (dbUrl) {
    try {
      const { pool } = require('./db');
      await pool.query('SELECT 1');
    } catch (err) {
      console.error('[website-backend] database unreachable:', err.message);
      if (isProd) process.exit(1);
    }
  }

  app.listen(port, () => {
    console.log(`Website backend running on port ${port} [${process.env.NODE_ENV || 'development'}]`);
  });
}

if (require.main === module) {
  start().catch((err) => {
    console.error('[website-backend] startup failed:', err);
    process.exit(1);
  });
}

module.exports = app;
