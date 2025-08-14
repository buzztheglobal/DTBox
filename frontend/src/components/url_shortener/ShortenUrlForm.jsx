// src/components/url_shortener/ShortenUrlForm.jsx
// File: /frontend/src/components/url_shortener/ShortenUrlForm.jsx
import React, { useState } from "react";
import { createShortUrl } from "../../api/urlApi";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Stack
} from "@mui/material";
import {
  formBoxStyle,
  formFieldStyle,
  cardBoxStyle,
  toolButtonStyle
} from "../../styles/globalStyles";

const ShortenUrlForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!originalUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const data = await createShortUrl(originalUrl, customCode);
      setShortUrl(`${window.location.origin}/${data.short_code}`);
      setOriginalUrl("");
      setCustomCode("");
    } catch (err) {
      console.error("[ShortenUrlForm] Error:", err);
      setError(err.message || "Failed to shorten URL");
    }
  };

  return (
    <Paper sx={{ ...cardBoxStyle, p: 3, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        Shorten a New URL
      </Typography>

      <Box component="form" onSubmit={handleShorten} sx={formBoxStyle}>
        <TextField
          label="Original URL"
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://example.com"
          required
          fullWidth
          sx={formFieldStyle}
        />

        <TextField
          label="Custom Short Code (optional)"
          type="text"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="my-custom-link"
          fullWidth
          sx={formFieldStyle}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{ ...toolButtonStyle, mt: 2 }}
        >
          Shorten URL
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {shortUrl && (
        <Stack spacing={1} sx={{ mt: 2 }}>
          <Typography variant="body1">
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigator.clipboard.writeText(shortUrl)}
          >
            Copy to Clipboard
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default ShortenUrlForm;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\url_shortener\ShortenUrlForm.jsx