// backend/controllers/menuItemController.js
const pool = require('../config/db');

exports.getAllMenuItems = async (req, res) => {
  try {
    const strQuery = 'SELECT * FROM menu_menuitem WHERE is_deleted = false  and is_active=TRUE and is_visible=TRUE order by url, tool_domain';
    const result = await pool.query(strQuery);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};