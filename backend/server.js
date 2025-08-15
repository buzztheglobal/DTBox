// backend/src/server.js
// backend/src/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const urlRoutes = require('./routes/urls');
const timersRoutes = require('./routes/timers');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// Route Modules (placeholders for missing routes)
const menuRoutes = require("./routes/menuRoutes") || express.Router();
const logRoutes = require("./routes/logRoutes") || express.Router();
const colorRoutes = require("./routes/colorRoutes") || express.Router();
const formsRoutes = require("./routes/forms") || express.Router();
const pollRoutes = require("./routes/polls") || express.Router();
const timezonesRoute = require("./routes/timezones") || express.Router();
const userConversionsRoute = require("./routes/userConversions") || express.Router();
const userFavoritesRoute = require("./routes/userFavorites") || express.Router();
const urlsRoutes = require("./routes/urls");

console.log("🟢 server.js is running");

// Register Routes
app.use("/api/menuitems", menuRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/polls", pollRoutes);
console.log("🛠 before /api/timezones");
app.use("/api/timezones", timezonesRoute);
console.log("🛠 after /api/timezones");
app.use("/api/user-conversions", userConversionsRoute);
app.use("/api/user-favorites", userFavoritesRoute);
app.use("/api/urls", urlsRoutes);
app.use("/api/timers", timersRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("✅ Backend running at DailyToolbox 🚀");
});

// DB Table Creators (placeholders for missing models)
const { createMenuItemsTable } = require("./models/menuItemModel") || { createMenuItemsTable: async () => console.log('[menuItemModel] Placeholder') };
const { createLogsTable } = require("./models/Log") || { createLogsTable: async () => console.log('[Log] Placeholder') };
const { createColorTable } = require("./models/Color") || { createColorTable: async () => console.log('[Color] Placeholder') };
const { createTimerMessagesTable } = require("./models/TimerMessageModel");

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start Server & Initialize DB
const server = app.listen(PORT, async () => {
  try {
    await createMenuItemsTable();
    await createLogsTable();
    await createColorTable();
    await createTimerMessagesTable();
    console.log(`✅ Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
  }
});

// Handle port conflict
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    app.listen(PORT + 1, async () => {
      try {
        await createMenuItemsTable();
        await createLogsTable();
        await createColorTable();
        await createTimerMessagesTable();
        console.log(`✅ Server running on http://localhost:${PORT + 1}`);
      } catch (err) {
        console.error("❌ Error initializing database:", err.message);
      }
    });
  } else {
    console.error(err);
  }
});