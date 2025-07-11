// routes/menuItemRoutes.js

const express = require("express");
const router = express.Router();
const menuItemModel = require("../models/menuItemModel");

// @desc    GET all active & published menu items
// @route   GET /api/menuitems
router.get("/", async (req, res) => {
  try {
    const items = await menuItemModel.getAllMenuItems();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

module.exports = router;