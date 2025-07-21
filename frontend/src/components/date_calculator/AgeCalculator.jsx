// src/components/date_calculator/AgeCalculator.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import {
  calculateDateDifference,
  getNextBirthdayCountdown
} from './utils';
import './date_calculator.css';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const diff = calculateDateDifference(dob, today);
      const daysLeft = getNextBirthdayCountdown(dob);
      setResult(
        `You are ${diff.years} years, ${diff.months} months, ${diff.days} days old.\n🎂 Next Birthday in ${daysLeft} days!`
      );
    } catch (err) {
      setResult('Please enter a valid birth date.');
    }
  };

  return (
    <Box  className="form-card">
      <TextField
        label="Your Date of Birth"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        InputLabelProps={{ shrink: true }}
        className="input-label"
      />
      <Button className='btn btn-calculate btn-calculate:hover' variant="contained" sx={{ ml: 2 }} onClick={calculate}>
        Calculate Age
      </Button>
      <Typography className='input-label' mt={2} whiteSpace="pre-line">{result}</Typography>
    </Box>
  );
}
