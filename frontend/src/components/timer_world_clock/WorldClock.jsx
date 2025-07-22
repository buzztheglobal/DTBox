// src/components/timer_world_clock/WorldClock.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { formBoxStyle, cardBoxStyle } from '../../styles/globalStyles';

const defaultZones = ['Asia/Kolkata', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];

// ✅ Corrected function: Keep only this one
const fetchTime = async (zone) => {
  try {
    const encodedZone = encodeURIComponent(zone);
    const res = await fetch(`https://timeapi.io/api/time/current/zone?timeZone=${encodedZone}`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return `${data.time} (${data.date})`; // e.g., "14:35:01 (2025-07-22)"
  } catch (error) {
    console.error(`Failed to fetch time for ${zone}:`, error.message);
    return "Failed to fetch";
  }
};

const WorldClock = () => {
  const [zones, setZones] = useState(defaultZones);
  const [zoneTimes, setZoneTimes] = useState({});

  useEffect(() => {
    const updateTimes = async () => {
      const updated = {};
      for (const zone of zones) {
        updated[zone] = await fetchTime(zone);
      }
      setZoneTimes(updated);
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [zones]);

  return (
    <Box sx={formBoxStyle}>
      <Typography variant="body1" mb={2}>🌐 Real-time clocks for multiple time zones</Typography>
      <Grid container spacing={2}>
        {zones.map((zone) => (
          <Grid item xs={12} sm={6} md={4} key={zone}>
            <Paper sx={cardBoxStyle}>
              <Typography variant="h6">{zone.replace('_', ' ')}</Typography>
              <Typography variant="body1">{zoneTimes[zone] || 'Loading...'}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorldClock;
// This component displays the current time in multiple time zones.
// It fetches the time from an API and updates every second.    
// It uses MUI components for layout and styling.
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components/timer_world_clock/WorldClock.jsx