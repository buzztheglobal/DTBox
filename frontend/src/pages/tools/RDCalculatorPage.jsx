// File: frontend/src/pages/tools/RDCalculatorPage.jsx

import React, { useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import RDCalculatorForm from "../../components/rd_calculator/RDCalculatorForm";
import RDResultBox from "../../components/rd_calculator/RDResultBox";

const RDCalculatorPage = () => {
  const [result, setResult] = useState(null);

  const calculateRD = ({ monthlyDeposit, tenure, interestRate, compounding, applyTDS }) => {
    const n = compounding === "Monthly" ? 12 : 4;
    const r = interestRate / 100;

    let maturity = 0;
    for (let i = 1; i <= tenure; i++) {
      const t = (tenure - i + 1) / 12;
      maturity += monthlyDeposit * Math.pow((1 + r / n), n * t);
    }

    const totalInvestment = monthlyDeposit * tenure;
    let interest = maturity - totalInvestment;

    if (applyTDS && interest > 40000) {
      interest -= interest * 0.1;
      maturity = totalInvestment + interest;
    }

    setResult({
      maturityAmount: maturity,
      interestEarned: interest,
      totalInvestment,
      tenure,
    });
  };

  return (
    <Container className="rd-container" sx={{ py: 4 }}>
      <Paper elevation={3} className="rd-paper" sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Recurring Deposit (RD) Calculator
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mt: 3,
          }}
        >
          {/* LEFT: 25% - Form */}
          <Box sx={{ flexBasis: { md: "25%", xs: "100%" } }}>
            <RDCalculatorForm onCalculate={calculateRD} />
          </Box>

          {/* RIGHT: 75% - Results */}
          <Box sx={{ flexBasis: { md: "75%", xs: "100%" } }}>
            <RDResultBox result={result} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RDCalculatorPage;
