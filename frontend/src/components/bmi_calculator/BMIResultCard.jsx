// File: frontend/src/components/bmi_calculator/BMIResultCard.jsx
import React, { useContext } from 'react';
import { Card, CardContent, Typography, Fade } from '@mui/material';

import { BMIContext } from '../../context/BMIContext';

export function BMIResultCard() {
  const { result } = useContext(BMIContext);

  return (
    <Fade in={!!result}>
      <Card elevation={3} sx={{ height: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Your BMI: {result?.bmi}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Category: {result?.category}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Health Advice: {result?.advice}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default BMIResultCard;
