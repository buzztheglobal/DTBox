// backend/routes/userConversions.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // assumes pg Pool setup in db.js

// Save conversion
router.post('/', async (req, res) => {
  const { user_id, source_timezone, target_timezone, input_time, converted_time } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO user_conversions (user_id, source_timezone, target_timezone, input_time, converted_time)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, source_timezone, target_timezone, input_time, converted_time]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error saving conversion:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Fetch saved conversions
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(`
      SELECT * FROM user_conversions WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
//C:\Users\gupta\Documents\DailyToolbox\backend\routes\userConversions.js
