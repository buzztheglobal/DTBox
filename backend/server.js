// backend/server.js
//C:\Users\gupta\Documents\DailyToolbox\backend\server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Import route modules
const menuRoutes = require('./routes/menuRoutes');
const logRoutes = require('./routes/logRoutes');
const colorRoutes = require('./routes/colorRoutes');
const formsRouter = require('./routes/forms');

// ✅ Import DB table creators
const { createMenuItemsTable } = require('./models/menuItemModel');
const { createLogsTable } = require('./models/Log');
const { createColorTable } = require('./models/Color');

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Logger
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Register routes
app.use('/api/menuitems', menuRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/colors', colorRoutes);
app.use('/api/forms', formsRouter); // 👈 Add this line

// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ Backend running');
});

// ✅ Start server and init DB
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
//C:\Users\gupta\Documents\DailyToolbox\backend\server.js