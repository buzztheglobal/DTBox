// backend/server.js

const express = require('express');
const cors = require('cors');
const colorRoutes = require('./routes/colorRoutes');
const { createColorTable } = require('./models/Color');

const app = express(); // ✅ Define app once
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/colors', colorRoutes);

// Server Listener
app.listen(PORT, async () => {
  await createColorTable(); // Ensures table is created on startup
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = app; // ✅ Exporting app for testability
