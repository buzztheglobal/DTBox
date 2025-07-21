// src/components/date_calculator/LifeExpectancyCalculator.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import './date_calculator.css';

export default function LifeExpectancyCalculator() {
  const [age, setAge] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      return setResult('Please enter a valid age between 0 and 120.');
    }
    const lifeExpectancy = 82; // average baseline
    const remaining = lifeExpectancy - ageNum;
    setResult(
      remaining > 0
        ? `Estimated remaining lifespan: ${remaining} years`
        : `You have surpassed average life expectancy 🎉`
    );
  };

  return (
    <Box className="form-card">
      <TextField
        label="Your Age"
        type="number"
        value={age}
        className="input-label"
        onChange={(e) => setAge(e.target.value)}
      />
      <Button variant="contained" className='btn btn-estimate btn-estimate:hover' onClick={calculate} sx={{ ml: 2 }}>
        Estimate
      </Button>
      <Typography className='input-label' mt={2}>{result}</Typography>
    </Box>
  );
}
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\date_calculator/LifeExpectancyCalculator.jsx