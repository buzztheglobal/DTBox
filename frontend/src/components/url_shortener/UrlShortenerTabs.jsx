// File: /frontend/src/components/url_shortener/UrlShortenerTabs.jsx
import React, { useState } from "react";
import { Tabs, Tab, Box, Paper } from "@mui/material";
import ShortenUrlForm from "./ShortenUrlForm";
import UrlList from "./UrlList";
import UrlAnalytics from "./UrlAnalytics";
import { cardBoxStyle } from "../../styles/globalStyles";

function UrlShortenerTabs() {
  const [value, setValue] = useState(0);
  const [urls, setUrls] = useState([]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddUrl = (shortUrlData) => {
    setUrls((prev) => [shortUrlData, ...prev]);
  };

  return (
    <Paper elevation={3} sx={{ ...cardBoxStyle, p: 2 }}>
      {/* Tabs Header */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Shorten URL" />
          <Tab label="My URLs" />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {value === 0 && <ShortenUrlForm onAddUrl={handleAddUrl} />}
        {value === 1 && <UrlList urls={urls} />}
        {value === 2 && <UrlAnalytics urls={urls} />}
      </Box>
    </Paper>
  );
}

export default UrlShortenerTabs;
