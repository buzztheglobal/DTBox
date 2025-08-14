// File: /frontend/src/components/url_shortener/UrlAnalytics.jsx
import React, { useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress, Paper } from "@mui/material";
import { getUrlAnalytics } from "../../api/urlApi";
import { formBoxStyle, cardBoxStyle, pageTitleStyle, toolButtonStyle } from "../../styles/globalStyles";

const UrlAnalytics = () => {
  const [shortCode, setShortCode] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchAnalytics = async () => {
    if (!shortCode.trim()) return;
    setLoading(true);
    try {
      const data = await getUrlAnalytics(shortCode.trim());
      setAnalytics(data);
    } catch (err) {
      console.error("[UrlAnalytics] Error fetching analytics:", err);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ ...cardBoxStyle, p: 3, mt: 2 }}>
      <Typography variant="h5" sx={pageTitleStyle} gutterBottom>
        📊 URL Analytics
      </Typography>

      {/* Input Section */}
      <Box sx={formBoxStyle}>
        <TextField
          label="Enter Short Code"
          variant="outlined"
          fullWidth
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          sx={toolButtonStyle}
          onClick={handleFetchAnalytics}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Get Analytics"}
        </Button>
      </Box>

      {/* Analytics Results */}
      {analytics && (
        <Box sx={{ mt: 3, backgroundColor: "#f9f9f9", p: 2, borderRadius: 2 }}>
          <Typography variant="body1">
            <strong>Short Code:</strong> {analytics.short_code}
          </Typography>
          <Typography variant="body1">
            <strong>Original URL:</strong> {analytics.original_url}
          </Typography>
          <Typography variant="body1">
            <strong>Clicks:</strong> {analytics.clicks}
          </Typography>
          <Typography variant="body1">
            <strong>Created At:</strong>{" "}
            {new Date(analytics.created_at).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default UrlAnalytics;
