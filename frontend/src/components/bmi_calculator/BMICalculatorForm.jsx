// File: frontend/src/components/bmi_calculator/BMICalculatorForm.jsx
import React, { useState, useContext } from 'react';
import {
  Box, TextField, FormControl, InputLabel,
  MenuItem, Select, Button, Typography, ToggleButtonGroup, ToggleButton, Grid
} from '@mui/material';
import { BMIContext } from '../../context/BMIContext';
import { formBoxStyle, formFieldStyle, toolButtonStyle } from '../../styles/globalStyles';

export function BMICalculatorForm() {
  const { setResult } = useContext(BMIContext);

  const [unitSystem, setUnitSystem] = useState("metric"); // "imperial"
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [weightLb, setWeightLb] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleUnitChange = (_, newUnit) => {
    if (!newUnit) return;

    // Convert values accordingly when switching
    if (newUnit === "imperial" && heightCm) {
      const totalInches = heightCm / 2.54;
      setHeightFt(Math.floor(totalInches / 12));
      setHeightIn(Math.round(totalInches % 12));
      setWeightLb((weightKg * 2.20462).toFixed(1));
    } else if (newUnit === "metric" && heightFt) {
      const totalInches = parseInt(heightFt) * 12 + parseFloat(heightIn || 0);
      setHeightCm((totalInches * 2.54).toFixed(1));
      setWeightKg((weightLb / 2.20462).toFixed(1));
    }

    setUnitSystem(newUnit);
  };

  const calculateBMI = () => {
    let heightInMeters;
    let weight;

    if (unitSystem === "metric") {
      heightInMeters = heightCm / 100;
      weight = parseFloat(weightKg);
    } else {
      const totalInches = parseInt(heightFt || 0) * 12 + parseFloat(heightIn || 0);
      heightInMeters = totalInches * 0.0254;
      weight = weightLb / 2.20462;
    }

    const bmi = weight / (heightInMeters * heightInMeters);

    let category = '';
    let advice = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      advice = 'You may need to gain some weight. Consult a nutritionist.';
    } else if (bmi < 24.9) {
      category = 'Normal';
      advice = 'Great! Keep up the healthy lifestyle.';
    } else if (bmi < 29.9) {
      category = 'Overweight';
      advice = 'Consider light exercise and balanced meals.';
    } else {
      category = 'Obese';
      advice = 'It’s a good idea to consult a doctor or trainer.';
    }

    if (age && parseInt(age) < 18) {
      advice += ' Note: BMI may not accurately reflect body fat for children/teens.';
    }

    setResult({
      bmi: bmi.toFixed(2),
      category,
      advice,
    });
  };

  return (
    <Box sx={formBoxStyle}>
      <ToggleButtonGroup
        color="primary"
        value={unitSystem}
        exclusive
        onChange={handleUnitChange}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="metric">cm/kg</ToggleButton>
        <ToggleButton value="imperial">ft+in/lbs</ToggleButton>
      </ToggleButtonGroup>

      {unitSystem === "metric" ? (
        <>
          <TextField
            label="Height (cm)"
            fullWidth sx={formFieldStyle}
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            type="number"
          />
          <TextField
            label="Weight (kg)"
            fullWidth sx={formFieldStyle}
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            type="number"
          />
        </>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Height (ft)"
              fullWidth
              type="number"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Height (in)"
              fullWidth
              type="number"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Weight (lbs)"
              fullWidth sx={formFieldStyle}
              value={weightLb}
              onChange={(e) => setWeightLb(e.target.value)}
              type="number"
            />
          </Grid>
        </Grid>
      )}

      <TextField
        label="Age"
        fullWidth sx={formFieldStyle}
        value={age}
        onChange={(e) => setAge(e.target.value)}
        type="number"
      />

      <FormControl fullWidth sx={formFieldStyle}>
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          label="Gender"
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        sx={{ ...toolButtonStyle, mt: 2 }}
        onClick={calculateBMI}
      >
        Calculate BMI
      </Button>
    </Box>
  );
}

export default BMICalculatorForm;
// File: frontend/src/components/bmi_calculator/BMIResultCard.jsx