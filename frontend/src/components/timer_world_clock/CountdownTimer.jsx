// src/components/timer_world_clock/CountdownTimer.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box, TextField, Button, Typography, Stack, Alert
} from '@mui/material';
import {
  toolButtonStyle, formBoxStyle
} from '../../styles/globalStyles';

const parseHMS = (str) => {
  const match = str.match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
  if (!match) return null;
  const [_, h, m, s] = match.map(Number);
  if (m > 59 || s > 59) return null;
  return h * 3600 + m * 60 + s;
};

const formatSeconds = (totalSec) => {
  const h = Math.floor(totalSec / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
  const s = (totalSec % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const CountdownTimer = () => {
  const [input, setInput] = useState('');
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    if (running && remaining > 0) {
      timerRef.current = setInterval(() => {
        setRemaining((prev) => prev - 1);
      }, 1000);
    }

    if (remaining === 0 && running) {
      setRunning(false);
      clearInterval(timerRef.current);
      alert("⏰ Time's up!");
    }

    return () => clearInterval(timerRef.current);
  }, [running, remaining]);

  const handleStart = () => {
    const seconds = parseHMS(input);
    if (seconds === null) {
      setError('Invalid format. Use hh:mm:ss with minutes/seconds < 60.');
      return;
    }
    setRemaining(seconds);
    setRunning(true);
    setError('');
  };

  const handlePause = () => {
    setRunning(false);
    clearInterval(timerRef.current);
  };

  const handleReset = () => {
    setRunning(false);
    setRemaining(0);
    setInput('');
    setError('');
    clearInterval(timerRef.current);
  };

  return (
    <Box sx={formBoxStyle}>
      <Typography variant="h6" gutterBottom>⏳ Countdown Timer (hh:mm:ss)</Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      <TextField
        fullWidth
        label="Enter time (hh:mm:ss)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button onClick={handleStart} sx={toolButtonStyle}>Start</Button>
        <Button onClick={handlePause} sx={toolButtonStyle}>Pause</Button>
        <Button onClick={handleReset} sx={toolButtonStyle}>Reset</Button>
      </Stack>

      <Typography variant="h5">
        ⏱️ {formatSeconds(remaining)}
      </Typography>
    </Box>
  );
};

export default CountdownTimer;
// This component implements a countdown timer with hh:mm:ss format.
// It allows users to start, pause, and reset the timer.


// It uses MUI components for styling and layout.
// The timer updates every second and alerts the user when time is up.
// The input is validated to ensure it follows the correct format.
// The timer state is managed using React hooks, and the countdown logic is handled with setInterval
// and clearInterval to manage the timer lifecycle.
// The component is styled using a custom formBoxStyle for consistent appearance with other tools.