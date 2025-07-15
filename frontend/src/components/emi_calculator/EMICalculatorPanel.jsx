// src/components/emi_calculator/EMICalculatorPanel.jsx
import React, { useState } from 'react';
import { Box, TextField, MenuItem, Typography, Slider, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import EMIResultCard from './EMIResultCard';
import './emi_calculator.css';

const EMICalculatorPanel = () => {
  const [loanType, setLoanType] = useState('Home Loan');
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(6.75);
  const [tenure, setTenure] = useState(10); // default in years
  const [tenureUnit, setTenureUnit] = useState('years');
  const [showResult, setShowResult] = useState(false);

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) setTenureUnit(newUnit);
  };

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenureUnit === 'years' ? tenure * 12 : tenure;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: principal.toFixed(2),
    };
  };

  const result = showResult ? calculateEMI() : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
      <Box sx={{ flex: 1, minWidth: '300px', padding: '2rem' }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
          Wealth Creation
        </Typography>

        <Typography gutterBottom>Number of {tenureUnit} to achieve the goal: {tenure}</Typography>
        <Slider
          value={tenure}
          min={1}
          max={tenureUnit === 'years' ? 30 : 360}
          step={1}
          valueLabelDisplay="auto"
          onChange={(e, val) => setTenure(val)}
        />

        <ToggleButtonGroup
          value={tenureUnit}
          exclusive
          onChange={handleUnitChange}
          sx={{ my: 2 }}
        >
          <ToggleButton className="tool-button" value="years">Year</ToggleButton>
          <ToggleButton className="tool-button" value="months">Months</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label="Estimated amount of the goal (₹)"
          type="number"
          fullWidth
          margin="normal"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
        />

        <TextField
          label="Estimated inflation rate for future years (%)"
          type="number"
          fullWidth
          margin="normal"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />

        <Button
          variant="contained"
          fullWidth
          className="tool-button"
          sx={{ mt: 3 }}
          onClick={() => setShowResult(true)}
        >
          Calculate
        </Button>
      </Box>

      {showResult && <EMIResultCard result={result} />}
    </Box>
  );
};

export default EMICalculatorPanel;
