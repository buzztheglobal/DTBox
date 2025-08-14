// File: /backend/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
//

// ✅ Logger Middleware
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Route Modules
const menuRoutes = require("./routes/menuRoutes");
const logRoutes = require("./routes/logRoutes");
const colorRoutes = require("./routes/colorRoutes");
const formsRoutes = require("./routes/forms");
const pollRoutes = require("./routes/polls");
const timezonesRoute = require("./routes/timezones");
const userConversionsRoute = require("./routes/userConversions");
const userFavoritesRoute = require("./routes/userFavorites");
const urlsRoutes = require("./routes/urls"); // <-- New URL shortener routes

console.log("🟢 server.js is running");

// ✅ Register Routes
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
app.use("/api/urls", urlsRoutes); // <-- Register URL shortener routes

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("✅ Backend running at DailyToolbox 🚀");
});

// ✅ DB Table Creators
const { createMenuItemsTable } = require("./models/menuItemModel");
const { createLogsTable } = require("./models/Log");
const { createColorTable } = require("./models/Color");

// ✅ Start Server & Initialize DB
app.listen(PORT, async () => {
  try {
    await createMenuItemsTable();
    await createLogsTable();
    await createColorTable();
    console.log(`✅ Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
  }
});

module.exports = app;
