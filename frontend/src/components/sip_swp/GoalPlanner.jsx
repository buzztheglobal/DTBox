// Filename: src/components/sip_swp/GoalPlanner.jsx
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import { formBoxStyle, formFieldStyle, resultBoxStyle, toolButtonStyle } from '../../styles/globalStyles';

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
    <Box sx={formBoxStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Target Amount (₹)" value={target} onChange={(e) => setTarget(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Tenure (Years)" value={tenure} onChange={(e) => setTenure(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Expected Return (% p.a.)" value={rate} onChange={(e) => setRate(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Inflation Rate (% p.a.)" value={inflation} onChange={(e) => setInflation(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12}><Button sx={toolButtonStyle} onClick={calculateRequiredSIP}>Calculate</Button></Grid>
      </Grid>

      {sip && (
        <Box sx={resultBoxStyle} mt={3}>
          <Typography variant="h6">Required SIP:</Typography>
          <Typography>Monthly SIP Needed: ₹{sip.required.toFixed(2)}</Typography>
          <Typography>Inflation Adjusted Goal: ₹{sip.adjustedTarget.toFixed(2)}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default GoalPlanner;
