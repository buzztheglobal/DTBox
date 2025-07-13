// backend/controllers/logController.js
const { insertLog } = require('../models/Log');

exports.logEvent = async (req, res) => {
  try {
    const { type, category, search, count } = req.body;

    const savedLog = await insertLog({ type, category, search, count });

    res.status(201).json({
      success: true,
      message: 'Log saved',
      data: savedLog
    });
  } catch (err) {
    console.error('❌ Error saving log:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
