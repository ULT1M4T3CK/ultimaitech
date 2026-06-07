const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
});

pool.on('error', (err) => {
  console.error('Unexpected website DB pool error:', err);
});

const query = (text, params) => pool.query(text, params);

module.exports = { pool, query };
