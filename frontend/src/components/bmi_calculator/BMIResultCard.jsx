// File: src/components/bmi_calculator/BMIResultCard.jsx
import React, { useContext } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { BMIContext } from '../../context/BMIContext';

export default function BMIResultCard() {
  const { result } = useContext(BMIContext);

  if (!result) return null;

  const { bmi, category, advice, calories } = result;

  const emoji = {
    Underweight: '🦴',
    Normal: '💪',
    Overweight: '🍔',
    Obese: '⚠️'
  }[category] || '🤷‍♂️';

  const color = {
    Underweight: '#FFD54F',
    Normal: '#81C784',
    Overweight: '#FFB74D',
    Obese: '#E57373'
  }[category] || '#BDBDBD';

  return (
    <Card sx={{ backgroundColor: color, mt: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Your BMI: {bmi} {emoji}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Category: <strong>{category}</strong>
        </Typography>
        <Typography variant="body2" gutterBottom>
          {advice}
        </Typography>
        <Typography variant="caption" display="block" mt={1}>
          {calories}
        </Typography>
      </CardContent>
    </Card>
  );
}
