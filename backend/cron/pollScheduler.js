// File: backend/cron/pollScheduler.js
const cron = require('node-cron');
const db = require('../db');

// Every 1 minute
cron.schedule('* * * * *', async () => {
  try {
    // Auto-publish polls scheduled for now
    await db.query(`
      UPDATE polls 
      SET is_published = TRUE 
      WHERE scheduled_at <= NOW() AND is_published = FALSE
    `);

    // Auto-expire polls (optional: add is_expired column)
    await db.query(`
      UPDATE polls 
      SET is_active = FALSE 
      WHERE scheduled_at IS NOT NULL AND scheduled_at <= NOW()
    `);

    console.log("✅ Poll scheduler ran");
  } catch (err) {
    console.error("❌ Scheduler error", err.message);
  }
});
