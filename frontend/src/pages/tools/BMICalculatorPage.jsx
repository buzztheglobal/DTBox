// File: frontend/src/pages/tools/BMICalculatorPage.jsx

import React, { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import BMICalculatorForm from '../../components/bmi_calculator/BMICalculatorForm';
import BMIResultCard, { BMIContext } from '../../components/bmi_calculator/BMIResultCard';
import {
  pageContainerStyle,
  pageTitleStyle,
  formBoxStyle,
  cardBoxStyle,
} from '../../styles/globalStyles';
import '../../App.css';

export default function BMICalculatorPage() {
  const [result, setResult] = useState(null);

  return (
    <BMIContext.Provider value={{ result, setResult }}>
      <Container maxWidth="sm" sx={pageContainerStyle}>
        <Paper elevation={3} sx={cardBoxStyle}>
          <Box sx={formBoxStyle}>
            <Typography variant="h4" sx={pageTitleStyle}>
              BMI Calculator
            </Typography>
            <BMICalculatorForm />
          </Box>
        </Paper>
        <BMIResultCard />
      </Container>
    </BMIContext.Provider>
  );
}
