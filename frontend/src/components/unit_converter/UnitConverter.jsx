// Filename: src/components/unit_converter/UnitConverter.jsx

import React, { useState, useMemo } from 'react';
import {
  Typography, Grid, Card, TextField, Button, useTheme
} from '@mui/material';
import UnitSelect from './UnitSelect';
import UnitGroupFilter from './UnitGroupFilter';
import {
  getCategories,
  getUnitsForCategory,
  convertValue,
  categoryGroupMap
} from './unitConversionUtils';
import {
  cardBoxStyle,
  pageTitleStyle,
  toolButtonStyle,
} from '../../styles/globalStyles';

const UnitConverter = () => {
  const theme = useTheme();
  const themeMode = theme.palette.mode || 'light';

  const [unitGroup, setUnitGroup] = useState('Metric');
  const filteredCategories = categoryGroupMap[unitGroup];

  const [category, setCategory] = useState(filteredCategories[0]);
  const [fromUnit, setFromUnit] = useState(getUnitsForCategory(category)[0]);
  const [toUnit, setToUnit] = useState(getUnitsForCategory(category)[1]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const unitOptions = useMemo(() => getUnitsForCategory(category), [category]);

  const handleConvert = () => {
    setOutput(convertValue(category, fromUnit, toUnit, input));
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
  };

  const handleGroupChange = (group) => {
    const firstCategory = categoryGroupMap[group][0];
    const firstUnits = getUnitsForCategory(firstCategory);
    setUnitGroup(group);
    setCategory(firstCategory);
    setFromUnit(firstUnits[0]);
    setToUnit(firstUnits[1] || firstUnits[0]);
    setInput('');
    setOutput('');
  };

  return (
    <Card sx={cardBoxStyle}>
      <Typography variant="h5" sx={pageTitleStyle}>
        Unit Converter
      </Typography>

      <UnitGroupFilter
        selectedGroup={unitGroup}
        onChange={handleGroupChange}
        themeMode={themeMode}
      />

      <UnitSelect
        label="Category"
        units={filteredCategories}
        selectedUnit={category}
        onChange={(e) => {
          const selected = e.target.value;
          const units = getUnitsForCategory(selected);
          setCategory(selected);
          setFromUnit(units[0]);
          setToUnit(units[1] || units[0]);
          setInput('');
          setOutput('');
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <UnitSelect
            label="From"
            units={unitOptions}
            selectedUnit={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          />
          <TextField
            fullWidth
            label="Value"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="number"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UnitSelect
            label="To"
            units={unitOptions}
            selectedUnit={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          />
          <TextField
            fullWidth
            label="Result"
            variant="outlined"
            value={output}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Button onClick={handleConvert} sx={toolButtonStyle}>
            Convert
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleReset} color="secondary" variant="outlined">
            Reset
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UnitConverter;
