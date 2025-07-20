import React from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function DateInputForm({
  date1, date2, setDate1, setDate2,
  onCalculate, onReset, disableDate2 = false
}) {
  return (
    <Box className="date-form">
      <TextField
        label="First Date"
        type="date"
        value={date1}
        onChange={e => setDate1(e.target.value)}
        InputLabelProps={{ shrink: true }}
        className="date-input"
      />
      {!disableDate2 && (
        <TextField
          label="Second Date"
          type="date"
          value={date2}
          onChange={e => setDate2(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="date-input"
        />
      )}
      <Box className="button-group">
        <Button variant="contained" color="primary" onClick={onCalculate}>Calculate</Button>
        <Button variant="outlined" color="secondary" onClick={onReset}>Reset</Button>
      </Box>
    </Box>
  );
}
