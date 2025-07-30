// File: src/components/timezone_converter/TimeZoneSelector.jsx
import React from 'react';
import { Autocomplete, TextField, Box, Typography, Avatar } from '@mui/material';

// Util: Map region/country to emoji flag
const getFlagEmoji = (zone) => {
  const parts = zone.split('/');
  const region = parts[0];
  const city = parts[1] || '';
  const countryCodeGuess = city.split('_')[0].slice(0, 2).toUpperCase();
  const OFFSET = 127397; // unicode offset
  return countryCodeGuess.replace(/./g, char =>
    String.fromCodePoint(char.charCodeAt(0) + OFFSET)
  );
};

const TimeZoneSelector = ({ label, value, onChange, timezones = [] }) => {
  const enrichedOptions = timezones.map((tz) => {
    if (typeof tz === 'string') {
      return {
        label: tz,
        value: tz,
        abbreviation: tz.split('/')[0],
        flag: getFlagEmoji(tz)
      };
    }
    return tz;
  });

  return (
    <Autocomplete
      options={enrichedOptions}
      getOptionLabel={(option) => `${option.label} - ${option.abbreviation}`}
      value={enrichedOptions.find(opt => opt.value === value) || null}
      isOptionEqualToValue={(opt, val) => opt.value === val.value}
      onChange={(e, newValue) => onChange({ target: { value: newValue?.value || '' } })}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Avatar sx={{ width: 20, height: 20, mr: 1 }}>{option.flag}</Avatar>
          <Typography variant="body2">
            {option.label} - {option.abbreviation}
          </Typography>
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label={label} fullWidth size="small" />}
    />
  );
};

export default TimeZoneSelector;
