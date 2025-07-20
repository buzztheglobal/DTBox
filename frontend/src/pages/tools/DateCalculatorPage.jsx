// C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\DateCalculatorPage.jsx
import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import DateCalculatorTabs from '../../components/date_calculator/DateCalculatorTabs';
import '../../App.css';

export default function DateCalculatorPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          📅 Smart Date Calculator Suite
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Age · Relationship Gap · Zodiac Compatibility · Life Expectancy · Birthday Tracker & More
        </Typography>

        <DateCalculatorTabs /> {/* ✅ Loads tabs and calculators */}
      </Paper>
    </Container>
  );
}
