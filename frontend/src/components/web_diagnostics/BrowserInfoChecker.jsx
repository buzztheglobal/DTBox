// src/components/web_diagnostics/BrowserInfoChecker.jsx
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { resultBoxStyle } from '../../styles/globalStyles';

const BrowserInfoChecker = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const screenSize = `${window.screen.width}x${window.screen.height}`;

  return (
    <Paper elevation={3} sx={resultBoxStyle}>
      <Typography variant="h6">Browser Information</Typography>
      <Typography mt={2}>User Agent: {userAgent}</Typography>
      <Typography>Platform: {platform}</Typography>
      <Typography>Language: {language}</Typography>
      <Typography>Screen Resolution: {screenSize}</Typography>
    </Paper>
  );
};

export default BrowserInfoChecker;
// src/components/web_diagnostics/BrowserInfoChecker.jsx