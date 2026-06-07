#!/usr/bin/env node
/**
 * Merges defaultSeo['/'] from seed-site-cms into site_settings.seo (production-safe one-off or repeat).
 * Run from website-backend: npm run sync-seo-home
 * Requires DATABASE_URL or same env as src/db.js
 */
require('dotenv').config();
const { pool } = require('../src/db');
const { defaultSeo } = require('../src/db/seed-site-cms');

async function run() {
  const home = defaultSeo['/'];
  if (!home) {
    console.error('defaultSeo["/"] is missing in seed-site-cms.js');
    process.exit(1);
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'SELECT seo FROM site_settings WHERE id = 1 LIMIT 1'
    );
    if (!rows.length) {
      console.error('No site_settings row (id=1). Run migrations first.');
      process.exit(1);
    }

    const existing = rows[0].seo && typeof rows[0].seo === 'object' ? rows[0].seo : {};
    const merged = { ...existing, '/': home };

    await client.query(
      `UPDATE site_settings SET seo = $1::jsonb, updated_at = NOW() WHERE id = 1`,
      [JSON.stringify(merged)]
    );

    console.log('Updated site_settings.seo["/"] from seed-site-cms defaults.');
    console.log('  title:', home.title);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
