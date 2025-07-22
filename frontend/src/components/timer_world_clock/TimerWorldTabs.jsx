// src/components/timer_world_clock/TimerWorldTabs.jsx
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import CountdownTimer from './CountdownTimer';
import WorldClock from './WorldClock';
import {
    formBoxStyle
} from '../../styles/globalStyles';

const TimerWorldTabs = () => {
  const [tab, setTab] = useState(0);
  const handleChange = (_, newValue) => setTab(newValue);

  return (
    <Box sx={{ width: '100%', formBoxStyle }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Countdown and World Clock Tabs"
        sx={{ mb: 2 }}
      >
        <Tab label="Countdown Timer" />
        <Tab label="World Clock" />
      </Tabs>
      {tab === 0 && <CountdownTimer />}
      {tab === 1 && <WorldClock />}
    </Box>
  );
};

export default TimerWorldTabs;
// This component manages the tabs for Countdown Timer and World Clock.
// It uses MUI Tabs for navigation and conditionally renders the appropriate component based on the selected tab.
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components/timer_world_clock/TimerWorldTabs.jsx