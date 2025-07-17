// Filename: src/components/sip_swp/SIPForm.jsx
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import { formBoxStyle, formFieldStyle, resultBoxStyle, toolButtonStyle } from '../../styles/globalStyles';
import ResultChart from './ResultChart';

const SIPForm = () => {
  const [amount, setAmount] = useState(5000);
  const [tenure, setTenure] = useState(10);
  const [rate, setRate] = useState(12);
  const [inflation, setInflation] = useState(6);
  const [result, setResult] = useState(null);

  const calculateSIP = () => {
    const i = rate / 12 / 100;
    const n = tenure * 12;
    const futureValue = amount * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const inflationAdjusted = futureValue / Math.pow(1 + inflation / 100, tenure);
    setResult({ futureValue, inflationAdjusted });
  };

  return (
    <Box sx={formBoxStyle}>
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
          <Typography>Future Value: ₹{result.futureValue.toFixed(2)}</Typography>
          <Typography>Inflation Adjusted: ₹{result.inflationAdjusted.toFixed(2)}</Typography>
          <ResultChart labels={['Today', `${tenure} yrs`]} data={[0, result.futureValue]} adjusted={[0, result.inflationAdjusted]} />
        </Box>
      )}
    </Box>
  );
};

export default SIPForm;
