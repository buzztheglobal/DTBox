// backend/scripts/seedFavorites.js
const pool = require('../config/db');

async function seedFavorites() {
  const demoUser = 'demo_user';
  const demoZones = [
    'Asia/Kolkata',
    'Europe/London',
    'America/New_York',
    'Asia/Tokyo'
  ];

  try {
    for (const tz of demoZones) {
      await pool.query(
        `INSERT INTO user_favorites (user_id, timezone) VALUES ($1, $2)`,
        [demoUser, tz]
      );
    }
    console.log('✅ Demo favorites inserted');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seedFavorites();
