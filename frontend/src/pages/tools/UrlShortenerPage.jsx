// src/pages/tools/UrlShortenerPage.jsx
// File: /frontend/src/pages/tools/UrlShortenerPage.jsx
import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Paper } from "@mui/material";
import ShortenUrlForm from "../../components/url_shortener/ShortenUrlForm";
import UrlList from "../../components/url_shortener/UrlList";
import UrlAnalytics from "../../components/url_shortener/UrlAnalytics";
import { pageTitleStyle } from "../../styles/globalStyles";
import "../../App.css";

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

const UrlShortenerPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box className="calculator-container">
      {/* Page Title */}
      <Typography
        variant="h5"
        sx={{ ...pageTitleStyle, mb: 1 }}
        className="card-title"
        gutterBottom
      >
        🔗 URL Shortener
      </Typography>
      <Typography
        variant="body1"
        className="card-text"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Create short, shareable links and track click analytics.
      </Typography>

      {/* Tabs Container */}
      <Paper
        elevation={3}
        sx={{ borderRadius: 2, overflow: "hidden", backgroundColor: "white" }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          centered
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Shorten New URL" id="tab-0" />
          <Tab label="Your URLs" id="tab-1" />
          <Tab label="Analytics" id="tab-2" />
        </Tabs>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <ShortenUrlForm />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <UrlList />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <UrlAnalytics />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default UrlShortenerPage;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\UrlShortenerPage.jsx