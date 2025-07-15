import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  Grid,
  Snackbar
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './DataConverter.css';

const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

const conversionFactors = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  PB: 1024 ** 5,
  EB: 1024 ** 6,
};

const DataStorageConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('MB');
  const [outputUnit, setOutputUnit] = useState('GB');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const bytes = parseFloat(inputValue) * conversionFactors[inputUnit];
    const converted = bytes / conversionFactors[outputUnit];
    setResult(converted.toFixed(4));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${result} ${outputUnit}`);
    setCopied(true);
  };

  return (
    <div className="converter-wrapper">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Value"
            type="number"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="From"
            fullWidth
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
          >
            {units.map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="To"
            fullWidth
            value={outputUnit}
            onChange={(e) => setOutputUnit(e.target.value)}
          >
            {units.map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" fullWidth onClick={handleConvert}>
            Convert
          </Button>
        </Grid>
      </Grid>

      {result && (
        <div className="result-box">
          <TextField
            label="Result"
            value={`${result} ${outputUnit}`}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleCopy}>
                    <ContentCopyIcon fontSize="small" />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}

      <Snackbar
        open={copied}
        autoHideDuration={1500}
        onClose={() => setCopied(false)}
        message="Copied to clipboard"
      />
    </div>
  );
};

export default DataStorageConverter;
