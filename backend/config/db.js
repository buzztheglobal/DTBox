// backend/config/db.js
require('dotenv').config();
const { Pool } = require('pg');

console.log("DB_USER:", process.env.DB_USER); // for testing

const dbConfig = {
  user: String(process.env.DB_USER),
  host: String(process.env.DB_HOST),
  database: String(process.env.DB_NAME),
  password: String(process.env.DB_PASS),
  port: parseInt(process.env.DB_PORT || '5432', 10),
};

console.log('DB_USER:', dbConfig.user);
console.log('DB_PASS:', dbConfig.password);
console.log('DB_HOST:', dbConfig.host);
console.log('DB_PORT:', dbConfig.port);
console.log('DB_NAME:', dbConfig.database);

console.log('✅ PostgreSQL Config: 1: ', dbConfig); // Debug output
if (typeof dbConfig.password !== 'string' || !dbConfig.password.length) {
  throw new Error('[FATAL] DB_PASS is not a valid string');
}

const pool = new Pool(dbConfig);

console.log('[server.js] typeof DB_PASS:', typeof process.env.DB_PASS, '| Value:', process.env.DB_PASS);


pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected Successfully"))
  .catch(err => {
    console.error("❌ PostgreSQL Connection Failed:", err.message);
    process.exit(1);
  });

module.exports = pool;