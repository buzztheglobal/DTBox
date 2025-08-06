// /src/components/json_csv_converter/ConversionTabs.jsx
import React, { useState } from "react";
import {
  Box, Tabs, Tab, Button, Typography
} from "@mui/material";
import JsonInputPanel from "./JsonInputPanel";
import CsvInputPanel from "./CsvInputPanel";
import OutputViewer from "./OutputViewer";
import { jsonToCsv, csvToJson } from "./ConverterUtils";

const ConversionTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [jsonInput, setJsonInput] = useState("");
  const [csvInput, setCsvInput] = useState("");
  const [output, setOutput] = useState("");

  const handleJsonToCsv = () => {
    try {
      const json = JSON.parse(jsonInput);
      const csv = jsonToCsv(json);
      setOutput(csv);
    } catch (err) {
      setOutput(`❌ Invalid JSON: ${err.message}`);
    }
  };

  const handleCsvToJson = () => {
    try {
      const json = csvToJson(csvInput);
      setOutput(JSON.stringify(json, null, 2));
    } catch (err) {
      setOutput(`❌ Invalid CSV: ${err.message}`);
    }
  };

  return (
    <Box>
      <Tabs centered value={tabIndex} onChange={(e, val) => setTabIndex(val)}>
        <Tab label="JSON ➜ CSV" />
        <Tab label="CSV ➜ JSON" />
      </Tabs>

      <Box mt={2}>
        {tabIndex === 0 ? (
          <>
            <JsonInputPanel jsonInput={jsonInput} setJsonInput={setJsonInput} />
            <Button variant="contained" onClick={handleJsonToCsv}>
              Convert to CSV
            </Button>
          </>
        ) : (
          <>
            <CsvInputPanel csvInput={csvInput} setCsvInput={setCsvInput} />
            <Button variant="contained" onClick={handleCsvToJson}>
              Convert to JSON
            </Button>
          </>
        )}

        {output && (
          <OutputViewer output={output} type={tabIndex === 0 ? "csv" : "json"} />
        )}
      </Box>
    </Box>
  );
};

export default ConversionTabs;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\json_csv_converter\ConversionTabs.jsx