// src/components/date_calculator/ResultDisplay.jsx
import React from 'react';
import { Typography, Box, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './date_calculator.css';

export default function ResultDisplay({ difference, error }) {
  const handleCopy = () => {
    if (!difference) return;
    const text = `Difference: ${difference.years} years, ${difference.months} months, ${difference.days} days`;
    navigator.clipboard.writeText(text);
  };

  return (
    <Box className="form-card result-display">
      {error && <Typography color="error">{error}</Typography>}
      {difference && (
        <Box display="flex" className="input-container" alignItems="center">
          <Typography className='input-label' variant="h6">
            Difference: {difference.years} years, {difference.months} months, {difference.days} days
          </Typography>
          <Tooltip title="Copy to clipboard">
            <IconButton onClick={handleCopy}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\date_calculator/ResultDisplay.jsx
// This component displays the result of date calculations and allows copying the result to clipboard.