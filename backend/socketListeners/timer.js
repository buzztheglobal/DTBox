// backend/src/socketListeners/timer.js
const pool = require("../config/db");
const {
  ensureRoomLoaded,
  getTimersForRoom,
  addTimerToRoom,
  startTimerInRoom,
  stopTimerInRoom,
  resetTimerInRoom,
  extendTimerInRoom,
  deleteTimerInRoom,
  loadTimersFromDB,
} = require("./countdown");
const { saveRoomTimersToDB, deleteTimerFromDB } = require("./countdown");

// --- DB helpers for messages ---
async function insertTimerMessage(roomId, sender, message) {
  await pool.query(
    `INSERT INTO public.timer_messages (room_id, sender, message, created_at)
     VALUES ($1, $2, $3, NOW())`,
    [roomId, sender || "Presenter", message]
  );
}

async function fetchRecentMessages(roomId, limit = 25) {
  const { rows } = await pool.query(
    `SELECT id, room_id, sender, message, created_at
       FROM public.timer_messages
      WHERE room_id = $1
      ORDER BY created_at DESC
      LIMIT $2`,
    [roomId, limit]
  );
  return rows;
}

function timerSocketHandler(io, socket) {
  // Join room & initial sync
  socket.on("joinRoom", async (roomId) => {
    try {
      socket.join(roomId);
      await ensureRoomLoaded(roomId);
      const [timers, messages] = await Promise.all([
        getTimersForRoom(roomId),
        fetchRecentMessages(roomId, 25),
      ]);
      io.to(socket.id).emit("timersUpdated", timers);
      io.to(socket.id).emit("presenterMessages", messages.reverse());
      console.log(`[Socket] ${socket.id} joined room ${roomId}`);
    } catch (err) {
      console.error(`[Socket] joinRoom error:`, err);
      io.to(socket.id).emit("error", { message: "Failed to join room." });
    }
  });

  // --- Controller actions (persist immediately) ---
  socket.on("addTimer", async ({ roomId, label, duration, scheduledAt }) => {
    try {
      await ensureRoomLoaded(roomId);
      await addTimerToRoom(roomId, {
        label,
        duration: Number(duration) || 0,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      });
      const timers = await getTimersForRoom(roomId);
      await saveRoomTimersToDB(roomId, timers);
      io.to(roomId).emit("timersUpdated", timers);
    } catch (err) {
      console.error(`[Socket] addTimer error:`, err);
    }
  });

  socket.on("startTimer", async ({ roomId, timerId }) => {
    try {
      await startTimerInRoom(roomId, timerId);
      const timers = await getTimersForRoom(roomId);
      await saveRoomTimersToDB(roomId, timers);
      io.to(roomId).emit("timersUpdated", timers);
    } catch (err) {
      console.error(`[Socket] startTimer error:`, err);
    }
  });

  socket.on("stopTimer", async ({ roomId, timerId }) => {
    try {
      await stopTimerInRoom(roomId, timerId);
      const timers = await getTimersForRoom(roomId);
      await saveRoomTimersToDB(roomId, timers);
      io.to(roomId).emit("timersUpdated", timers);
    } catch (err) {
      console.error(`[Socket] stopTimer error:`, err);
    }
  });

  socket.on("resetTimer", async ({ roomId, timerId }) => {
    try {
      await resetTimerInRoom(roomId, timerId);
      const timers = await getTimersForRoom(roomId);
      await saveRoomTimersToDB(roomId, timers);
      io.to(roomId).emit("timersUpdated", timers);
    } catch (err) {
      console.error(`[Socket] resetTimer error:`, err);
    }
  });

  socket.on("extendTimer", async ({ roomId, timerId, seconds }) => {
    try {
      await extendTimerInRoom(roomId, timerId, Number(seconds) || 0);
      const timers = await getTimersForRoom(roomId);
      await saveRoomTimersToDB(roomId, timers);
      io.to(roomId).emit("timersUpdated", timers);
    } catch (err) {
      console.error(`[Socket] extendTimer error:`, err);
    }
  });

  socket.on("deleteTimer", async ({ roomId, timerId }) => {
    try {
      await deleteTimerInRoom(roomId, timerId);
      await deleteTimerFromDB(timerId); // 🗑️ delete from DB too
      const timers = await getTimersForRoom(roomId);
      io.to(roomId).emit("timersUpdated", timers);
    } catch (err) {
      console.error(`[Socket] deleteTimer error:`, err);
    }
  });

  // --- Presenter messages ---
  socket.on("sendPresenterMessage", async ({ roomId, sender, message }, ack) => {
    try {
      const msg = (message || "").trim();
      if (!msg) {
        ack && ack({ status: "error", error: "Empty message" });
        return;
      }
      const safeSender = sender || "Presenter";
      await insertTimerMessage(roomId, safeSender, msg);

      const payload = {
        roomId,
        sender: safeSender,
        message: msg,
        timestamp: Date.now(),
      };
      io.to(roomId).emit("presenterMessage", payload);

      const recent = await fetchRecentMessages(roomId, 25);
      io.to(roomId).emit("presenterMessages", recent.reverse());
      ack && ack({ status: "ok" });
    } catch (err) {
      console.error(`[Socket] sendPresenterMessage error:`, err);
      ack && ack({ status: "error", error: "Failed to send message" });
    }
  });

  socket.on("getPresenterMessages", async ({ roomId }) => {
    try {
      const recent = await fetchRecentMessages(roomId, 25);
      io.to(socket.id).emit("presenterMessages", recent.reverse());
    } catch (err) {
      console.error(`[Socket] getPresenterMessages error:`, err);
    }
  });

  socket.on("reloadTimersFromDB", async ({ roomId }) => {
    try {
      await loadTimersFromDB(roomId, true);
      const timers = await getTimersForRoom(roomId);
      await saveRoomTimersToDB(roomId, timers);
      io.to(roomId).emit("timersUpdated", timers);
    } catch (err) {
      console.error(`[Socket] reloadTimersFromDB error:`, err);
    }
  });
}

module.exports = timerSocketHandler;
