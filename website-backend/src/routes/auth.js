const jwt = require('jsonwebtoken');
const express = require('express');
const {
  assertAdminConfig,
  signAdminToken,
  validateAdminCredentials,
} = require('../middleware/auth');

const router = express.Router();

router.post('/login', (req, res, next) => {
  try {
    const { email = '', password = '' } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    if (!validateAdminCredentials(email, password)) {
      return res.status(401).json({ error: 'Invalid login credentials.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const token = signAdminToken(normalizedEmail);

    res.json({
      token,
      user: {
        email: normalizedEmail,
        role: 'website-admin',
      },
    });
  } catch (err) {
    next(err);
  }
});

/** Session check: no Bearer → 200 { authenticated: false } (avoids 401 noise + skips assertAdminConfig). */
router.get('/me', (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.json({ authenticated: false });
    }

    let config;
    try {
      config = assertAdminConfig();
    } catch (err) {
      return next(err);
    }

    const token = header.slice(7);
    let payload;
    try {
      payload = jwt.verify(token, config.secret);
    } catch (err) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Invalid or expired token.' });
      }
      throw err;
    }

    if (payload.scope !== 'website-admin' || payload.email !== config.email) {
      return res.status(401).json({ error: 'Invalid admin session.' });
    }

    res.json({
      authenticated: true,
      email: payload.email,
      role: 'website-admin',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
