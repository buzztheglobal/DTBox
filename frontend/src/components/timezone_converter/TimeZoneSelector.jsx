// src/components/timezone_converter/TimeZoneSelector.jsx
// src/components/timezone_converter/TimeZoneSelector.jsx
import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import timezones from './timezones.json'; // Make sure this file exists and is valid JSON

const TimeZoneSelector = ({ label, value, onChange }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={onChange} label={label}>
      {timezones.map((tz) => (
        <MenuItem key={tz} value={tz}>
          {tz}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default TimeZoneSelector;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\timezone_converter\TimeZoneSelector.jsx