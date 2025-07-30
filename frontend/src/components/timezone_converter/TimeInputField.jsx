// src/components/timezone_converter/TimeInputField.jsx
import React from 'react';
import TextField from '@mui/material/TextField';

const TimeInputField = ({ label, value, onChange }) => (
  <TextField
    label={label}
    type="datetime-local"
    fullWidth
    value={value}
    onChange={onChange}
    margin="normal"
    InputLabelProps={{
      shrink: true,
    }}
  />
);

export default TimeInputField;
