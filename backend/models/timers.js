// backend/src/routes/timers.js
const express = require('express');
const pool = require('../config/db');

const router = express.Router();

// Send a message
router.post('/send-message', async (req, res) => {
  const { roomId, message } = req.body;
  console.log(`[timers.js] Sending message for roomId: ${roomId}, message: ${message}`);

  if (!roomId || !message) {
    console.log('[timers.js] Missing roomId or message');
    return res.status(400).json({ error: 'roomId and message are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO public.timer_messages (room_id, message, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *',
      [roomId, message]
    );
    console.log(`[timers.js] Message saved: ${JSON.stringify(result.rows[0])}`);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(`[timers.js] Error saving message: ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get messages for a room
router.get('/messages/:roomId', async (req, res) => {
  const { roomId } = req.params;
  console.log(`[timers.js] Fetching messages for roomId: ${roomId}`);

  try {
    const result = await pool.query(
      'SELECT * FROM public.timer_messages WHERE room_id = $1 ORDER BY created_at DESC',
      [roomId]
    );
    console.log(`[timers.js] Messages fetched: ${JSON.stringify(result.rows)}`);
    res.json(result.rows);
  } catch (err) {
    console.error(`[timers.js] Error fetching messages: ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;