// src/pages/tools/WebDiagnosticsPage.jsx
import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography, Container, Paper } from '@mui/material';
import IPAddressChecker from '../../components/web_diagnostics/IPAddressChecker';
import DNSChecker from '../../components/web_diagnostics/DNSChecker';
import BrowserInfoChecker from '../../components/web_diagnostics/BrowserInfoChecker';
import UserAgentChecker from '../../components/web_diagnostics/UserAgentChecker';
import { formBoxStyle, pageTitleStyle, pageContainerStyle } from '../../styles/globalStyles';

const WebDiagnosticsPage = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (e, newVal) => setTab(newVal);

  return (
    <Container sx={pageContainerStyle}>
      <Typography variant="h4" sx={pageTitleStyle}>Web Diagnostics</Typography>

      <Paper elevation={3} sx={{ mb: 3 }}>
        <Tabs sx={formBoxStyle}
          value={tab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="What's My IP" />
          <Tab label="What's My DNS" />
          <Tab label="What's My Browser" />
          <Tab label="What's My User Agent" />
        </Tabs>
      </Paper>

      <Box>
        {tab === 0 && <IPAddressChecker />}
        {tab === 1 && <DNSChecker />}
        {tab === 2 && <BrowserInfoChecker />}
        {tab === 3 && <UserAgentChecker />}
      </Box>
    </Container>
  );
};

export default WebDiagnosticsPage;
// src/pages/tools/WebDiagnosticsPage.jsx