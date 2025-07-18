// File: BMIResultCard.jsx
import React, { createContext, useContext } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export const BMIContext = createContext();

function BMIResultCard() {
  const { result } = useContext(BMIContext);

  if (!result) return null;

  return (
    <Card className="bmi-result-card" sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6">Your BMI: {result.bmi}</Typography>
        <Typography variant="subtitle1">Category: {result.category}</Typography>
      </CardContent>
    </Card>
  );
}

export default BMIResultCard;
