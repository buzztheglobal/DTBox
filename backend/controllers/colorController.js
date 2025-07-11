// controllers/colorController.js
const Color = require('../models/Color');

exports.saveColor = async (req, res) => {
  const { user_id, color_hex } = req.body;
  try {
    const color = await Color.saveColor({ user_id, color_hex });
    res.json(color);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getColors = async (req, res) => {
  try {
    const colors = await Color.getColors(req.params.user_id);
    res.json(colors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteColor = async (req, res) => {
  try {
    const deleted = await Color.deleteColor(req.params.id);
    res.json({ deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
