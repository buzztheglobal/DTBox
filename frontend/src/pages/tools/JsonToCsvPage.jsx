// /src/pages/tools/JsonToCsvPage.jsx
import React from "react";
import { Container, Typography } from "@mui/material";
import ConversionTabs from "../../components/json_csv_converter/ConversionTabs";
import { pageContainerStyle, pageTitleStyle } from "../../styles/globalStyles";

const JsonToCsvPage = () => {
  return (
    <Container sx={pageContainerStyle}>
      <Typography variant="h4" sx={pageTitleStyle}>
        JSON ↔ CSV Converter
      </Typography>
      <ConversionTabs />
    </Container>
  );
};

export default JsonToCsvPage;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\JsonToCsvPage.jsx