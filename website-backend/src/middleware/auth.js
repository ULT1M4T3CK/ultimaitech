const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function getAdminConfig() {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    email: process.env.WEBSITE_ADMIN_EMAIL || (isProduction ? '' : 'admin@ultimaitech.local'),
    password: process.env.WEBSITE_ADMIN_PASSWORD || (isProduction ? '' : 'change-me'),
    secret: process.env.WEBSITE_ADMIN_JWT_SECRET || (isProduction ? '' : 'dev-website-admin-secret'),
  };
}

function assertAdminConfig() {
  const config = getAdminConfig();
  if (!config.email || !config.password || !config.secret) {
    const err = new Error('Website admin environment variables are not configured.');
    err.status = 500;
    throw err;
  }

  return config;
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));

  if (a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(a, b);
}

function signAdminToken(email) {
  const { secret } = assertAdminConfig();
  return jwt.sign({ email, scope: 'website-admin' }, secret, { expiresIn: '12h' });
}

function authenticateAdmin(req, res, next) {
  try {
    const { secret, email } = assertAdminConfig();
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const token = header.slice(7);
    const payload = jwt.verify(token, secret);

    if (payload.scope !== 'website-admin' || payload.email !== email) {
      return res.status(401).json({ error: 'Invalid admin session.' });
    }

    req.admin = { email: payload.email };
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    next(err);
  }
}

function validateAdminCredentials(email, password) {
  const config = assertAdminConfig();
  return safeEqual(email.trim().toLowerCase(), config.email.trim().toLowerCase()) && safeEqual(password, config.password);
}

module.exports = {
  authenticateAdmin,
  assertAdminConfig,
  signAdminToken,
  validateAdminCredentials,
  getAdminConfig,
};
