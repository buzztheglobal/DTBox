// File: frontend/src/components/rd_calculator/RDCalculatorForm.jsx
import React, { useState } from "react";
import {
  Box, TextField, MenuItem, FormControl, InputLabel,
  Select, Typography, Grid, Switch, FormControlLabel
} from "@mui/material";
import { formBoxStyle, formFieldStyle } from "../../styles/globalStyles";

const RDCalculatorForm = ({ onCalculate }) => {
  const [monthlyDeposit, setMonthlyDeposit] = useState(1000);
  const [tenure, setTenure] = useState(12);
  const [interestRate, setInterestRate] = useState(6.5);
  const [compounding, setCompounding] = useState("Monthly");
  const [isSenior, setIsSenior] = useState(false);
  const [applyTDS, setApplyTDS] = useState(false);

  const handleChange = () => {
    const adjustedRate = isSenior ? interestRate + 0.5 : interestRate;
    onCalculate({
      monthlyDeposit,
      tenure,
      interestRate: adjustedRate,
      compounding,
      applyTDS,
    });
  };

  return (
    <Box sx={formBoxStyle}>
      <Typography variant="h6" gutterBottom>Investment Details</Typography>

      <TextField
        fullWidth label="Monthly Deposit (₹)"
        type="number" value={monthlyDeposit}
        onChange={(e) => setMonthlyDeposit(+e.target.value)} // ✅ CORRECT
        onBlur={handleChange}
        sx={formFieldStyle}
      />

      <TextField
        fullWidth label="Tenure (Months)"
        type="number" inputProps={{ min: 6, max: 120 }}
        value={tenure}
        onChange={(e) => setTenure(+e.target.value)}
        onBlur={handleChange}
        sx={formFieldStyle}
      />

      <TextField
        fullWidth label="Interest Rate (% p.a.)"
        type="number"
        value={interestRate}
        onChange={(e) => setInterestRate(+e.target.value)}
        onBlur={handleChange}
        sx={formFieldStyle}
      />

      <FormControl fullWidth sx={formFieldStyle}>
        <InputLabel>Compounding Frequency</InputLabel>
        <Select
          value={compounding}
          onChange={(e) => { setCompounding(e.target.value); handleChange(); }}
        >
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Quarterly">Quarterly</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Switch checked={isSenior} onChange={(e) => { setIsSenior(e.target.checked); handleChange(); }} />}
            label="Senior Citizen"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Switch checked={applyTDS} onChange={(e) => { setApplyTDS(e.target.checked); handleChange(); }} />}
            label="Apply TDS"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RDCalculatorForm;
