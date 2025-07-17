// Filename: src/components/sip_swp/SWPForm.jsx
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

const SWPForm = () => {
  const [initial, setInitial] = useState(1000000);
  const [withdrawal, setWithdrawal] = useState(10000);
  const [tenure, setTenure] = useState(20);
  const [rate, setRate] = useState(8);
  const [inflation, setInflation] = useState(6);
  const [balanceHistory, setBalanceHistory] = useState([]);

  const calculateSWP = () => {
    let corpus = initial;
    const r = rate / 12 / 100;
    const adjusted = inflation / 12 / 100;
    let balances = [];

    for (let i = 0; i < tenure * 12; i++) {
      corpus = corpus * (1 + r);
      const adjustedWithdrawal = withdrawal * Math.pow(1 + adjusted, i / 12);
      corpus -= adjustedWithdrawal;
      balances.push(Math.max(0, Math.round(corpus)));
      if (corpus <= 0) break;
    }
    setBalanceHistory(balances);
  };

  return (
    <Box sx={formBoxStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Initial Investment (₹)" value={initial} onChange={(e) => setInitial(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Monthly Withdrawal (₹)" value={withdrawal} onChange={(e) => setWithdrawal(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Tenure (Years)" value={tenure} onChange={(e) => setTenure(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Expected Return (% p.a.)" value={rate} onChange={(e) => setRate(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Inflation Rate (% p.a.)" value={inflation} onChange={(e) => setInflation(+e.target.value)} sx={formFieldStyle} /></Grid>
        <Grid item xs={12}><Button sx={toolButtonStyle} onClick={calculateSWP}>Calculate</Button></Grid>
      </Grid>

      {balanceHistory.length > 0 && (
        <Box sx={resultBoxStyle} mt={3}>
          <Typography variant="h6">Corpus Over Time:</Typography>

          <Box mt={3} style={{ maxWidth: 600 }}>
            <Line
              data={{
                labels: balanceHistory.map((_, idx) => `Month ${idx + 1}`),
                datasets: [
                  {
                    label: 'Corpus Remaining (₹)',
                    data: balanceHistory,
                    fill: true,
                    borderColor: '#e91e63',
                    backgroundColor: 'rgba(233, 30, 99, 0.2)',
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

export default SWPForm;
