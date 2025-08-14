// frontend/src/pages/tools/StageTimerPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import TimerControlPanel from '../../components/stage_timer/TimerControlPanel';
import QRCodePanel from '../../components/stage_timer/QRCodePanel';
import '../../styles/App.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function StageTimerPage() {
  const [tabValue, setTabValue] = useState(0);
  const [darkMode] = useState(false); // Placeholder for dark mode toggle

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container className={`calculator-container ${darkMode ? 'dark-mode' : ''}`}>
      <Row>
        <Col>
          <div className="tool-card">
            <Typography variant="h4" className="card-title" gutterBottom>
              Stage Timer
            </Typography>
            <Typography className="card-text" gutterBottom>
              Manage event schedules with customizable timers and QR code access for remote control.
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                aria-label="stage timer tabs"
                sx={{ '& .MuiTab-root': { color: darkMode ? '#dcdcdc' : '#333' } }}
              >
                <Tab label="Timer Controls" />
                <Tab label="QR Code Access" />
                <Tab label="Event Agenda" />
              </Tabs>
            </Box>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default StageTimerPage;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\StageTimerPage.jsx