// src/components/date_calculator/DateInputForm.jsx
import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import './date_calculator.css';

export default function DateInputForm({
  date1, date2, setDate1, setDate2,
  onCalculate, onReset, disableDate2 = false
}) {
  return (
    <Box  className="form-section">
      <TextField
        label="First Date"
        className="date-input input-container date-input:focus"
        type="date"
        value={date1}
        onChange={e => setDate1(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      {!disableDate2 && (
        <TextField
          label="Second Date"
          type="date"
          value={date2}
          onChange={e => setDate2(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="date-input input-container"
        />
      )}
      <Box className="button-group">
        <Button variant="contained" className='btn btn-calculate btn-calculate:hover' color="primary" onClick={onCalculate}>Calculate</Button>
        <Button variant="outlined" className='btn btn-reset btn-reset:hover' color="secondary" onClick={onReset}>Reset</Button>
      </Box>
    </Box>
  );
}
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\date_calculator/DateInputForm.jsx