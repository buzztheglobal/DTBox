// File: src/pages/tools/BMICalculatorPage.jsx
import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import BMICalculatorForm from '../../components/bmi_calculator/BMICalculatorForm';
import BMIResultCard from '../../components/bmi_calculator/BMIResultCard';
import { BMIContextProvider } from '../../context/BMIContextProvider';

export default function BMICalculatorPage() {
  return (
    <BMIContextProvider>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          BMI Calculator
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Check your Body Mass Index (BMI) and get health insights.
        </Typography>

        {/* Input + Result side by side */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <BMICalculatorForm />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <BMIResultCard />
          </Grid>
        </Grid>

        {/* Tips */}
        <Box mt={5}>
          <Typography variant="h6" gutterBottom>
            💡 Tips for a Healthy BMI
          </Typography>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Stay hydrated with 2–3 liters of water daily.</li>
            <li>Exercise regularly — even 30 min/day helps.</li>
            <li>Eat balanced meals: fruits, veggies, protein, good fats.</li>
            <li>Sleep at least 7–8 hours a night.</li>
          </ul>
        </Box>

        {/* Disclaimer */}
        <Box mt={3}>
          <Typography variant="caption" color="text.secondary">
            ⚠️ <strong>Disclaimer:</strong> This calculator is for general wellness use. BMI doesn't reflect body fat directly and may not apply to athletes, children, or those with medical conditions. Please consult a healthcare provider for personalized advice.
          </Typography>
        </Box>
      </Container>
    </BMIContextProvider>
  );
}
