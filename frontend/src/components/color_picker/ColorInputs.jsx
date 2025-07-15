import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';

const ColorInputs = ({ color, setColor }) => {
  const [hex, setHex] = useState(color);
  const [rgb, setRgb] = useState(hexToRgb(color));
  const [hsl, setHsl] = useState(rgbToHsl(rgb.r, rgb.g, rgb.b));

  useEffect(() => {
    setHex(color);
    setRgb(hexToRgb(color));
    setHsl(rgbToHsl(rgb.r, rgb.g, rgb.b));
  }, [color]);

  const handleHexChange = (e) => {
    const newHex = e.target.value;
    if (/^#?[0-9A-Fa-f]{6}$/.test(newHex)) {
      setHex(newHex.startsWith('#') ? newHex : `#${newHex}`);
      setColor(newHex.startsWith('#') ? newHex : `#${newHex}`);
    }
  };

  const handleRgbChange = (type) => (e) => {
    const value = Math.min(255, Math.max(0, e.target.value));
    const newRgb = { ...rgb, [type]: value };
    setRgb(newRgb);
    setColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHslChange = (type) => (e) => {
    const value = type === 'h' ? Math.min(360, Math.max(0, e.target.value)) : Math.min(100, Math.max(0, e.target.value));
    const newHsl = { ...hsl, [type]: value };
    setHsl(newHsl);
    setColor(hslToHex(newHsl.h, newHsl.s, newHsl.l));
  };

  return (
    <Box sx={{ mt: 2, display: 'flex', gap: '10px' }}>
      <TextField label="HEX" value={hex} onChange={handleHexChange} />
      <TextField label="R" type="number" value={rgb.r} onChange={handleRgbChange('r')} />
      <TextField label="G" type="number" value={rgb.g} onChange={handleRgbChange('g')} />
      <TextField label="B" type="number" value={rgb.b} onChange={handleRgbChange('b')} />
      <TextField label="H" type="number" value={hsl.h} onChange={handleHslChange('h')} />
      <TextField label="S" type="number" value={hsl.s} onChange={handleHslChange('s')} />
      <TextField label="L" type="number" value={hsl.l} onChange={handleHslChange('l')} />
    </Box>
  );
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
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

const hslToHex = (h, s, l) => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
};

export default ColorInputs;