// Filename: src/components/sip_swp/SIPFormWithPieChart.jsx
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  formBoxStyle,
  formFieldStyle,
  resultBoxStyle,
  toolButtonStyle
} from '../../styles/globalStyles';

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const SIPFormWithPieChart = () => {
  const [amount, setAmount] = useState(5000);
  const [tenure, setTenure] = useState(10);
  const [rate, setRate] = useState(12);
  const [inflation, setInflation] = useState(6);
  const [result, setResult] = useState(null);

  const calculateSIP = () => {
    const i = rate / 12 / 100;
    const n = tenure * 12;
    const futureValue = amount * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const investedAmount = amount * n;
    const gain = futureValue - investedAmount;
    const inflationAdjusted = futureValue / Math.pow(1 + inflation / 100, tenure);

    setResult({ futureValue, investedAmount, gain, inflationAdjusted });
  };

  return (
    <Box className="form-card" sx={formBoxStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Monthly SIP (₹)" value={amount} onChange={(e) => setAmount(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Investment Tenure (Years)" value={tenure} onChange={(e) => setTenure(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Expected Return (% p.a.)" value={rate} onChange={(e) => setRate(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Inflation Rate (% p.a.)" value={inflation} onChange={(e) => setInflation(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12}><Button sx={toolButtonStyle} onClick={calculateSIP}>Calculate</Button></Grid>
      </Grid>

      {result && (
        <Box sx={resultBoxStyle} mt={3}>
          <Typography variant="h6">Results:</Typography>
          <Typography>Total Invested: {formatCurrency(result.investedAmount)}</Typography>
          <Typography>Future Value: {formatCurrency(result.futureValue)}</Typography>
          <Typography>Wealth Gained: {formatCurrency(result.gain)}</Typography>
          <Typography>Inflation Adjusted: {formatCurrency(result.inflationAdjusted)}</Typography>

          <Box mt={3} style={{ maxWidth: 400 }}>
            <Pie
              data={{
                labels: ['Invested', 'Gain'],
                datasets: [
                  {
                    data: [result.investedAmount, result.gain],
                    backgroundColor: ['#4CAF50', '#FF9800'],
                    hoverOffset: 6,
                  },
                ],
              }}
              options={{ plugins: { legend: { position: 'bottom' } } }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SIPFormWithPieChart;
