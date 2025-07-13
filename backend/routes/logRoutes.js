// backend/routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/', logController.logEvent);

router.post('/', (req, res) => {
  const { type, category, search, count } = req.body;

  console.log("📊 Log Entry Received:", {
    type,
    category,
    search,
    count,
    timestamp: new Date().toISOString()
  });

  res.status(200).json({ success: true, message: "Log received" });
});

module.exports = router;
