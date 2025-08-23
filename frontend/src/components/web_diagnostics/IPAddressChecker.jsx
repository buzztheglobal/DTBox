// src/components/web_diagnostics/IPAddressChecker.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Tooltip,
  CircularProgress,
  Paper,
  TextField,
  Alert,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { resultBoxStyle, formBoxStyle } from '../../styles/globalStyles';

const IPAddressChecker = () => {
  const [ipInput, setIpInput] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Automatically get user's IP address and fetch details
  const fetchDefaultIPDetails = async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const { ip } = await res.json();
      setIpInput(ip);
      fetchIPDetails(ip);
    } catch (err) {
      setError('Failed to retrieve your public IP address.');
      setLoading(false);
    }
  };

  const fetchIPDetails = async (ip) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://ipwho.is/${ip}`);
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      setData(result);
    } catch (err) {
      setError('Could not fetch IP details.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultIPDetails();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ipInput.trim()) {
      fetchIPDetails(ipInput.trim());
    }
  };

  const renderFormattedJSON = (jsonObj) =>
    Object.entries(jsonObj).map(([key, value]) => (
      <Box key={key} sx={{ mb: 0.8 }}>
        <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value?.toString()}
      </Box>
    ));

  return (
    <Paper elevation={3} sx={{ ...formBoxStyle, ...resultBoxStyle }}>
      <Typography variant="h6" gutterBottom>
        IP Address Lookup
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="IP Address (leave blank to fetch your own)"
            variant="outlined"
            fullWidth
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
          />
          <Button variant="contained" className="btn" type="submit">
            Lookup IP Details
          </Button>
        </Box>
      </form>

      {loading ? (
        <CircularProgress sx={{ mt: 3 }} />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      ) : (
        <Box mt={3}>
          <Typography variant="subtitle1" gutterBottom>
            Results for IP: <strong>{data?.ip}</strong>
            <Tooltip title="Copy">
              <Button
                size="small"
                onClick={() => navigator.clipboard.writeText(data?.ip)}
                startIcon={<ContentCopy />}
                sx={{ ml: 2 }}
              >
                Copy
              </Button>
            </Tooltip>
          </Typography>
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: '#f5f5f5',
              maxHeight: 400,
              overflowY: 'auto',
              fontSize: '0.9rem',
            }}
          >
            {renderFormattedJSON(data)}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default IPAddressChecker;
// This component can be used in your main application file or wherever you need to display the IP address checker functionality.
// Make sure to import it properly and include it in your component tree.
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\web_diagnostics\IPAddressChecker.jsx