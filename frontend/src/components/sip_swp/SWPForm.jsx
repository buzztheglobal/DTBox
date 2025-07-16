// Filename: src/components/sip_swp/SWPForm.jsx
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import { formBoxStyle, formFieldStyle, resultBoxStyle, toolButtonStyle } from '../../styles/globalStyles';

const SWPForm = () => {
  const [initial, setInitial] = useState(1000000);
  const [withdrawal, setWithdrawal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [inflation, setInflation] = useState(6);
  const [tenure, setTenure] = useState(20);
  const [summary, setSummary] = useState(null);

  const calculateSWP = () => {
    let balance = initial;
    let totalWithdrawn = 0;
    let months = 0;
    const monthlyRate = rate / 12 / 100;
    const inflAdj = Math.pow(1 + inflation / 100, 1 / 12);

    while (months < tenure * 12 && balance > 0) {
      const inflWithdrawal = withdrawal * Math.pow(inflAdj, months);
      balance = balance * (1 + monthlyRate) - inflWithdrawal;
      totalWithdrawn += inflWithdrawal;
      months++;
    }

    setSummary({ totalWithdrawn, balance: balance < 0 ? 0 : balance, months });
  };

  return (
    <Box sx={formBoxStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Initial Investment (₹)" value={initial} onChange={(e) => setInitial(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Monthly Withdrawal (₹)" value={withdrawal} onChange={(e) => setWithdrawal(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Expected Return (% p.a.)" value={rate} onChange={(e) => setRate(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Inflation (% p.a.)" value={inflation} onChange={(e) => setInflation(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12}><TextField fullWidth label="Tenure (Years)" value={tenure} onChange={(e) => setTenure(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12}><Button sx={toolButtonStyle} onClick={calculateSWP}>Calculate</Button></Grid>
      </Grid>

      {summary && (
        <Box sx={resultBoxStyle} mt={3}>
          <Typography variant="h6">SWP Summary:</Typography>
          <Typography>Total Withdrawn: ₹{summary.totalWithdrawn.toFixed(0)}</Typography>
          <Typography>Corpus Remaining: ₹{summary.balance.toFixed(0)}</Typography>
          <Typography>Corpus lasted: {Math.floor(summary.months / 12)} years {summary.months % 12} months</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SWPForm;
