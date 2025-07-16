// Filename: src/components/unit_converter/UnitSelect.jsx

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
// src/components/unit_converter/UnitSelect.jsx
// This component renders a dropdown select for units, allowing users to choose from a list of available