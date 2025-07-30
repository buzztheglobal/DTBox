// src/components/timezone_converter/TimeZoneResult.jsx
// src/components/timezone_converter/TimeZoneResult.jsx
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const TimeZoneResult = ({ convertedTime, targetZone }) => {
  return (
    <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h6">Converted Time:</Typography>
      <Typography variant="body1">
        {convertedTime ? `${convertedTime} (${targetZone})` : 'No conversion yet.'}
      </Typography>
    </Paper>
  );
};

export default TimeZoneResult;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\timezone_converter\TimeZoneResult.jsx