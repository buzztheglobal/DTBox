// Filename: src/components/unit_converter/UnitGroupFilter.jsx

import React from 'react';
import { Box, Chip } from '@mui/material';
import { navChipStyle } from '../../styles/globalStyles';
import { categoryGroupMap } from './unitConversionUtils';

const UnitGroupFilter = ({ selectedGroup, onChange, themeMode }) => {
  const groups = Object.keys(categoryGroupMap);

  return (
    <Box sx={{ mb: 2 }}>
      {groups.map((group) => (
        <Chip
          key={group}
          label={group}
          onClick={() => onChange(group)}
          sx={navChipStyle(selectedGroup === group, themeMode)}
          clickable
        />
      ))}
    </Box>
  );
};

export default UnitGroupFilter;
// src/components/unit_converter/UnitGroupFilter.jsx
// This component allows users to filter units by category group.