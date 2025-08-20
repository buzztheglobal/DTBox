// backend/models/TimerMessageModel.js
const pool = require("../config/db");

async function createTimerMessagesTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS public.timer_messages (
        id SERIAL PRIMARY KEY,
        room_id VARCHAR(50) NOT NULL,
        sender VARCHAR(100) DEFAULT 'Presenter',
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);

    console.log("✅ [TimerMessageModel] timer_messages table created or already exists");
  } catch (err) {
    console.error("[TimerMessageModel] Error creating timer_messages table:", err.message);
    throw err;
  }
}

module.exports = { createTimerMessagesTable };
