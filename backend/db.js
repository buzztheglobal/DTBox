//C:\Users\gupta\Documents\DailyToolbox\backend\db.js
// ✅ File: backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://dailytoolbox_user:dailytoolbox_pwd@localhost:5432/dailytoolbox_db'
});

// ✅ Export raw pool object so `.connect()` and `.query()` work
module.exports = pool;


//C:\Users\gupta\Documents\DailyToolbox\backend\db.js
// 