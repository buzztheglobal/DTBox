// Filename: PregnancyDueDateCalculatorPage.jsx
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import DueDateForm from '../../components/due_date_calculator/DueDateForm';
import DueDateResult from '../../components/due_date_calculator/DueDateResult';
import { differenceInDays, addDays } from 'date-fns';

const calculateDueDate = ({ lmp, cycleLength }) => {
  const ovulationOffset = cycleLength - 14;
  const conceptionDate = addDays(lmp, ovulationOffset);
  const dueDate = addDays(lmp, 280 + (cycleLength - 28));
  const today = new Date();
  const gestationalAgeDays = differenceInDays(today, lmp);
  const gestationalAgeWeeks = Math.floor(gestationalAgeDays / 7);
  const daysRemaining = differenceInDays(dueDate, today);

  return {
    dueDate,
    conceptionDate,
    gestationalAgeWeeks,
    daysRemaining,
  };
};

const PregnancyDueDateCalculatorPage = () => {
  const [result, setResult] = useState(null);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pregnancy Due Date Calculator
      </Typography>
      <DueDateForm onSubmit={(data) => setResult(calculateDueDate(data))} />
      {result && <DueDateResult result={result} />}
    </Container>
  );
};

export default PregnancyDueDateCalculatorPage;
