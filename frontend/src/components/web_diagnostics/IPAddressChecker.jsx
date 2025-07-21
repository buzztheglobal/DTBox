// src/components/web_diagnostics/IPAddressChecker.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Tooltip, CircularProgress, Paper } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { resultBoxStyle } from '../../styles/globalStyles';

const IPAddressChecker = () => {
  const [ipInfo, setIpInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIP = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      setIpInfo(data.ip);
    } catch (err) {
      setIpInfo('Error fetching IP');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIP();
  }, []);

  return (
    <Paper elevation={3} sx={resultBoxStyle}>
      <Typography variant="h6">Your Public IP Address</Typography>
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <Box mt={2}>
          <Typography fontSize="1.2rem" gutterBottom>{ipInfo}</Typography>
          <Tooltip title="Copy IP">
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigator.clipboard.writeText(ipInfo)}
              startIcon={<ContentCopy />}
            >
              Copy
            </Button>
          </Tooltip>
          <Button onClick={fetchIP} sx={{ ml: 2 }} variant="contained">
            Refresh
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default IPAddressChecker;
// src/components/web_diagnostics/IPAddressChecker.jsx