// src/pages/tools/TimerWorldClockPage.jsx
import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import TimerWorldTabs from '../../components/timer_world_clock/TimerWorldTabs';
import {  pageContainerStyle, pageTitleStyle } from '../../styles/globalStyles';

const TimerWorldClockPage = () => {
  return (
    <Container sx={pageContainerStyle}>
      <Typography variant="h4" sx={pageTitleStyle}>⏱️ Countdown Timer & 🌍 World Clock</Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <TimerWorldTabs />
      </Paper>
    </Container>
  );
};

export default TimerWorldClockPage;
// This page serves as the main entry point for the Countdown Timer and World Clock features.
// It imports the TimerWorldTabs component which contains the logic for both functionalities.
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\TimerWorldClockPage.jsx