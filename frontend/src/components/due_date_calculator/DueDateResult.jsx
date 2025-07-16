// Filename: DueDateResult.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { resultBoxStyle } from '../../styles/globalStyles';
import { format, addDays, differenceInWeeks } from 'date-fns';

const DueDateResult = ({ result }) => {
  const { dueDate, conceptionDate, gestationalAgeWeeks, daysRemaining } = result;

  return (
    <Box sx={resultBoxStyle}>
      <Typography variant="h6">Estimated Due Date: {format(dueDate, 'PPP')}</Typography>
      <Typography>Estimated Conception Date: {format(conceptionDate, 'PPP')}</Typography>
      <Typography>Current Gestational Age: {gestationalAgeWeeks} weeks</Typography>
      <Typography>Days Remaining: {daysRemaining} days</Typography>
    </Box>
  );
};

export default DueDateResult;
