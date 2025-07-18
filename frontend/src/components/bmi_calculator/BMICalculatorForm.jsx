// File: frontend/src/components/bmi_calculator/BMICalculatorForm.jsx
import React, { useState, useContext } from 'react';
import {
  Box, TextField, FormControl, InputLabel,
  MenuItem, Select, Button, Typography,
  ToggleButtonGroup, ToggleButton, Grid
} from '@mui/material';
import { BMIContext } from '../../context/BMIContext';
import { formBoxStyle, formFieldStyle, toolButtonStyle } from '../../styles/globalStyles';

export default function BMICalculatorForm() {
  const { setResult } = useContext(BMIContext);

  const [unitSystem, setUnitSystem] = useState("metric");
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [weightLb, setWeightLb] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({ heightCm: '', weightKg: '', age: '' });

  const handleUnitChange = (_, newUnit) => {
    if (!newUnit) return;
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

  const validateField = (name, value) => {
    let error = '';
    const num = parseFloat(value);
    if (name === 'heightCm' && (num < 50 || num > 300)) {
      error = 'Height must be between 50–300 cm';
    } else if (name === 'weightKg' && (num < 10 || num > 500)) {
      error = 'Weight must be between 10–500 kg';
    } else if (name === 'age' && (num < 1 || num > 120)) {
      error = 'Age must be between 1–120';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleReset = () => {
    setHeightCm(''); setHeightFt(''); setHeightIn('');
    setWeightKg(''); setWeightLb(''); setAge(''); setGender('');
    setErrors({ heightCm: '', weightKg: '', age: '' });
    setResult(null);
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
    let category = '', advice = '', calories = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      advice = 'You may need to gain some weight. Consult a nutritionist.';
      calories = 'Try to eat nutrient-dense foods to add healthy weight.';
    } else if (bmi < 24.9) {
      category = 'Normal';
      advice = 'Great! Keep up the healthy lifestyle.';
      calories = 'Maintain your current intake and activity.';
    } else if (bmi < 29.9) {
      category = 'Overweight';
      advice = 'Consider light exercise and balanced meals.';
      calories = 'Reduce calorie intake slightly and stay active.';
    } else {
      category = 'Obese';
      advice = 'It’s a good idea to consult a doctor or trainer.';
      calories = 'Aim for a calorie deficit under guidance.';
    }

    if (age && parseInt(age) < 18) {
      advice += ' Note: BMI may not accurately reflect body fat for children/teens.';
    }

    setResult({
      bmi: bmi.toFixed(2),
      category,
      advice,
      calories
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Height (cm)"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              onBlur={(e) => validateField('heightCm', e.target.value)}
              error={Boolean(errors.heightCm)}
              helperText={errors.heightCm}
              placeholder="e.g., 170"
              type="number"
              fullWidth
              sx={formFieldStyle}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Weight (kg)"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              onBlur={(e) => validateField('weightKg', e.target.value)}
              error={Boolean(errors.weightKg)}
              helperText={errors.weightKg}
              placeholder="e.g., 65"
              type="number"
              fullWidth
              sx={formFieldStyle}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Height (ft)"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Height (in)"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Weight (lbs)"
              value={weightLb}
              onChange={(e) => setWeightLb(e.target.value)}
              type="number"
              fullWidth
              sx={formFieldStyle}
            />
          </Grid>
        </Grid>
      )}

      <TextField
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        onBlur={(e) => validateField('age', e.target.value)}
        error={Boolean(errors.age)}
        helperText={errors.age}
        type="number"
        fullWidth
        placeholder="e.g., 25"
        sx={formFieldStyle}
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

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            sx={{ ...toolButtonStyle, mt: 2 }}
            onClick={calculateBMI}
          >
            Calculate BMI
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
// File: frontend/src/components/bmi_calculator/BMIResultCard.jsx