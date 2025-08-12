// src/pages/tools/JSONFormatterPage.jsx
// src/pages/tools/JSONFormatterPage.jsx
import React from "react";
import { Container, Typography } from "@mui/material";
import ConversionTabs from "../../components/json_csv_converter/conversionTabs";
import { pageContainerStyle, pageTitleStyle } from "../../styles/globalStyles";

const JSONFormatterPage = () => {
  return (
    <Container sx={pageContainerStyle}>
      <Typography variant="h4" sx={pageTitleStyle}>
        JSON Formatter & Converter
      </Typography>
      <ConversionTabs />
    </Container>
  );
};

export default JSONFormatterPage;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\JSONFormatterPage.jsx