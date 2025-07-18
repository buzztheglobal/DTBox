import React from 'react';
import { Container, Grid, Typography, Box, useTheme } from '@mui/material';
import { BMIContextProvider } from '../../context/BMIContext';
import BMICalculatorForm from '../../components/bmi_calculator/BMICalculatorForm';
import BMIResultCard from '../../components/bmi_calculator/BMIResultCard';

export default function BMICalculatorPage() {
  const theme = useTheme();

  return (
    <BMIContextProvider>
      <Container maxWidth="md" sx={{ py: 5 }}>
        {/* Page Title */}
        <Typography variant="h4" gutterBottom textAlign="center">
          BMI Calculator
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
          Check your Body Mass Index (BMI) and get personalized health advice.
        </Typography>

        {/* Input and Result Side-by-Side */}
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                padding: 3,
                boxShadow: 1,
              }}
            >
              <BMICalculatorForm />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                padding: 3,
                boxShadow: 1,
              }}
            >
              <BMIResultCard />
            </Box>
          </Grid>
        </Grid>

        {/* Tips Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" gutterBottom>
            💡 Tips for Maintaining a Healthy BMI
          </Typography>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Stay hydrated — drink 2–3 liters of water daily.</li>
            <li>Exercise at least 30 mins a day — walking, cycling, or yoga.</li>
            <li>Eat balanced meals — focus on veggies, proteins, and healthy fats.</li>
            <li>Sleep well — aim for 7–8 hours of quality sleep every night.</li>
          </ul>
        </Box>

        {/* Disclaimer Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="caption" display="block" color="text.secondary">
            ⚠️ <strong>Disclaimer:</strong> This BMI calculator is for informational use only and may not
            be suitable for everyone. It does not consider factors like muscle mass, bone density, or medical
            conditions. Consult a healthcare provider for a professional assessment.
          </Typography>
        </Box>
      </Container>
    </BMIContextProvider>
  );
}
