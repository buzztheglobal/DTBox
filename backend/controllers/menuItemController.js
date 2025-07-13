// backend/controllers/menuItemController.js
const pool = require('../config/db');

exports.getAllMenuItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_menuitem WHERE is_deleted = false');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};