// src/components/date_calculator/ChronologicalAgeCalculator.jsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import DateInputForm from './DateInputForm';
import ResultDisplay from './ResultDisplay';
import { calculateDateDifference } from './utils';
import './date_calculator.css';

export default function ChronologicalAgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [today] = useState(new Date().toISOString().split('T')[0]);
  const [difference, setDifference] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      const result = calculateDateDifference(birthDate, today);
      setDifference(result);
      setError('');
    } catch (err) {
      setDifference(null);
      setError(err.message || 'Invalid input.');
    }
  };

  const handleReset = () => {
    setBirthDate('');
    setDifference(null);
    setError('');
  };

  return (
    <Box className="date-calculator-box">
      <DateInputForm
        date1={birthDate}
        date2={today}
        setDate1={setBirthDate}
        setDate2={() => {}}
        disableDate2={true}
        onCalculate={handleCalculate}
        onReset={handleReset}
        className="input-group input-container"
      />
      <ResultDisplay className="result-box" difference={difference} error={error} />
    </Box>
  );
}
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\date_calculator/ChronologicalAgeCalculator.jsx
// This component calculates the chronological age based on the provided birth date and today's date.