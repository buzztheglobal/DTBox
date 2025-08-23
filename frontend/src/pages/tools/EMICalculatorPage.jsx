// src/pages/tools/EMICalculatorPage.jsx
import React from 'react';
import { Container, Typography } from "@mui/material";
import EMICalculatorPanel from '../../components/emi_calculator/EMICalculatorPanel';
import '../../App.css';
import { pageContainerStyle, pageTitleStyle } from "../../styles/globalStyles";

const EMICalculatorPage = () => {
  return (
    <Container sx={pageContainerStyle}>
      <Typography variant="h4" sx={pageTitleStyle}>
        <EMICalculatorPanel />
      </Typography>
    </Container>
  );
};

export default EMICalculatorPage;
