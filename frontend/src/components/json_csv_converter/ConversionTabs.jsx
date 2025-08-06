// /src/components/json_csv_converter/ConversionTabs.jsx
import React, { useState, useRef } from "react";
import {
  Box, Tabs, Tab, Button, Typography, FormControlLabel,
  Switch, MenuItem, Select, InputLabel, Stack, Paper
} from "@mui/material";
import JsonInputPanel from "./JsonInputPanel";
import CsvInputPanel from "./CsvInputPanel";
import OutputViewer from "./OutputViewer";
import { jsonToCsv, csvToJson } from "./ConverterUtils";
import { FaFileCsv, FaFileCode } from "react-icons/fa"; // npm install react-icons

const MAX_FILE_SIZE_MB = 2;

const ConversionTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [jsonInput, setJsonInput] = useState("");
  const [csvInput, setCsvInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [flattenJson, setFlattenJson] = useState(true);
  const fileInputRef = useRef();

  const validateFileSize = (file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleFileUpload = (file) => {
    const validExtensions = tabIndex === 0 ? [".json"] : [".csv"];
    const fileExt = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

    if (!validExtensions.includes(fileExt)) {
      alert(`❌ Invalid file type. Only ${validExtensions.join(", ")} allowed.`);
      return;
    }

    if (!validateFileSize(file)) {
      alert(`❌ File too large. Max ${MAX_FILE_SIZE_MB}MB allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (tabIndex === 0) setJsonInput(reader.result);
      else setCsvInput(reader.result);
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e) => {
    handleFileUpload(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const filename = tabIndex === 0 ? "converted.csv" : "converted.json";
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setJsonInput("");
    setCsvInput("");
    setOutput("");
    setDelimiter(",");
    setFlattenJson(true);
  };

  const handleJsonToCsv = () => {
    try {
      const json = JSON.parse(jsonInput);
      const csv = jsonToCsv(json, delimiter, flattenJson);
      setOutput(csv);
    } catch (err) {
      setOutput(`❌ Invalid JSON: ${err.message}`);
    }
  };

  const handleCsvToJson = () => {
    try {
      const json = csvToJson(csvInput, delimiter);
      setOutput(JSON.stringify(json, null, 2));
    } catch (err) {
      setOutput(`❌ Invalid CSV: ${err.message}`);
    }
  };

  const dragDropLabel = tabIndex === 0 ? "Drop a JSON file here" : "Drop a CSV file here";
  const fileIcon = tabIndex === 0 ? <FaFileCode size={24} style={{ marginRight: 8 }} /> : <FaFileCsv size={24} style={{ marginRight: 8 }} />;

  return (
    <Box>
      <Tabs centered value={tabIndex} onChange={(e, val) => setTabIndex(val)}>
        <Tab label="JSON ➜ CSV" />
        <Tab label="CSV ➜ JSON" />
      </Tabs>

      <Box mt={2}>
        {/* Upload + Dropzone */}
        <input
          type="file"
          accept={tabIndex === 0 ? ".json" : ".csv"}
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 2,
            borderStyle: "dashed",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#f8f8f8",
          }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <Stack direction="row" justifyContent="center" alignItems="center">
            {fileIcon}
            <Typography>{dragDropLabel} or click to select</Typography>
          </Stack>
        </Paper>

        {/* Input Panel */}
        {tabIndex === 0 ? (
          <>
            <JsonInputPanel jsonInput={jsonInput} setJsonInput={setJsonInput} />
            <Stack direction="row" spacing={2} alignItems="center" mt={1} mb={2}>
              <FormControlLabel
                control={
                  <Switch checked={flattenJson} onChange={() => setFlattenJson(!flattenJson)} />
                }
                label="Flatten Nested JSON"
              />
              <InputLabel>Delimiter</InputLabel>
              <Select
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                size="small"
              >
                <MenuItem value=",">Comma (,)</MenuItem>
                <MenuItem value=";">Semicolon (;)</MenuItem>
                <MenuItem value="\t">Tab (↹)</MenuItem>
              </Select>
            </Stack>
            <Button variant="contained" onClick={handleJsonToCsv}>
              Convert to CSV
            </Button>
          </>
        ) : (
          <>
            <CsvInputPanel csvInput={csvInput} setCsvInput={setCsvInput} />
            <Stack direction="row" spacing={2} alignItems="center" mt={1} mb={2}>
              <InputLabel>Delimiter</InputLabel>
              <Select
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                size="small"
              >
                <MenuItem value=",">Comma (,)</MenuItem>
                <MenuItem value=";">Semicolon (;)</MenuItem>
                <MenuItem value="\t">Tab (↹)</MenuItem>
              </Select>
            </Stack>
            <Button variant="contained" onClick={handleCsvToJson}>
              Convert to JSON
            </Button>
          </>
        )}

        {/* Output Panel */}
        {output && (
          <>
            <OutputViewer output={output} type={tabIndex === 0 ? "csv" : "json"} />
            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="outlined" onClick={handleDownload}>
                Download Result
              </Button>
              <Button variant="text" color="error" onClick={handleReset}>
                Reset
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ConversionTabs;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\json_csv_converter\ConversionTabs.jsx