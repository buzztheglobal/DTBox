// backend/socketHandlers/stageTimer.js
module.exports = function stageTimerHandler(io, socket) {
  console.log(`[StageTimer] Client connected: ${socket.id}`);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`[StageTimer] Client ${socket.id} joined room: ${roomId}`);
  });

  socket.on('updateTimer', async (data) => {
    try {
      const { roomId, timerId, duration, timeLeft, isRunning, apiKey } = data;

      // Optional: Validate API key
      if (!apiKey || apiKey !== process.env.API_KEY) {
        return socket.emit('error', { error: 'Invalid API key' });
      }

      // Keep an in-memory cache to prevent redundant DB writes
      if (!global.stageTimerCache) {
        global.stageTimerCache = {};
      }

      const cacheKey = `${roomId}-${timerId}`;
      const prevState = global.stageTimerCache[cacheKey];
      const newState = { duration, timeLeft, isRunning };

      // Skip if no changes
      if (
        prevState &&
        prevState.duration === duration &&
        prevState.timeLeft === timeLeft &&
        prevState.isRunning === isRunning
      ) {
        return;
      }

      // Update cache
      global.stageTimerCache[cacheKey] = newState;

      // Broadcast to room (excluding sender)
      socket.to(roomId).emit('timerUpdated', { timerId, duration, timeLeft, isRunning });

      // Persist to DB (example: PostgreSQL)
      await saveTimerToDB(roomId, timerId, duration, timeLeft, isRunning);

      console.log(`[StageTimer] Updated timer ${timerId} in room ${roomId}:`, newState);
    } catch (err) {
      console.error(`[StageTimer] Error handling updateTimer:`, err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`[StageTimer] Client disconnected: ${socket.id}`);
  });
};

// Example DB persistence
async function saveTimerToDB(roomId, timerId, duration, timeLeft, isRunning) {
  // Replace with your actual DB logic
  console.log(`[DB] Saving timer ${timerId} for room ${roomId}`);
  // await db.query(
  //   'INSERT INTO stage_timers (room_id, timer_id, duration, time_left, is_running) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (room_id, timer_id) DO UPDATE SET duration = EXCLUDED.duration, time_left = EXCLUDED.time_left, is_running = EXCLUDED.is_running',
  //   [roomId, timerId, duration, timeLeft, isRunning]
  // );
}
//C:\Users\gupta\Documents\DailyToolbox\backend\socketHandlers\stageTimer.js