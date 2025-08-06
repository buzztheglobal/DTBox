// /src/components/json_csv_converter/JsonInputPanel.jsx
import React from "react";
import { TextField } from "@mui/material";

const JsonInputPanel = ({ jsonInput, setJsonInput }) => (
  <TextField
    label="Paste JSON here"
    multiline
    rows={10}
    fullWidth
    variant="outlined"
    value={jsonInput}
    onChange={(e) => setJsonInput(e.target.value)}
    sx={{ mb: 2 }}
  />
);

export default JsonInputPanel;



//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\json_csv_converter\JsonInputPanel.jsx