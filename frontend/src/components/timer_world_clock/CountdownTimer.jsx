// src/components/timer_world_clock/CountdownTimer.jsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { toolButtonStyle, formBoxStyle } from '../../styles/globalStyles';

const CountdownTimer = () => {
  const [duration, setDuration] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    let timer;
    if (running && remaining > 0) {
      timer = setInterval(() => setRemaining((r) => r - 1), 1000);
    } else if (remaining <= 0 && running) {
      setRunning(false);
      alert(`${label || 'Countdown'} complete!`);
    }
    return () => clearInterval(timer);
  }, [running, remaining]);

  const startTimer = () => {
    setRemaining(duration);
    setRunning(true);
  };

  return (
    <Box sx={formBoxStyle}>
      <TextField fullWidth label="Countdown Label" value={label} onChange={(e) => setLabel(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Duration (in seconds)" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} sx={{ mb: 2 }} />
      <Box display="flex" gap={2} mb={2}>
        <Button onClick={startTimer} sx={toolButtonStyle}>Start</Button>
        <Button onClick={() => setRunning(false)} sx={toolButtonStyle}>Pause</Button>
        <Button onClick={() => { setRunning(false); setRemaining(0); }} sx={toolButtonStyle}>Reset</Button>
      </Box>
      <Typography variant="h6">⏳ Remaining: {remaining} sec</Typography>
    </Box>
  );
};

export default CountdownTimer;
// This component implements a simple countdown timer.
// It allows users to set a duration, start the countdown, pause it, and reset it.
// The timer updates every second and alerts the user when the countdown completes.
// It uses MUI components for styling and layout.
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components/timer_world_clock/CountdownTimer.jsx