// File: /backend/app.js
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const menuRoutes = require('./routes/menuRoutes');
const logRoutes = require('./routes/logRoutes');
const colorRoutes = require('./routes/colorRoutes');
const formsRoutes = require('./routes/forms');
const pollRoutes = require('./routes/polls'); // ✅ polls route

// Cron job
require('./cron/pollScheduler'); // Optional

// Mount routes
app.use("/api/menuitems", menuRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/polls", pollRoutes); // ✅ mount polls route

// Health check
app.get("/", (req, res) => {
  res.send("✅ Welcome to DailyToolbox Backend API 🚀");
});

module.exports = app;
