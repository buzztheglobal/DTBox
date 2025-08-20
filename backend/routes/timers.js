// backend/src/routes/timers.js
const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// Send a message
router.post("/send-message", async (req, res) => {
  const { roomId, sender, message, apiKey } = req.body;
  console.log(`[timers.js] Sending message for roomId: ${roomId}, sender: ${sender}, message: ${message}, apiKey: ${apiKey}`);

  if (!roomId || !message || !apiKey) {
    return res.status(400).json({ error: "roomId, message, and apiKey are required" });
  }

  // Mock API key validation
  if (apiKey !== "mock-api-key-123") {
    return res.status(401).json({ error: "Unauthorized: Invalid API key" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO public.timer_messages (room_id, sender, message, created_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *`,
      [roomId, sender || "Presenter", message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(`[timers.js] Error saving message: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get messages for a room
router.get("/messages/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { apiKey } = req.query;
  console.log(`[timers.js] Fetching messages for roomId: ${roomId}, apiKey: ${apiKey}`);

  if (!apiKey) {
    return res.status(400).json({ error: "apiKey is required" });
  }

  if (apiKey !== "mock-api-key-123") {
    return res.status(401).json({ error: "Unauthorized: Invalid API key" });
  }

  try {
    const result = await pool.query(
      `SELECT id, room_id, sender, message, created_at
         FROM public.timer_messages
        WHERE room_id = $1
        ORDER BY created_at DESC`,
      [roomId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(`[timers.js] Error fetching messages: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
