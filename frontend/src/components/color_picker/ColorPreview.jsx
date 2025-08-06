import React from 'react';
import { Box, Typography } from '@mui/material';
import {
      formBoxStyle,
  formFieldStyle,
  resultBoxStyle,
  toolButtonStyle
} from '../../styles/globalStyles';

export function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }

  return { h, s: s * 100, l: l * 100 };
}

const ColorPreview = ({ color }) => {
  const { r, g, b } = hexToRgb(color);
  const { h, s, l } = rgbToHsl(r, g, b);

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          formBoxStyle, width: '100%',
          height: 50,
          backgroundColor: color,
          border: '1px solid #ccc',
          mb: 1
        }}
      />
      <Typography className="total-item" variant="body2">HEX: {color}</Typography>
      <Typography className="total-item" variant="body2">RGB: {r}, {g}, {b}</Typography>
      <Typography className="total-item" variant="body2">
        HSL: {Math.round(h)}, {Math.round(s)}%, {Math.round(l)}%
      </Typography>
    </Box>
  );
};

export default ColorPreview;
