import React, { useState } from 'react';
import { Grid, Typography, TextField, Card, Button } from '@mui/material';
import UnitSelect from './UnitSelect';
import { cardBoxStyle, pageTitleStyle, toolButtonStyle } from '../../styles/globalStyles';
import {
  getCategories,
  getUnitsForCategory,
  convertValue,
} from './unitConversionUtils';

const UnitConverter = () => {
  const [category, setCategory] = useState('Length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleConvert = () => {
    setOutput(convertValue(category, fromUnit, toUnit, input));
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
  };

  const categories = getCategories();
  const unitOptions = getUnitsForCategory(category);

  return (
    <Card sx={cardBoxStyle}>
      <Typography variant="h5" sx={pageTitleStyle}>
        Unit Converter
      </Typography>
      <UnitSelect
        label="Category"
        units={categories}
        selectedUnit={category}
        onChange={(e) => {
          const selected = e.target.value;
          setCategory(selected);
          const units = getUnitsForCategory(selected);
          setFromUnit(units[0]);
          setToUnit(units[1] || units[0]);
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
