// backend/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const { getAllMenuItems } = require('../controllers/menuItemController');

router.get('/', getAllMenuItems); // GET /api/menuitems

module.exports = router;