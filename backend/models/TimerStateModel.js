// backend/src/models/TimerStateModel.js
// backend/models/TimerStateModel.js
const pool = require("../db");

async function createTimerStatesTable() {
  try {
    // Ensure parent rooms table exists (for FK cascade)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.rooms (
        room_id VARCHAR(50) PRIMARY KEY
      );
    `);

    // Ensure timer_states table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.timer_states (
        id SERIAL PRIMARY KEY,
        room_id VARCHAR(50) NOT NULL REFERENCES public.rooms(room_id) ON DELETE CASCADE,
        label VARCHAR(100),
        duration_seconds INTEGER NOT NULL,
        remaining_seconds INTEGER NOT NULL,
        is_running BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // --- Safe migrations ---
    await pool.query(
      `ALTER TABLE public.timer_states ADD COLUMN IF NOT EXISTS label VARCHAR(100);`
    );
    await pool.query(
      `ALTER TABLE public.timer_states ADD COLUMN IF NOT EXISTS duration_seconds INTEGER;`
    );
    await pool.query(
      `ALTER TABLE public.timer_states ADD COLUMN IF NOT EXISTS remaining_seconds INTEGER;`
    );
    await pool.query(
      `ALTER TABLE public.timer_states ADD COLUMN IF NOT EXISTS is_running BOOLEAN DEFAULT FALSE;`
    );
    await pool.query(
      `ALTER TABLE public.timer_states ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`
    );
    await pool.query(
      `ALTER TABLE public.timer_states ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`
    );

    console.log("✅ [TimerStateModel] timer_states + rooms tables ready (with FK cascade)");
  } catch (err) {
    console.error("[TimerStateModel] Error creating timer_states table:", err.message);
    throw err;
  }
}

module.exports = { createTimerStatesTable };


//C:\Users\gupta\Documents\DailyToolbox\backend\models\TimerStateModel.js