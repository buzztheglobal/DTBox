// C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\StageTimerPage.jsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import TimerControlPanel from '../../components/stage_timer/TimerControlPanel';
import QRCodePanel from '../../components/stage_timer/QRCodePanel';
import { pageTitleStyle,formBoxStyle, formFieldStyle, toolButtonStyle } from '../../styles/globalStyles';
import '../../App.css';

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function StageTimerPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box className="calculator-container">
      {/* Page Title */}
      <Typography
        variant="h5"
        sx={{ ...formBoxStyle, mb: 1 }}
        className="card-title"
        gutterBottom
      >
        ⏱️ Stage Timer
      </Typography>
      <Typography
        variant="body1"
        className="card-text"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Manage event schedules with customizable timers and QR code access for remote control.
      </Typography>

      {/* Tabs Container */}
      <Paper
        elevation={3}
        sx={{ borderRadius: 2, overflow: 'hidden', backgroundColor: 'white' }}
        className="tool-card"
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          aria-label="stage timer tabs"
        >
          <Tab label="Timer Controls" id="tab-0" />
          <Tab label="QR Code Access" id="tab-1" />
          {/* <Tab label="Event Agenda" id="tab-2" /> */}
        </Tabs>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <TimerControlPanel />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <QRCodePanel />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography className="card-text">
            Event agenda feature coming soon! Configure and share schedules here.
          </Typography>
        </TabPanel>
      </Paper>
    </Box>
  );
}

export default StageTimerPage;