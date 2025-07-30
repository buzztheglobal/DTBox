import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TimeZoneSelector = ({ label, value, onChange, timezones = [] }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {Array.isArray(timezones) && timezones.length > 0 ? (
          timezones.map((tz) => (
            <MenuItem key={tz} value={tz}>
              {tz}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Loading timezones...
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default TimeZoneSelector;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\timezone_converter\TimeZoneSelector.jsx