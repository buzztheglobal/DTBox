// Filename: DueDateForm.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { formBoxStyle, formFieldStyle } from '../../styles/globalStyles';
import './due_date_calculator.css';

const cycleLengths = [26, 28, 30, 32];

const DueDateForm = ({ onSubmit }) => {
  const [lmp, setLmp] = useState('');
  const [cycleLength, setCycleLength] = useState(28);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lmp) {
      onSubmit({ lmp: new Date(lmp), cycleLength });
    }
  };

  return (
    <Box sx={formBoxStyle}>
      <Typography className="pregnancy-calculator-title" variant="h6" gutterBottom>Enter your details</Typography>
      <form className="pregnancy-calculator-container" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          className="pregnancy-form-field"
          type="date"
          label="First Day of Last Menstrual Period (LMP)"
          InputLabelProps={{ shrink: true }}
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          sx={formFieldStyle}
        />
        <TextField
          select
          label="Average Cycle Length"
          className="pregnancy-form-field"
          value={cycleLength}
          onChange={(e) => setCycleLength(Number(e.target.value))}
          fullWidth
          sx={formFieldStyle}
        >
          {cycleLengths.map((length) => (
            <MenuItem key={length} value={length}>
              {length} days
            </MenuItem>
          ))}
        </TextField>
        <Button className="pregnancy-submit-btn" variant="contained" type="submit" fullWidth>
          Calculate Due Date
        </Button>
      </form>
    </Box>
  );
};

export default DueDateForm;
// Filename: globalStyles.js