// Filename: src/components/sip_swp/StepUpCalculator.jsx
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import { formBoxStyle, formFieldStyle, resultBoxStyle, toolButtonStyle } from '../../styles/globalStyles';

const StepUpCalculator = () => {
  const [amount, setAmount] = useState(5000);
  const [stepUp, setStepUp] = useState(10);
  const [tenure, setTenure] = useState(10);
  const [rate, setRate] = useState(12);
  const [futureValue, setFutureValue] = useState(null);

  const calculateStepUpSIP = () => {
    const i = rate / 12 / 100;
    let fv = 0;
    for (let y = 0; y < tenure; y++) {
      const yearlySIP = amount * Math.pow(1 + stepUp / 100, y);
      const n = (tenure - y) * 12;
      fv += yearlySIP * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    }
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
          <Typography>₹{futureValue.toFixed(2)}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default StepUpCalculator;
