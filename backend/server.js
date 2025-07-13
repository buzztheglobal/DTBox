// backend/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Import routes
const menuRoutes = require('./routes/menuRoutes');
const logRoutes = require('./routes/logRoutes');
const colorRoutes = require('./routes/colorRoutes');

// ✅ Import DB setup functions
const { createMenuItemsTable } = require('./models/menuItemModel');
const { createLogsTable } = require('./models/Log');
const { createColorTable } = require('./models/Color');

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Log incoming requests
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Register API routes
app.use('/api/menuitems', menuRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/colors', colorRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ Backend running');
});

// ✅ Start server and initialize DB tables
app.listen(PORT, async () => {
  try {
    await createMenuItemsTable();
    await createLogsTable();
    await createColorTable();
    console.log(`✅ Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('❌ Error initializing database:', err.message);
  }
});

module.exports = app;
