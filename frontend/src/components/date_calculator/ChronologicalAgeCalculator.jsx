import React, { useState } from 'react';
import { Box } from '@mui/material';
import DateInputForm from './DateInputForm';
import ResultDisplay from './ResultDisplay';
import { calculateDateDifference } from './utils';

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
      />
      <ResultDisplay difference={difference} error={error} />
    </Box>
  );
}
