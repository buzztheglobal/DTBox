// src/components/date_calculator/RelationshipGapCalculator.jsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import DateInputForm from './DateInputForm';
import ResultDisplay from './ResultDisplay';
import { calculateDateDifference } from './utils';

export default function RelationshipGapCalculator() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [difference, setDifference] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      const result = calculateDateDifference(date1, date2);
      setDifference(result);
      setError('');
    } catch (err) {
      setDifference(null);
      setError(err.message || 'Invalid input.');
    }
  };

  const handleReset = () => {
    setDate1('');
    setDate2('');
    setDifference(null);
    setError('');
  };

  return (
    <Box className="date-calculator-box">
      <DateInputForm
        date1={date1}
        date2={date2}
        setDate1={setDate1}
        setDate2={setDate2}
        onCalculate={handleCalculate}
        onReset={handleReset}
      />
      <ResultDisplay difference={difference} error={error} />
    </Box>
  );
}
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\date_calculator/RelationshipGapCalculator.jsx
// This component calculates the gap between two dates, typically used for relationship duration calculations.