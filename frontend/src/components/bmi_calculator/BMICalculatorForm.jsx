import React, { useState, useContext } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { BMIContext } from './BMIResultCard';
import { formFieldStyle, toolButtonStyle } from '../../styles/globalStyles';

function BMICalculatorForm() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const { setResult } = useContext(BMIContext);

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 24.9) category = 'Normal';
      else if (bmi < 29.9) category = 'Overweight';
      else category = 'Obese';
      setResult({ bmi: bmi.toFixed(2), category });
    } else {
      setResult(null);
    }
  };

  return (
    <Box>
      <TextField
        label="Height (cm)"
        type="number"
        fullWidth
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        sx={formFieldStyle}
      />
      <TextField
        label="Weight (kg)"
        type="number"
        fullWidth
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        sx={formFieldStyle}
      />
      <Button
        variant="contained"
        onClick={calculateBMI}
        sx={toolButtonStyle}
        fullWidth
      >
        Calculate BMI
      </Button>
    </Box>
  );
}

export default BMICalculatorForm;
