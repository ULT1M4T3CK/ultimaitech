#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../src/db');

const migrationsDir = path.join(__dirname, '../src/db/migrations');

async function run() {
  const files = fs.readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  if (!files.length) {
    console.log('No migrations found');
    return;
  }

  const client = await pool.connect();
  try {
    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      console.log(`Running ${file}...`);
      await client.query(sql);
      console.log('  OK');
    }
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
