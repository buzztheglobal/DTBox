// src/components/date_calculator/DateDiffCalculator.jsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import DateInputForm from './DateInputForm';
import ResultDisplay from './ResultDisplay';
import { calculateDateDifference } from './utils';
import './date_calculator.css';

const DateDiffCalculator = () => {
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
    <Box className="form-card form-section">
      <DateInputForm
        date1={date1}
        date2={date2}
        setDate1={setDate1}
        setDate2={setDate2}
        onCalculate={handleCalculate}
        onReset={handleReset}
        className="input-group input-container"
      />
      <ResultDisplay className="result-box form-content" difference={difference} error={error} />
    </Box>
  );
};

export default DateDiffCalculator;
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\date_calculator/DateDiffCalculator.jsx