// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { Pool } = require("pg");

// Route imports
const menuRoutes = require("./routes/menuRoutes") || express.Router();
const logRoutes = require("./routes/logRoutes") || express.Router();
const colorRoutes = require("./routes/colorRoutes") || express.Router();
const formsRoutes = require("./routes/forms") || express.Router();
const pollRoutes = require("./routes/polls") || express.Router();
const timezonesRoute = require("./routes/timezones") || express.Router();
const userConversionsRoute = require("./routes/userConversions") || express.Router();
const userFavoritesRoute = require("./routes/userFavorites") || express.Router();
const urlsRoutes = require("./routes/urls") || express.Router();

// Models
const { createMenuItemsTable } =
  require("./models/menuItemModel") || {
    createMenuItemsTable: async () =>
      console.log("[menuItemModel] Placeholder"),
  };
const { createLogsTable } =
  require("./models/Log") || {
    createLogsTable: async () => console.log("[Log] Placeholder"),
  };
const { createColorTable } =
  require("./models/Color") || {
    createColorTable: async () => console.log("[Color] Placeholder"),
  };

dotenv.config();

const app = express();

// --- PostgreSQL pool ---
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
console.log("✅ PostgreSQL Config:0: ", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "http://localhost:5000"],
    },
  })
);

// Logger
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// Health Check
app.get("/", (req, res) => {
  res.send("✅ Backend running at DailyToolbox 🚀");
});

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

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// --- Start Express server ---
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  try {
    await createMenuItemsTable();
    await createLogsTable();
    await createColorTable();
    console.log(`✅ Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
  }
});

// Handle port conflict
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    app.listen(PORT + 1, async () => {
      try {
        await createMenuItemsTable();
        await createLogsTable();
        await createColorTable();
        console.log(`✅ Server running on http://localhost:${PORT + 1}`);
      } catch (err) {
        console.error("❌ Error initializing database:", err.message);
      }
    });
  } else {
    console.error(err);
  }
});