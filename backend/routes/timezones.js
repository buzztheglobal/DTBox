// backend/routes/timezones.js
//C:\Users\gupta\Documents\DailyToolbox\backend\routes\timezones.js
const express = require('express');
const router = express.Router();
const { DateTime } = require('luxon');

console.log('timezones - VGUPTA'); 

router.get('/', (req, res) => {
  console.log('📡 /api/timezones route hit'); // ✅ Add this line

  const zones = Intl.supportedValuesOf('timeZone');
  const now = DateTime.now();

  const zoneDetails = zones.map((zone) => {
    const dt = now.setZone(zone);
    return {
      label: `${zone} (UTC${dt.toFormat('Z')})`,
      value: zone,
      offset: dt.toFormat('Z'),
      abbreviation: dt.offsetNameShort,
      observesDST: dt.isInDST,
      currentTime: dt.toFormat('yyyy-MM-dd HH:mm')
    };
  });

  res.json(zoneDetails);
});

module.exports = router;
