// File: frontend/src/components/rd_calculator/RDCalculatorForm.jsx

import React, { useState } from "react";
import {
  Box, TextField, MenuItem, FormControl,
  InputLabel, Select, Typography, Grid, Switch,
  FormControlLabel,
} from "@mui/material";
import {
  formBoxStyle,
  formFieldStyle,
} from "../../styles/globalStyles";

const RDCalculatorForm = ({ onCalculate }) => {
  const [monthlyDeposit, setMonthlyDeposit] = useState(1000);
  const [tenure, setTenure] = useState(12);
  const [interestRate, setInterestRate] = useState(6.5);
  const [compounding, setCompounding] = useState("Quarterly");
  const [isSenior, setIsSenior] = useState(false);
  const [applyTDS, setApplyTDS] = useState(false);

  const [tdsAmount, setTdsAmount] = useState(0);
  const [estimatedInterest, setEstimatedInterest] = useState(0);

  const handleChange = () => {
    const adjustedRate = isSenior ? interestRate + 0.5 : interestRate;

    const n = compounding === "Monthly" ? 12 : 4;
    const r = adjustedRate / 100;
    let maturity = 0;
    for (let i = 1; i <= tenure; i++) {
      const t = (tenure - i + 1) / 12;
      maturity += monthlyDeposit * Math.pow((1 + r / n), n * t);
    }

    const totalInvested = monthlyDeposit * tenure;
    const interest = maturity - totalInvested;

    setEstimatedInterest(interest);

    if (applyTDS && interest > 40000) {
      const tds = interest * 0.10; // PAN submitted
      setTdsAmount(tds);
    } else {
      setTdsAmount(0);
    }

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
      <Typography variant="h6" gutterBottom>
        Investment Details
      </Typography>

      <TextField
        fullWidth
        label="Monthly Deposit (₹)"
        type="number"
        value={monthlyDeposit}
        onChange={(e) => setMonthlyDeposit(+e.target.value)}
        onBlur={handleChange}
        sx={formFieldStyle}
      />

      <TextField
        fullWidth
        label="Tenure (Months)"
        type="number"
        inputProps={{ min: 6, max: 120 }}
        value={tenure}
        onChange={(e) => setTenure(+e.target.value)}
        onBlur={handleChange}
        sx={formFieldStyle}
      />

      <TextField
        fullWidth
        label="Interest Rate (% p.a.)"
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
          onChange={(e) => {
            setCompounding(e.target.value);
            handleChange();
          }}
        >
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Quarterly">Quarterly</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControlLabel SX={formBoxStyle}
            control={
              <Switch
                checked={isSenior}
                onChange={(e) => {
                  setIsSenior(e.target.checked);
                  handleChange();
                }}
              />
            }
            label="Senior Citizen"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel  SX={formBoxStyle}
            control={
              <Switch
                checked={applyTDS}
                onChange={(e) => {
                  setApplyTDS(e.target.checked);
                  handleChange();
                }}
              />
            }
            label="Apply TDS"
          />
        </Grid>
      </Grid>

      {/* ✨ Benefit/Impact Messaging Section */}
      {isSenior && (
        <Typography variant="body2" sx={{ mt: 1, color: "green" }}>
          ✅ You’re getting an additional 0.50% p.a. interest as a Senior Citizen.
        </Typography>
      )}

      {applyTDS && estimatedInterest > 40000 && (
        <Typography variant="body2" sx={{ mt: 1, color: "red" }}>
          ⚠️ TDS @10% applicable. Approx. ₹
          {tdsAmount.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          will be deducted from interest.
        </Typography>
      )}
    </Box>
  );
};

export default RDCalculatorForm;
