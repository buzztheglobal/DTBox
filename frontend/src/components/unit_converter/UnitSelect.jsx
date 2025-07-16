import React from 'react';
import { MenuItem, TextField } from '@mui/material';

const UnitSelect = ({ label, units, selectedUnit, onChange }) => (
  <TextField
    select
    fullWidth
    label={label}
    variant="outlined"
    value={selectedUnit}
    onChange={onChange}
    sx={{ mb: 2 }}
  >
    {units.map((unit) => (
      <MenuItem key={unit} value={unit}>
        {unit}
      </MenuItem>
    ))}
  </TextField>
);

export default UnitSelect;
