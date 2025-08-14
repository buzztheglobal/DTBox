// src/components/url_shortener/urlShortenerTabs.jsx
// src/components/url_shortener/UrlShortenerTabs.jsx
import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ShortenUrlForm from "./ShortenUrlForm";
import UrlList from "./UrlList";
import UrlAnalytics from "./UrlAnalytics";

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
    <Box sx={{ width: "100%", typography: "body1", mt: 2 }}>
      <Tabs value={value} onChange={handleTabChange} centered>
        <Tab label="Shorten URL" />
        <Tab label="My URLs" />
        <Tab label="Analytics" />
      </Tabs>

      {value === 0 && <ShortenUrlForm onAddUrl={handleAddUrl} />}
      {value === 1 && <UrlList urls={urls} />}
      {value === 2 && <UrlAnalytics urls={urls} />}
    </Box>
  );
}

export default UrlShortenerTabs;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\url_shortener\UrlShortenerTabs.jsx