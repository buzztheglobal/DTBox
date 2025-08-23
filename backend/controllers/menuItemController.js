// backend/controllers/menuItemController.js
const pool = require('../config/db');

exports.getAllMenuItems = async (req, res) => {
  try {
    console.log("✅ // backend/controllers/menuItemController.js vg");
    const strQuery = 'SELECT * FROM PUBLIC.menu_menuitem WHERE is_deleted = FALSE and is_active=TRUE and is_visible=TRUE order by url, tool_domain';
    console.log("strQuery vg: "+  strQuery);
    const result = await pool.query(strQuery);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};