// File: src/components/timezone_converter/TimeZoneSelector.jsx
import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const TimeZoneSelector = ({ label, value, onChange, timezones = [] }) => {
  return (
    <Autocomplete
      disablePortal
      options={timezones}
      getOptionLabel={(option) => typeof option === 'string' ? option : option.value || ''}
      value={value || ''}
      onChange={(e, newValue) => {
        if (typeof newValue === 'string') {
          onChange({ target: { value: newValue } });
        } else if (newValue && newValue.value) {
          onChange({ target: { value: newValue.value } });
        } else if (typeof newValue === 'object') {
          onChange({ target: { value: newValue } });
        } else {
          onChange({ target: { value: '' } });
        }
      }}
      renderInput={(params) => <TextField {...params} label={label} fullWidth />}
      isOptionEqualToValue={(option, val) => {
        return option === val || option.value === val || option === val.value;
      }}
    />
  );
};

export default TimeZoneSelector;
