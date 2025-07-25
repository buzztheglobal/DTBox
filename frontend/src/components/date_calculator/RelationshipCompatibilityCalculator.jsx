// src/components/date_calculator/RelationshipCompatibilityCalculator.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { calculateDateDifference, getZodiacSign } from './utils';
import './date_calculator.css';

const zodiacCompatibilityMap = {
  Aries: ['Leo', 'Sagittarius', 'Gemini'],
  Taurus: ['Virgo', 'Capricorn', 'Pisces'],
  Gemini: ['Libra', 'Aquarius', 'Aries'],
  Cancer: ['Scorpio', 'Pisces', 'Taurus'],
  Leo: ['Aries', 'Sagittarius', 'Gemini'],
  Virgo: ['Taurus', 'Capricorn', 'Cancer'],
  Libra: ['Gemini', 'Aquarius', 'Leo'],
  Scorpio: ['Cancer', 'Pisces', 'Virgo'],
  Sagittarius: ['Aries', 'Leo', 'Libra'],
  Capricorn: ['Taurus', 'Virgo', 'Scorpio'],
  Aquarius: ['Gemini', 'Libra', 'Sagittarius'],
  Pisces: ['Cancer', 'Scorpio', 'Capricorn'],
};

export default function RelationshipCompatibilityCalculator() {
  const [dob1, setDob1] = useState('');
  const [dob2, setDob2] = useState('');
  const [result, setResult] = useState('');

  const calculateCompatibility = () => {
    try {
      const diff = calculateDateDifference(dob1, dob2);
      const sign1 = getZodiacSign(new Date(dob1));
      const sign2 = getZodiacSign(new Date(dob2));
      const isCompatible = zodiacCompatibilityMap[sign1]?.includes(sign2);

      let score = isCompatible
        ? '💖 Strong Zodiac Compatibility'
        : '🤔 Average Zodiac Compatibility';

      setResult(
        `Person A: ${sign1}\nPerson B: ${sign2}\nAge Difference: ${diff.years}y ${diff.months}m\nCompatibility: ${score}`
      );
    } catch (err) {
      setResult('Please enter valid dates.');
    }
  };

  return (
    <Box className="form-card">
      <TextField
        label="Person A DOB"
        type="date"
        value={dob1}
        onChange={(e) => setDob1(e.target.value)}
        InputLabelProps={{ shrink: true }}
        className="input-label"
      />
      <TextField
        label="Person B DOB"
        type="date"
        value={dob2}
        onChange={(e) => setDob2(e.target.value)}
        sx={{ ml: 2 }}
        InputLabelProps={{ shrink: true }}
        className="input-label"
      />
      <Button className='btn btn-calculate' variant="contained" sx={{ ml: 2 }} onClick={calculateCompatibility}>
        Check
      </Button>
      <Typography className='input-label' mt={2} whiteSpace="pre-line">{result}</Typography>
    </Box>
  );
}
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\date_calculator/RelationshipCompatibilityCalculator.jsx
// This component calculates the compatibility between two people based on their zodiac signs and age difference.