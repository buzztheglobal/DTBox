// /src/components/json_csv_converter/CsvInputPanel.jsx
import React from "react";
import { TextField } from "@mui/material";

const CsvInputPanel = ({ csvInput, setCsvInput }) => (
  <TextField
    label="Paste CSV here"
    multiline
    rows={10}
    fullWidth
    variant="outlined"
    value={csvInput}
    onChange={(e) => setCsvInput(e.target.value)}
    sx={{ mb: 2 }}
  />
);

export default CsvInputPanel;

