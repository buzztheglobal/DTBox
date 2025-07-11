// backend/models/Color.js
const pool = require('../config/db'); // ✅ Use shared pool from config

console.log(`✅ Vishal Gupta - Daily Toolbox - Color Model Loaded`);
const createColorTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_colors (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(100),
      color_hex VARCHAR(10),
      saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

const saveColor = async ({ user_id, color_hex }) => {
  const result = await pool.query(
    'INSERT INTO user_colors (user_id, color_hex) VALUES ($1, $2) RETURNING *',
    [user_id, color_hex]
  );
  return result.rows[0];
};

const getColors = async (user_id) => {
  const result = await pool.query(
    'SELECT * FROM user_colors WHERE user_id = $1 ORDER BY saved_at DESC',
    [user_id]
  );
  return result.rows;
};

const deleteColor = async (id) => {
  const result = await pool.query('DELETE FROM user_colors WHERE id = $1', [id]);
  return result.rowCount;
};

module.exports = {
  createColorTable,
  saveColor,
  getColors,
  deleteColor,
};