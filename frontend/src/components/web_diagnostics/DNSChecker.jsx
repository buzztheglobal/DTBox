// src/components/web_diagnostics/DNSChecker.jsx
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { resultBoxStyle } from '../../styles/globalStyles';

const DNSChecker = () => {
  return (
    <Paper elevation={3} sx={resultBoxStyle}>
      <Typography variant="h6">DNS Info</Typography>
      <Typography mt={2}>
        Due to browser security, DNS resolver data isn't directly accessible in JavaScript.
        Please use a browser extension or network tool to view DNS settings.
      </Typography>
    </Paper>
  );
};

export default DNSChecker;
// src/components/web_diagnostics/DNSChecker.jsx    
    