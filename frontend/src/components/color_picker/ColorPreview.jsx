import React from 'react';
import { Box } from '@mui/material';

const ColorPreview = ({ color }) => {
  return (
    <Box sx={{ width: '100%', height: '100px', backgroundColor: color || '#000000', border: '1px solid #ccc', mb: 2 }} />
  );
};

const hexToRgb = (hex) => {
  const sanitizedHex = hex.replace(/^#/, '');
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sanitizedHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Explicitly export the utility functions
export { hexToRgb, rgbToHsl };
export default ColorPreview;