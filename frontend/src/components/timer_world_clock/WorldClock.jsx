// src/components/timer_world_clock/WorldClock.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper,
  Autocomplete, TextField, Button, IconButton, Switch, FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  formBoxStyle, cardBoxStyle, toolButtonStyle
} from '../../styles/globalStyles';

const defaultZones = ['Asia/Kolkata', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
const allTimeZones = Intl.supportedValuesOf('timeZone');

// ⏰ Fallback using Intl API
const fallbackTime = (zone) => {
  try {
    const now = new Date();
    const time = new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: zone
    }).format(now);

    const dateParts = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: zone
    }).formatToParts(now);

    const formattedDate = `${dateParts[0].value}/${dateParts[2].value}/${dateParts[4].value}`;
    return { date: now, text: time, formattedDate };
  } catch {
    return { date: null, text: 'Invalid Date', formattedDate: 'Invalid Date' };
  }
};

// 📦 Cache and Drift Simulation
const fetchTime = async (zone) => {
  try {
    const res = await fetch(`https://worldtimeapi.org/api/timezone/${zone}`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    if (!data.datetime) throw new Error("Missing datetime");

    const serverDate = new Date(data.datetime);
    const drift = serverDate.getTime() - Date.now(); // drift in ms

    // Save to session cache
    sessionStorage.setItem(zone, JSON.stringify({
      drift,
      lastSync: Date.now()
    }));

    return { date: serverDate, text: serverDate.toLocaleTimeString(), formattedDate: formatDate(serverDate) };
  } catch (error) {
    console.warn(`Fallback for ${zone}:`, error.message);

    // Try drift cache
    const cached = sessionStorage.getItem(zone);
    if (cached) {
      const { drift } = JSON.parse(cached);
      const simulated = new Date(Date.now() + drift);
      return {
        date: simulated,
        text: simulated.toLocaleTimeString(),
        formattedDate: formatDate(simulated)
      };
    }

    // Final fallback
    return fallbackTime(zone);
  }
};

// 📆 Format Date to DD/MMM/YYYY
const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return 'Invalid Date';
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const WorldClock = () => {
  const [zones, setZones] = useState(defaultZones);
  const [zoneTimes, setZoneTimes] = useState({});
  const [is24Hour, setIs24Hour] = useState(true);

  // Update all timezones
  const updateTimes = async () => {
    const updated = {};
    for (const zone of zones) {
      updated[zone] = await fetchTime(zone);
    }
    setZoneTimes(updated);
  };

  useEffect(() => {
    updateTimes();
    const interval = setInterval(updateTimes, 60000); // every minute
    return () => clearInterval(interval);
  }, [zones]);

  const handleAddZone = (_, value) => {
    if (value && !zones.includes(value)) {
      setZones([...zones, value]);
    }
  };

  const handleRemoveZone = (zoneToRemove) => {
    setZones(zones.filter(zone => zone !== zoneToRemove));
    const updatedTimes = { ...zoneTimes };
    delete updatedTimes[zoneToRemove];
    setZoneTimes(updatedTimes);
  };

  const handleReset = () => {
    setZones(defaultZones);
    setZoneTimes({});
  };

  const formatTime = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: !is24Hour
    });
  };

  return (
    <Box sx={formBoxStyle}>
      <Typography variant="body1" mb={2}>🌐 Real-time clocks for multiple time zones</Typography>

      {/* 12/24h toggle */}
      <FormControlLabel
        control={
          <Switch
            checked={is24Hour}
            onChange={(e) => setIs24Hour(e.target.checked)}
            color="primary"
          />
        }
        label={is24Hour ? '24h Format' : '12h Format'}
        sx={{ mb: 2 }}
      />

      {/* Add + Reset Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <Autocomplete
          options={allTimeZones}
          onChange={handleAddZone}
          renderInput={(params) => (
            <TextField {...params} label="Add Timezone" variant="outlined" />
          )}
          disableClearable
          sx={{ flex: '1 1 60%' }}
        />
        <Button onClick={handleReset} sx={{ ...toolButtonStyle, flex: '1 1 35%' }}>
          Reset to Default
        </Button>
      </Box>

      {/* Clock Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {zones.map((zone) => {
          const timeData = zoneTimes[zone];
          return (
            <Paper
              key={zone}
              sx={{
                ...cardBoxStyle,
                textAlign: 'center',
                position: 'relative',
                flex: '1 1 calc(33.33% - 1rem)',
                minWidth: 240
              }}
            >
              <IconButton
                size="small"
                onClick={() => handleRemoveZone(zone)}
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <Typography variant="h6" mt={1}>
                {zone.replace('_', ' ')}
              </Typography>

              {timeData ? (
                <>
                  <Typography
                    variant="h4"
                    mt={1}
                    sx={{
                      fontFamily: "'Orbitron', monospace",
                      letterSpacing: 1.5,
                      color: '#222'
                    }}
                  >
                    {formatTime(timeData.date)}
                  </Typography>
                  <Typography variant="body2" mt={0.5}>
                    {timeData.formattedDate}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2">Loading...</Typography>
              )}
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default WorldClock;
// src/components/timer_world_clock/WorldClock.jsx