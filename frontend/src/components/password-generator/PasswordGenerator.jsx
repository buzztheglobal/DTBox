// src/components/password_info/PasswordGenerator.jsx
import React, { useState } from 'react';
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
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { cardBoxStyle, pageTitleStyle, toolButtonStyle }  from '../../styles/globalStyles';

const getRandomChar = {
  lower: () => String.fromCharCode(97 + Math.floor(Math.random() * 26)),
  upper: () => String.fromCharCode(65 + Math.floor(Math.random() * 26)),
  number: () => Math.floor(Math.random() * 10).toString(),
  symbol: () => '!@#$%^&*()-_=+[]{}|;:<>,.?/'.charAt(Math.floor(Math.random() * 28)),
};

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [settings, setSettings] = useState({
    lower: true,
    upper: true,
    number: true,
    symbol: true,
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const handleToggle = (type) => {
    setSettings((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const generatePassword = () => {
    const types = Object.keys(settings).filter((key) => settings[key]);
    if (!types.length) return setPassword('Select at least one option.');

    let generated = '';
    for (let i = 0; i < length; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      generated += getRandomChar[type]();
    }
    setPassword(generated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  return (
    <Box sx={cardBoxStyle} mb={4}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>Generate a Strong Password</Typography>
      <Stack spacing={2} mt={2}>
        <Slider
          value={length}
          min={8}
          max={32}
          step={1}
          marks
          valueLabelDisplay="auto"
          onChange={(e, newValue) => setLength(newValue)}
        />
        <Typography>Password Length: {length}</Typography>

        <Box>
          {['lower', 'upper', 'number', 'symbol'].map((type) => (
            <FormControlLabel
              key={type}
              control={<Checkbox checked={settings[type]} onChange={() => handleToggle(type)} />}
              label={type.charAt(0).toUpperCase() + type.slice(1)}
            />
          ))}
        </Box>

        <Button sx={toolButtonStyle} onClick={generatePassword}>
          Generate Password
        </Button>

        <TextField
          label="Generated Password"
          value={password}
          fullWidth
          InputProps={{
            endAdornment: (
              <Button onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </Button>
            ),
          }}
        />
      </Stack>

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