// Filename: src/components/sip_swp/GoalPlanner.jsx
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  formBoxStyle,
  formFieldStyle,
  resultBoxStyle,
  toolButtonStyle
} from '../../styles/globalStyles';

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const GoalPlanner = () => {
  const [target, setTarget] = useState(1000000);
  const [tenure, setTenure] = useState(10);
  const [rate, setRate] = useState(12);
  const [inflation, setInflation] = useState(6);
  const [sip, setSip] = useState(null);

  const calculateRequiredSIP = () => {
    const adjustedTarget = target * Math.pow(1 + inflation / 100, tenure);
    const i = rate / 12 / 100;
    const n = tenure * 12;
    const sipAmount = adjustedTarget / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    setSip({ required: sipAmount, adjustedTarget });
  };

  return (
    <Box className="form-card" sx={formBoxStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Target Amount (₹)" value={target} onChange={(e) => setTarget(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Tenure (Years)" value={tenure} onChange={(e) => setTenure(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Expected Return (% p.a.)" value={rate} onChange={(e) => setRate(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Inflation Rate (% p.a.)" value={inflation} onChange={(e) => setInflation(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12}><Button className='btn'  sx={toolButtonStyle} onClick={calculateRequiredSIP}>Calculate</Button></Grid>
      </Grid>

      {sip && (
        <Box sx={resultBoxStyle} mt={3}>
          <Typography variant="h6">Required SIP:</Typography>
          <Typography>Monthly SIP Needed: {formatCurrency(sip.required)}</Typography>
          <Typography>Inflation Adjusted Goal: {formatCurrency(sip.adjustedTarget)}</Typography>

          <Box mt={3} style={{ maxWidth: 500 }}>
            <Bar
              data={{
                labels: ['Required SIP', 'Adjusted Goal'],
                datasets: [
                  {
                    label: '₹ Value',
                    data: [sip.required * tenure * 12, sip.adjustedTarget],
                    backgroundColor: ['#3f51b5', '#f44336'],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GoalPlanner;
// Note: Ensure you have the necessary styles defined in the specified paths. 
// Also, ensure you have react-chartjs-2 and chart.js installed in your project with `npm install react-chartjs-2 chart.js` or `yarn add react-chartjs-2 chart.js`.
// This component calculates the required SIP for a financial goal considering inflation and displays the result in a