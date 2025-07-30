// Final fixed TimeZoneConverterPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  Chip,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import TimeInputField from '../../components/timezone_converter/TimeInputField';
import TimeZoneSelector from '../../components/timezone_converter/TimeZoneSelector';
import TimeZoneResult from '../../components/timezone_converter/TimeZoneResult';
import '../../components/timezone_converter/timezone_converter.css';

const TimeZoneConverterPage = () => {
  const navigate = useNavigate();
  const userId = 'demo_user'; // Placeholder

  const [inputTime, setInputTime] = useState(DateTime.local().toISO().slice(0, 16));
  const [sourceZone, setSourceZone] = useState('UTC');
  const [targetZone, setTargetZone] = useState('Asia/Kolkata');
  const [convertedTime, setConvertedTime] = useState('');
  const [allTimezones, setAllTimezones] = useState([]);
  const [favoriteZones, setFavoriteZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    axios.get('/api/timezones')
      .then((res) => {
        const timezones = res.data.map(z => z.value);
        setAllTimezones(timezones);
      })
      .catch((err) => console.error('❌ Error loading timezones:', err));

    axios.get(`/api/user-favorites/${userId}`)
      .then((res) => setFavoriteZones(res.data))
      .catch((err) => console.error('❌ Error loading favorites:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleConvert = async () => {
    if (!inputTime || !sourceZone || !targetZone) return;

    try {
      const dt = DateTime.fromISO(inputTime, { zone: sourceZone });
      const converted = dt.setZone(targetZone);
      const formatted = converted.toFormat('yyyy-MM-dd HH:mm ZZZZ');
      setConvertedTime(formatted);

      await axios.post('/api/user-conversions', {
        user_id: userId,
        source_timezone: sourceZone,
        target_timezone: targetZone,
        input_time: inputTime,
        converted_time: formatted,
      });
    } catch (err) {
      console.error('❌ Conversion error:', err);
      setSnackbar({ open: true, message: 'Conversion failed.', severity: 'error' });
    }
  };

  const handleAddToFavorites = async (zone) => {
    try {
      const res = await axios.post('/api/user-favorites', {
        user_id: userId,
        timezone: zone,
      });
      setFavoriteZones((prev) => [res.data, ...prev]);
      setSnackbar({ open: true, message: `Added ${zone} to favorites`, severity: 'success' });
    } catch (err) {
      console.error('❌ Failed to add favorite:', err);
      setSnackbar({ open: true, message: 'Failed to add favorite', severity: 'error' });
    }
  };

  const handleSelectFavorite = (fav) => {
    setTargetZone(fav.timezone);
    axios.post(`/api/user-favorites/increment/${fav.id}`)
      .catch((err) => console.warn('⚠️ Usage increment failed', err));
  };

  const handleGoToFavorites = () => navigate('/tools/favorites');

  return (
    <Container className="calculator-container">
      <Typography variant="h4" gutterBottom>🌍 Time Zone Converter</Typography>

      <TimeInputField
        label="Input Date and Time"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
      />

      <TimeZoneSelector
        label="From Timezone"
        value={sourceZone}
        onChange={(e) => setSourceZone(e.target.value)}
        timezones={allTimezones}
      />

      <TimeZoneSelector
        label="To Timezone"
        value={targetZone}
        onChange={(e) => setTargetZone(e.target.value)}
        timezones={allTimezones}
      />

      <Box  className="form-card" mt={2}>
        <Button variant="contained" onClick={handleConvert} className="btn glassy-button">
          Convert Time
        </Button>
        <Button variant="outlined" className="btn" onClick={() => handleAddToFavorites(targetZone)} sx={{ ml: 2 }}>
          ⭐ Add to Favorites
        </Button>
      </Box>

      <TimeZoneResult convertedTime={convertedTime} targetZone={targetZone} />

      <Divider sx={{ my: 4 }}><Chip label="Quick Select Favorite Zones" /></Divider>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={1}>
          {favoriteZones.map((fav) => (
            <Grid item key={fav.id}>
              <Chip
                label={`${fav.timezone} (${fav.usage_count || 0})`}
                onClick={() => handleSelectFavorite(fav)}
                color="primary"
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Box  className="form-card" mt={4}>
        <Button variant="text" onClick={handleGoToFavorites}>
          📂 View Favorites & History
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default TimeZoneConverterPage;
