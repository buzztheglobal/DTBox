// server/routes/colorRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // PostgreSQL pool
const colorController = require('../controllers/colorController');
 

router.post('/save', colorController.saveColor);
router.get('/:user_id', colorController.getColors);
router.delete('/:id', colorController.deleteColor);

router.get('/', (req, res) => {
  res.send('🎨 Color API is running. Please use /api/colors/:user_id');
});

module.exports = router;
