// src/pages/tools/JSONFormatterPage.jsx
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\JSONFormatterPage.jsx
import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import ConversionTabs from "../../components/json_csv_converter/conversionTabs";
import { pageContainerStyle, pageTitleStyle } from "../../styles/globalStyles";

const JSONFormatterPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Featured");

  return (
    <Container sx={pageContainerStyle}>
      <Typography variant="h4" sx={pageTitleStyle}>
        JSON Formatter & Converter
      </Typography>
 

      {/* Tool content */}
      <ConversionTabs category={selectedCategory} />
    </Container>
  );
};

export default JSONFormatterPage;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\JSONFormatterPage.jsx