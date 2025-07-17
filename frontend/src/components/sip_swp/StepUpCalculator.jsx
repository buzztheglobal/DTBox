// Filename: src/components/sip_swp/StepUpCalculator.jsx
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  formBoxStyle,
  formFieldStyle,
  resultBoxStyle,
  toolButtonStyle
} from '../../styles/globalStyles';

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const StepUpCalculator = () => {
  const [amount, setAmount] = useState(5000);
  const [stepUp, setStepUp] = useState(10);
  const [tenure, setTenure] = useState(10);
  const [rate, setRate] = useState(12);
  const [yearlyValues, setYearlyValues] = useState([]);
  const [futureValue, setFutureValue] = useState(null);

  const calculateStepUpSIP = () => {
    const i = rate / 12 / 100;
    let fv = 0;
    let yearlyGrowth = [];

    for (let y = 0; y < tenure; y++) {
      const yearlySIP = amount * Math.pow(1 + stepUp / 100, y);
      const n = (tenure - y) * 12;
      const yearlyFV = yearlySIP * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
      fv += yearlyFV;
      yearlyGrowth.push(Math.round(yearlyFV));
    }

    setYearlyValues(yearlyGrowth);
    setFutureValue(fv);
  };

  return (
    <Box sx={formBoxStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Starting SIP (₹)" value={amount} onChange={(e) => setAmount(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Step-Up % (Yearly)" value={stepUp} onChange={(e) => setStepUp(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Tenure (Years)" value={tenure} onChange={(e) => setTenure(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Expected Return (% p.a.)" value={rate} onChange={(e) => setRate(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12}><Button sx={toolButtonStyle} onClick={calculateStepUpSIP}>Calculate</Button></Grid>
      </Grid>

      {futureValue && (
        <Box sx={resultBoxStyle} mt={3}>
          <Typography variant="h6">Future Value with Step-Up:</Typography>
          <Typography>{formatCurrency(futureValue)}</Typography>

          <Box mt={3} style={{ maxWidth: 600 }}>
            <Line
              data={{
                labels: [...Array(tenure).keys()].map((y) => `Year ${y + 1}`),
                datasets: [
                  {
                    label: 'Year-wise SIP Growth (₹)',
                    data: yearlyValues,
                    fill: true,
                    borderColor: '#3f51b5',
                    backgroundColor: 'rgba(63, 81, 181, 0.2)',
                    tension: 0.4,
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StepUpCalculator;
