const express = require("express");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
 
 

// Routes
const menuItemRoutes = require("./routes/menuRoutes");
app.use("/api/menuitems", menuItemRoutes);
// Mount Color API
app.use('/api/colors', colorRoutes);

app.get("/", (req, res) => {
  res.send("✅ Welcome to DailyToolbox Backend API 🚀");
});

// // ✅ Add this POST route to handle logging
// app.post("/api/logs", (req, res) => {
//   const { type, category, search, count } = req.body;

//   console.log("📊 Log Entry Received:", {
//     type,
//     category,
//     search,
//     count,
//     timestamp: new Date().toISOString()
//   });

//   res.status(200).json({ success: true, message: "Log received" });
// });

// Your server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;