const express = require("express");
const cors = require("cors");
require("dotenv").config();

const colorRoutes = require('./routes/colorRoutes');
const { createColorTable } = require('./models/Color');
const colorRoutes = require('./backend/routes/colorRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
 
app.use('/api/colors', colorRoutes);
app.listen(PORT, async () => {
  await createColorTable();
  console.log(`Server running on http://localhost:${PORT}`);
});

// Routes
const menuItemRoutes = require("./routes/menuItemRoutes");
app.use("/api/menuitems", menuItemRoutes);
// Mount Color API
app.use('/api/colors', colorRoutes);

app.get("/", (req, res) => {
  res.send("✅ Welcome to DailyToolbox Backend API 🚀");
});

// ✅ Add this POST route to handle logging
app.post("/api/logs", (req, res) => {
  const { type, category, search, count } = req.body;

  console.log("📊 Log Entry Received:", {
    type,
    category,
    search,
    count,
    timestamp: new Date().toISOString()
  });

  res.status(200).json({ success: true, message: "Log received" });
});

// Your server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;