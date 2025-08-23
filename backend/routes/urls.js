// backend/routes/urls.js
// backend/src/routes/urls.js
const express = require('express');
const pool = require('../config/db');

const router = express.Router();

router.get('/resolve/:shortCode', async (req, res) => {
  try {
    let { shortCode } = req.params;
    console.log(`[urls.js] Resolving shortCode: ${shortCode}`);

    // Remove any trailing :1 or similar numeric suffix
    const cleanShortCode = shortCode.replace(/:\d+$/, '');
    console.log(`[urls.js] Cleaned shortCode: ${cleanShortCode}`);

    const result = await pool.query(
      'SELECT url FROM public.menu_menuitem WHERE url = $1 AND is_active = TRUE AND is_published = TRUE AND is_deleted = FALSE',
      [`/${cleanShortCode}`]
    );

    console.log(`[urls.js] Query result: ${JSON.stringify(result.rows)}`);

    if (result.rows.length === 0) {
      console.log(`[urls.js] No URL found for /${cleanShortCode}`);
      return res.status(404).json({ error: 'URL not found' });
    }

    const fullUrl = `http://localhost:3000${result.rows[0].url}`;
    console.log(`[urls.js] Resolved URL: ${fullUrl}`);
    res.json({ url: fullUrl });
  } catch (err) {
    console.error(`[urls.js] Error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
//C:\Users\gupta\Documents\DailyToolbox\backend\routes\urls.js