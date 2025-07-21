// /src/components/qr_code_generator/QRCustomization.jsx
import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { formFieldStyle } from '../../styles/globalStyles';

const QRCustomization = ({ type, input }) => {
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  return (
    <Box>
      <FormControl fullWidth sx={formFieldStyle}>
        <InputLabel>QR Size (px)</InputLabel>
        <Select
          value={size}
          label="QR Size"
          onChange={(e) => setSize(Number(e.target.value))}
        >
          {[128, 256, 512, 768].map((val) => (
            <MenuItem key={val} value={val}>{val}px</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" gap={2} mt={2}>
        <TextField
          type="color"
          label="Foreground"
          variant="outlined"
          value={fgColor}
          onChange={(e) => setFgColor(e.target.value)}
          fullWidth
        />
        <TextField
          type="color"
          label="Background"
          variant="outlined"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default QRCustomization;
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\qr_code_generator\QRCustomization.jsx