// src/components/web_diagnostics/UserAgentChecker.jsx
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { resultBoxStyle } from '../../styles/globalStyles';

const UserAgentChecker = () => {
  return (
    <Paper elevation={3} sx={resultBoxStyle}>
      <Typography variant="h6">Your User-Agent String</Typography>
      <Typography mt={2}>{navigator.userAgent}</Typography>
    </Paper>
  );
};

export default UserAgentChecker;
// src/components/web_diagnostics/UserAgentChecker.jsx