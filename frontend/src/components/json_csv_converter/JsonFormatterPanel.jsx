// src/components/json_csv_converter/JsonFormatterPanel.jsx
// src/components/json_csv_converter/JsonFormatterPanel.jsx
import React, { useState, useRef } from "react";
import { Box, Button, Stack, Select, MenuItem, InputLabel, FormControl, Switch, FormControlLabel, Alert, Typography } from "@mui/material";
import JsonTreeView from "./JsonTreeView";
import OutputViewer from "./OutputViewer"; // your existing viewer for raw formatted JSON text

// Utility: deep sort keys
const sortObjectKeys = (obj) => {
  if (Array.isArray(obj)) return obj.map(sortObjectKeys);
  if (obj && typeof obj === "object") {
    return Object.keys(obj).sort().reduce((acc, k) => {
      acc[k] = sortObjectKeys(obj[k]);
      return acc;
    }, {});
  }
  return obj;
};

const JsonFormatterPanel = () => {
  const [rawJson, setRawJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [parsedJson, setParsedJson] = useState(null);
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [error, setError] = useState("");
  const [expandAllKey, setExpandAllKey] = useState(0);
  const treeRef = useRef(null);

  const parseAndFormat = ({ minify = false } = {}) => {
    try {
      setError("");
      let obj = JSON.parse(rawJson);
      if (sortKeys) obj = sortObjectKeys(obj);
      const txt = minify ? JSON.stringify(obj) : JSON.stringify(obj, null, indentSize);
      setFormattedJson(txt);
      setParsedJson(obj);
    } catch (err) {
      setError(err.message);
      setFormattedJson("");
      setParsedJson(null);
    }
  };

  const handleFormat = () => parseAndFormat({ minify: false });
  const handleMinify = () => parseAndFormat({ minify: true });
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
    } catch (err) {
      console.warn("copy failed", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([formattedJson], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExpandAll = () => {
    // simple approach: change key so JsonTreeView re-mounts with initial expanded depth large
    setExpandAllKey((k) => k + 1);
  };

  return (
    <Box>
      <textarea
        className="form-control"
        rows={10}
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
        placeholder="Paste or drop raw JSON here..."
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <Stack direction="row" spacing={2} mb={2}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Indent</InputLabel>
          <Select value={indentSize} label="Indent" onChange={(e) => setIndentSize(Number(e.target.value))}>
            <MenuItem value={2}>2 Spaces</MenuItem>
            <MenuItem value={4}>4 Spaces</MenuItem>
            <MenuItem value={8}>8 Spaces</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Switch checked={sortKeys} onChange={() => setSortKeys((s) => !s)} />}
          label="Sort Keys"
        />

        <Button variant="contained" onClick={handleFormat}>Format JSON</Button>
        <Button variant="outlined" onClick={handleMinify}>Minify</Button>
        <Button variant="text" onClick={handleCopy}>Copy</Button>
        <Button variant="text" onClick={handleDownload}>Download</Button>
        <Button variant="contained" onClick={handleExpandAll} color="secondary">Expand All</Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Invalid JSON: {error}</Alert>}

      {/* dual view: tree (left) + raw formatted (right) */}
      {parsedJson ? (
        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ flex: 1, overflow: "auto", maxHeight: 520, p: 1, borderRadius: 1, border: "1px solid #eee" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Tree view</Typography>
            <div key={expandAllKey}>
              <JsonTreeView data={parsedJson} initiallyExpandedDepth={expandAllKey > 0 ? 1000 : 1} />
            </div>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Formatted JSON</Typography>
            <OutputViewer output={formattedJson} type="json" />
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" sx={{ color: "#666" }}>No valid JSON parsed yet — format/minify to see preview.</Typography>
      )}
    </Box>
  );
};

export default JsonFormatterPanel;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\json_csv_converter\JsonFormatterPanel.jsx