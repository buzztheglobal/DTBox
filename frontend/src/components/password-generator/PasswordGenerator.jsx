// src/components/password_info/PasswordGenerator.jsx
// File: /frontend/src/components/password_generator/PasswordGenerator.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  Slider,
  Stack,
  Snackbar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  formBoxStyle,
  cardBoxStyle,
  pageTitleStyle,
  toolButtonStyle,
} from "../../styles/globalStyles";

// Random character generators
const getRandomChar = {
  lower: () => String.fromCharCode(97 + Math.floor(Math.random() * 26)),
  upper: () => String.fromCharCode(65 + Math.floor(Math.random() * 26)),
  number: () => Math.floor(Math.random() * 10).toString(),
  symbol: () =>
    "!@#$%^&*()-_=+[]{}|;:<>,.?/".charAt(Math.floor(Math.random() * 28)),
};

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [settings, setSettings] = useState({
    lower: true,
    upper: true,
    number: true,
    symbol: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleToggle = (type) => {
    setSettings((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const generatePassword = () => {
    const types = Object.keys(settings).filter((key) => settings[key]);
    if (!types.length) {
      setPassword("Select at least one option.");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      generated += getRandomChar[type]();
    }
    setPassword(generated);
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  return (
    <Box className="form-card" sx={cardBoxStyle} mb={4}>
      {/* Title */}
      <Typography variant="h5" sx={pageTitleStyle} gutterBottom>
        🔐 Generate a Strong Password
      </Typography>

      <Stack spacing={3} mt={2}>
        {/* Slider */}
        <Box>
          <Typography gutterBottom>Password Length: {length}</Typography>
          <Slider
            value={length}
            min={8}
            max={32}
            step={1}
            marks
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setLength(newValue)}
          />
        </Box>

        {/* Options */}
        <Box sx={formBoxStyle}>
          {["lower", "upper", "number", "symbol"].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={settings[type]}
                  onChange={() => handleToggle(type)}
                />
              }
              label={type.charAt(0).toUpperCase() + type.slice(1)}
            />
          ))}
        </Box>

        {/* Generate Button */}
        <Button
          className="btn"
          variant="contained"
          sx={toolButtonStyle}
          onClick={generatePassword}
        >
          Generate Password
        </Button>

        {/* Password Output */}
        <TextField
          label="Generated Password"
          value={password}
          fullWidth
          InputProps={{
            endAdornment: (
              <Button onClick={handleCopy} disabled={!password}>
                <ContentCopyIcon fontSize="small" />
              </Button>
            ),
          }}
        />
      </Stack>

      {/* Snackbar */}
      <Snackbar
        open={copied}
        autoHideDuration={1500}
        onClose={() => setCopied(false)}
        message="Password copied!"
      />
    </Box>
  );
};

export default PasswordGenerator;

// src/components/password_generator/PasswordGenerator.jsx