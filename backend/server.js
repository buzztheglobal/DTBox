// backend/server.js
const dotenv = require("dotenv");
const { Pool } = require("pg");
const helmet = require("helmet");

dotenv.config();

const app = require("./app"); // ✅ Express app with routes

// --- PostgreSQL pool ---
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
console.log("✅ PostgreSQL Config:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Security headers
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

// --- DB Table Creators ---
const { createMenuItemsTable } =
  require("./models/menuItemModel") || {
    createMenuItemsTable: async () => console.log("[menuItemModel] Placeholder"),
  };
const { createLogsTable } =
  require("./models/Log") || {
    createLogsTable: async () => console.log("[Log] Placeholder"),
  };
const { createColorTable } =
  require("./models/Color") || {
    createColorTable: async () => console.log("[Color] Placeholder"),
  };

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// --- Start Express server ---
const PORT = process.env.PORT || 5000;
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
