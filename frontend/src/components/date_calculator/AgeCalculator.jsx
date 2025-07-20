import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { calculateDateDifference, getNextBirthdayCountdown } from './utils';

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
    <Box>
      <TextField
        label="Your Date of Birth"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" sx={{ ml: 2 }} onClick={calculate}>
        Calculate Age
      </Button>
      <Typography mt={2} whiteSpace="pre-line">{result}</Typography>
    </Box>
  );
}
