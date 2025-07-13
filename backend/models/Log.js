// backend/models/Log.js
const pool = require('../config/db');

const createLogsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS dtb_logs (
      id SERIAL PRIMARY KEY,
      type VARCHAR(100),
      category VARCHAR(100),
      search TEXT,
      count INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

const insertLog = async ({ type, category, search, count }) => {
  const query = `
    INSERT INTO dtb_logs (type, category, search, count)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [type, category, search, count];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createLogsTable,
  insertLog
};