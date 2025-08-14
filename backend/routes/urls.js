// backend/routes/urls.js
// File: /backend/routes/urls.js
const express = require("express");
const { nanoid } = require("nanoid");
const pool = require("../db");

const router = express.Router();

/**
 * POST /api/urls/shorten
 * Creates a short URL
 */
router.post("/shorten", async (req, res) => {
  try {
    const { original_url, user_id } = req.body;

    if (!original_url) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const shortCode = nanoid(8);

    const result = await pool.query(
      `INSERT INTO urls (original_url, short_code, user_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [original_url, shortCode, user_id || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/urls/list
 * Retrieves all short URLs
 */
router.get("/list", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM urls ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/urls/analytics/:shortCode
 * Retrieves analytics for a short URL
 */
router.get("/analytics/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const result = await pool.query(
      `SELECT * FROM urls WHERE short_code = $1`,
      [shortCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/urls/resolve/:shortCode
 * Finds original URL, increments click count, and returns it
 */
router.get("/resolve/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const result = await pool.query(
      `SELECT original_url FROM urls WHERE short_code = $1`,
      [shortCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    await pool.query(
      `UPDATE urls SET click_count = click_count + 1 WHERE short_code = $1`,
      [shortCode]
    );

    res.json({ original_url: result.rows[0].original_url });
  } catch (error) {
    console.error("Error resolving short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

//C:\Users\gupta\Documents\DailyToolbox\backend\routes\urls.js