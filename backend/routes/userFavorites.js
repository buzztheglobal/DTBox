// File: /backend/routes/userFavorites.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// ✅ Add a favorite timezone
router.post('/', async (req, res) => {
  const { user_id, timezone } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO user_favorites (user_id, timezone) VALUES ($1, $2) RETURNING *`,
      [user_id, timezone]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error adding favorite:', err.message);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// ✅ Fetch all favorites for a user
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM user_favorites WHERE user_id = $1 ORDER BY added_at DESC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching favorites:', err.message);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// ✅ Increment usage count for a favorite
router.post('/increment/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE user_favorites SET usage_count = usage_count + 1 WHERE id = $1 RETURNING *`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to increment usage:', err.message);
    res.status(500).json({ error: 'Failed to increment usage' });
  }
});

// ✅ Delete a favorite by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`DELETE FROM user_favorites WHERE id = $1 RETURNING *`, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    res.json({ success: true, removed: result.rows[0] });
  } catch (err) {
    console.error('❌ Error deleting favorite:', err.message);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});

module.exports = router; // ✅ This must come last
