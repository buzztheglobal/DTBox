//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\emi_calculator\EMICalculatorPanel.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Stack,
  Fade,
} from "@mui/material";
import EMIResultCard from "./EMIResultCard";
import {
  formBoxStyle,
  formFieldStyle,
  pageTitleStyle,
  toolButtonStyle,
  resultBoxStyle,
} from "../../styles/globalStyles";
import "./emi_calculator.css";

const EMICalculatorPanel = () => {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(6.75);
  const [tenure, setTenure] = useState(10); // default in years
  const [tenureUnit, setTenureUnit] = useState("years");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) setTenureUnit(newUnit);
  };

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenureUnit === "years" ? tenure * 12 : tenure;

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

  useEffect(() => {
    if (showResult) {
      const calc = calculateEMI();
      setResult(calc);
    }
  }, [loanAmount, interestRate, tenure, tenureUnit, showResult]);

  const handleReset = () => {
    setShowResult(false);
    setTimeout(() => {
      setLoanAmount(2500000);
      setInterestRate(6.75);
      setTenure(10);
      setTenureUnit("years");
      setResult(null);
    }, 300);
  };

  return (
    <Box
      className="calculator-container"
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        fontFamily: "Roboto, sans-serif", // ✅ enforce Roboto
      }}
    >
      {/* Left Panel */}
      <Box sx={{ flex: 1, minWidth: "300px", p: 3 }}>
        <Typography variant="h5" sx={{ ...pageTitleStyle, fontFamily: "Roboto, sans-serif" }}>
          Wealth Creation
        </Typography>

        <Typography
          sx={{ color: "text.secondary", mb: 2, fontFamily: "Roboto, sans-serif" }}
        >
          Number of {tenureUnit} to achieve the goal: {tenure}
        </Typography>

        <Slider
          value={tenure}
          min={1}
          max={tenureUnit === "years" ? 30 : 360}
          step={1}
          valueLabelDisplay="auto"
          onChange={(e, val) => setTenure(val)}
          sx={{ mb: 2 }}
        />

        <ToggleButtonGroup
          value={tenureUnit}
          exclusive
          onChange={handleUnitChange}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="years">Years</ToggleButton>
          <ToggleButton value="months">Months</ToggleButton>
        </ToggleButtonGroup>

        <Box sx={formBoxStyle}>
          <TextField
            sx={{ ...formFieldStyle, fontFamily: "Roboto, sans-serif" }}
            label="Estimated amount of the goal (₹)"
            type="number"
            fullWidth
            value={loanAmount}
            variant="outlined"
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
          <TextField
            sx={{ ...formFieldStyle, fontFamily: "Roboto, sans-serif" }}
            label="Estimated inflation rate for future years (%)"
            type="number"
            fullWidth
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button className="btn" fullWidth sx={toolButtonStyle} onClick={() => setShowResult(true)}>
            Calculate
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            className="btn"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Stack>
      </Box>

      {/* Right Panel - Result */}
      <Fade in={showResult} timeout={400} unmountOnExit>
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          {result && (
            <Box sx={resultBoxStyle}>
              <EMIResultCard result={result} />
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default EMICalculatorPanel;
