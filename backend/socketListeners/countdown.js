// backend/socketListeners/countdown.js
const fs = require("fs");
const path = require("path");
const pool = require("../db"); // PostgreSQL connection pool

const timersFilePath = path.join(__dirname, "../data/timers.json");

// Save snapshot to file
function saveTimersToFile(cache) {
  fs.writeFileSync(timersFilePath, JSON.stringify(cache, null, 2), "utf8");
}

// Save one room’s timers to DB
async function saveRoomTimersToDB(roomId, timers) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const timer of timers) {
      await client.query(
        `
        INSERT INTO timer_states (id, room_id, label, duration_seconds, remaining_seconds, is_running, scheduled_at, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        ON CONFLICT (id)
        DO UPDATE SET
          label = EXCLUDED.label,
          duration_seconds = EXCLUDED.duration_seconds,
          remaining_seconds = EXCLUDED.remaining_seconds,
          is_running = EXCLUDED.is_running,
          scheduled_at = EXCLUDED.scheduled_at,
          updated_at = NOW()
        `,
        [
          timer.id,
          roomId,
          timer.label,
          timer.duration,
          timer.remaining,
          timer.isRunning,
          timer.scheduledAt || null,
        ]
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(`❌ Error saving timers for room ${roomId}:`, err);
  } finally {
    client.release();
  }
}

// Delete a timer row from DB
async function deleteTimerFromDB(timerId) {
  try {
    await pool.query(`DELETE FROM timer_states WHERE id = $1`, [timerId]);
    console.log(`🗑️ Deleted timer ${timerId} from DB`);
  } catch (err) {
    console.error(`❌ Error deleting timer ${timerId}:`, err);
  }
}

// Restore all timers from DB into global cache
async function restoreTimersFromDB() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT id, room_id, label, duration_seconds, remaining_seconds, is_running, scheduled_at
         FROM timer_states`
    );

    const restored = {};

    for (const row of rows) {
      if (!restored[row.room_id]) restored[row.room_id] = [];

      restored[row.room_id].push({
        id: row.id,
        label: row.label,
        duration: row.duration_seconds,
        remaining: row.remaining_seconds,
        isRunning: false, // ✅ always pause after crash
        scheduledAt: row.scheduled_at || null,
      });
    }

    console.log(`🔄 Restored timers for ${Object.keys(restored).length} rooms`);
    return restored;
  } catch (err) {
    console.error("❌ Failed to restore timers:", err);
    return {};
  } finally {
    client.release();
  }
}

// Single global ticking loop
function startGlobalCountdown(io) {
  if (global.stageTimerLoop) {
    console.warn("⚠️ Global countdown already running");
    return;
  }

  let tickCounter = 0;

  global.stageTimerLoop = setInterval(async () => {
    let anyChanged = false;

    for (const [roomId, { timers }] of Object.entries(global.stageTimerCache)) {
      let roomChanged = false;

      timers.forEach((timer) => {
        if (timer.isRunning && timer.remaining > 0) {
          timer.remaining -= 1;
          roomChanged = true;
          anyChanged = true;

          if (timer.remaining <= 0) {
            timer.isRunning = false;
          }
        }
      });

      if (roomChanged) {
        io.to(roomId).emit("timersUpdated", timers);
      }
    }

    tickCounter++;

    // Save JSON snapshot for all rooms
    if (anyChanged) saveTimersToFile(global.stageTimerCache);

    // Every 5s, sync all active rooms to DB
    if (tickCounter % 5 === 0 && anyChanged) {
      for (const [roomId, { timers }] of Object.entries(
        global.stageTimerCache
      )) {
        await saveRoomTimersToDB(roomId, timers).catch((err) =>
          console.error(`❌ Error syncing timers for ${roomId}:`, err)
        );
      }
    }
  }, 1000);
}

module.exports = {
  restoreTimersFromDB,
  startGlobalCountdown,
  saveRoomTimersToDB,
  deleteTimerFromDB,
};
