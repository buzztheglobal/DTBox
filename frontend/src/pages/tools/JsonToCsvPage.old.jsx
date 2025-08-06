// File: frontend/src/pages/tools/JsonToCsvPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, TextField, Paper, Grid,
  FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, InputAdornment, IconButton
} from '@mui/material';
import Papa from 'papaparse';
import { cardBoxStyle, pageTitleStyle, formBoxStyle, resultBoxStyle } from '../../styles/globalStyles';

const JsonToCsvPage = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [previewRows, setPreviewRows] = useState([]);
  const [delimiter, setDelimiter] = useState(',');
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [customHeaders, setCustomHeaders] = useState({});
  const [excludedFields, setExcludedFields] = useState({});
  const [includeHeaderRow, setIncludeHeaderRow] = useState(true);

  useEffect(() => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const array = Array.isArray(jsonData) ? jsonData : [jsonData];
      const keys = [...new Set(array.flatMap(obj => Object.keys(obj)))];
      setHeaders(keys);
      setCustomHeaders(keys.reduce((acc, key) => ({ ...acc, [key]: key }), {}));
      setExcludedFields(keys.reduce((acc, key) => ({ ...acc, [key]: false }), {}));
      setError(null);
    } catch (err) {
      setHeaders([]);
      setCustomHeaders({});
      setExcludedFields({});
    }
  }, [jsonInput]);

  const handleConvert = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const array = Array.isArray(jsonData) ? jsonData : [jsonData];
      const transformed = array.map(obj => {
        const newObj = {};
        headers.forEach(key => {
          if (!excludedFields[key]) {
            newObj[customHeaders[key]] = obj[key] ?? '';
          }
        });
        return newObj;
      });
      const csv = Papa.unparse(transformed, {
        delimiter: delimiter,
        quotes: true,
        header: includeHeaderRow
      });
      setCsvOutput(csv);
      setPreviewRows(transformed.slice(0, 3));
      setError(null);
    } catch (err) {
      setError('Invalid JSON: ' + err.message);
      setCsvOutput('');
      setPreviewRows([]);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'converted.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        setJsonInput(text);
        setError(null);
      } catch (err) {
        setError('Error reading file');
      }
    };
    reader.readAsText(file);
  };

  const handleHeaderChange = (key, value) => {
    setCustomHeaders(prev => ({ ...prev, [key]: value }));
  };

  const toggleExcludeField = (key) => {
    setExcludedFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Box className="calculator-container">
      <Typography variant="h4" sx={pageTitleStyle}>JSON to CSV Converter</Typography>
      <Paper sx={cardBoxStyle}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Box sx={formBoxStyle}>
              <TextField
                label="Paste JSON here"
                multiline
                rows={12}
                fullWidth
                error={!!error}
                helperText={error || ''}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='[{"name":"John","age":30},{"name":"Alice","age":25}]'
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload JSON File
                <input
                  type="file"
                  accept=".json,application/json"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Delimiter</InputLabel>
                <Select
                  value={delimiter}
                  label="Delimiter"
                  onChange={(e) => setDelimiter(e.target.value)}
                >
                  <MenuItem value="," >Comma (,)</MenuItem>
                  <MenuItem value=";">Semicolon (;)</MenuItem>
                  <MenuItem value="\t">Tab (\t)</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                sx={{ mt: 1 }}
                control={
                  <Checkbox
                    checked={includeHeaderRow}
                    onChange={(e) => setIncludeHeaderRow(e.target.checked)}
                  />
                }
                label="Include header row in CSV"
              />

              {headers.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Customize Fields:</Typography>
                  {headers.map(key => (
                    <TextField
                      key={key}
                      label={`"${key}" →`}
                      value={customHeaders[key] || ''}
                      onChange={(e) => handleHeaderChange(key, e.target.value)}
                      fullWidth
                      margin="dense"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  checked={excludedFields[key]}
                                  onChange={() => toggleExcludeField(key)}
                                />
                              }
                              label="Exclude"
                              labelPlacement="end"
                              sx={{ ml: 1 }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  ))}
                </Box>
              )}

              <Button variant="contained" onClick={handleConvert} sx={{ mt: 3 }}>
                Convert to CSV
              </Button>
            </Box>
          </Box>

          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Box sx={resultBoxStyle}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>CSV Preview (First 3 Rows):</Typography>
              <pre className="light-code-block" style={{ maxHeight: '300px', overflow: 'auto' }}>{
                previewRows.length > 0 ?
                Papa.unparse(previewRows, { delimiter, quotes: true, header: includeHeaderRow }) : 'No preview available'
              }</pre>
              {csvOutput && (
                <Button
                  variant="contained"
                  onClick={handleDownload}
                  sx={{ mt: 2 }}
                >
                  Download CSV
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default JsonToCsvPage;
//