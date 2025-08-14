// /src/components/json_csv_converter/OutputViewer.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const OutputViewer = ({ output, type }) => {
  return (
    <Box className="form-card"
      sx={{
        mt: 2,
        p: 2,
        backgroundColor: type === "json" ? "#f9f9f9" : "#e3f2fd",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "monospace",
        overflowX: "auto",
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Output: 
      </Typography>
      <pre style={{ margin: 0 }}>{output}</pre>
    </Box>
  );
};

export default OutputViewer;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\json_csv_converter\OutputViewer.jsx