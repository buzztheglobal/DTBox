// src/components/color_picker/ColorPickerPanel.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, Grid, TextField, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UploadIcon from '@mui/icons-material/Upload';
import ColorPreview, { hexToRgb, rgbToHsl } from './ColorPreview';
import './color_picker.css';

const ColorPickerPanel = () => {
  const [color, setColor] = useState('#ffa300');
  const [zoomColor, setZoomColor] = useState(null);
  const [recentColors, setRecentColors] = useState([]);
  const canvasRef = useRef(null);
  const magnifierRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 300;
      ctx.drawImage(img, 0, 0, 400, 300);
    };
    img.src = process.env.PUBLIC_URL + '/color-palette.png';
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 300;
        ctx.drawImage(img, 0, 0, 400, 300);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    setColor(hex);
    updateRecentColors(hex);
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x >= 0 && y >= 0 && x < canvas.width && y < canvas.height) {
      const ctx = canvas.getContext('2d');
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      setZoomColor(hex);
      const magnifier = magnifierRef.current;
      magnifier.style.left = `${event.clientX}px`;
      magnifier.style.top = `${event.clientY}px`;
      magnifier.style.backgroundColor = hex;
    }
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  const updateRecentColors = (newColor) => {
    setRecentColors((prev) => {
      const updated = [newColor, ...prev.filter(c => c !== newColor)].slice(0, 5);
      return updated;
    });
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
  };

  const safeHexToRgb = hex => hexToRgb ? hexToRgb(hex) : { r: 0, g: 0, b: 0 };
  const safeRgbToHsl = (r, g, b) => rgbToHsl ? rgbToHsl(r, g, b) : { h: 0, s: 0, l: 0 };
  const rgb = safeHexToRgb(color);
  const hsl = safeRgbToHsl(rgb.r, rgb.g, rgb.b);

  return (
    <Box className="color-picker-container">
      <Typography variant="h5" gutterBottom className="color-title">
        🎨 Advanced Color Picker
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'stretch' }}>
        <Box sx={{ width: '50%', paddingRight: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>Color Picker</Typography>
          <label htmlFor="upload-image" className="upload-label">
            <UploadIcon sx={{ mr: 1 }} /> Upload Image
          </label>
          <input id="upload-image" type="file" accept="image/*" onChange={handleImageUpload} className="upload-input" />

          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseMove={handleMouseMove}
              style={{ cursor: 'crosshair' }}
            />
            <div
              ref={magnifierRef}
              className="magnifier"
              style={{ display: zoomColor ? 'block' : 'none' }}
            />
          </div>
        </Box>

        <Box sx={{ width: '50%', paddingLeft: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <ColorPreview color={color} />
          {['HEX', 'RGB', 'HSL'].map((label) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                label={label}
                value={
                  label === 'HEX' ? color :
                  label === 'RGB' ? `${rgb.r}, ${rgb.g}, ${rgb.b}` :
                  `${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%`
                }
                fullWidth
              />
              <Tooltip title={`Copy ${label}`}><IconButton onClick={() => copyToClipboard(
                label === 'HEX' ? color :
                label === 'RGB' ? `${rgb.r}, ${rgb.g}, ${rgb.b}` :
                `${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%`
              )}><ContentCopyIcon /></IconButton></Tooltip>
            </Box>
          ))}

          <Button variant="contained" color="success" onClick={() => copyToClipboard(color)} fullWidth>
            COPY HEX
          </Button>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Recent Colors
            </Typography>
            <Box sx={{ display: 'flex', gap: '8px' }}>
              {recentColors.map((c, i) => (
                <Box
                  key={i}
                  sx={{ width: '30px', height: '30px', backgroundColor: c, cursor: 'pointer', border: '1px solid #ccc' }}
                  onClick={() => setColor(c)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ColorPickerPanel;
// src/components/color_picker/ColorPickerPanel.jsx