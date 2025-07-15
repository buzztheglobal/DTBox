import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, Grid, TextField } from '@mui/material';
import ColorPreview, { hexToRgb, rgbToHsl } from './ColorPreview'; // Ensure correct import
import './color_picker.css';

const ColorPickerPanel = () => {
  const [color, setColor] = useState('#ffa300');
  const [zoomColor, setZoomColor] = useState(null);
  const [recentColors, setRecentColors] = useState([]);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
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
    img.src = '../../../public/color-palette.png'; // Replace with actual image upload logic
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
      magnifier.style.left = `${event.clientX + 10}px`;
      magnifier.style.top = `${event.clientY + 10}px`;
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
  };

  // Fallback function to handle undefined hexToRgb/rgbToHsl
  const safeHexToRgb = hex => hexToRgb ? hexToRgb(hex) : { r: 0, g: 0, b: 0 };
  const safeRgbToHsl = (r, g, b) => rgbToHsl ? rgbToHsl(r, g, b) : { h: 0, s: 0, l: 0 };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Advanced Color Picker</Typography>
      {/* <Typography variant="h5" gutterBottom>Color Picker</Typography> */}
      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginBottom: '10px' }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseMove={handleMouseMove}
              style={{ border: '1px solid #ccc', cursor: 'crosshair', maxWidth: '100%' }}
            />
            <div
              ref={magnifierRef}
              style={{
                position: 'absolute',
                width: '50px',
                height: '50px',
                border: '2px solid #fff',
                borderRadius: '50%',
                pointerEvents: 'none',
                display: zoomColor ? 'block' : 'none',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <ColorPreview color={color} />
          <TextField label="HEX" value={color} fullWidth margin="normal" />
          <TextField label="RGB" value={`${safeHexToRgb(color).r}, ${safeHexToRgb(color).g}, ${safeHexToRgb(color).b}`} fullWidth margin="normal" />
          <TextField label="HSL" value={`${Math.round(safeRgbToHsl(safeHexToRgb(color).r, safeHexToRgb(color).g, safeHexToRgb(color).b).h)}, ${Math.round(safeRgbToHsl(safeHexToRgb(color).r, safeHexToRgb(color).g, safeHexToRgb(color).b).s)}%, ${Math.round(safeRgbToHsl(safeHexToRgb(color).r, safeHexToRgb(color).g, safeHexToRgb(color).b).l)}%`} fullWidth margin="normal" />
          <Button variant="contained" color="success" onClick={copyToClipboard} fullWidth sx={{ mt: 2 }}>COPY HEX</Button>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>Recent Colors</Typography>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          {recentColors.map((c, i) => (
            <Box
              key={i}
              sx={{ width: '30px', height: '30px', backgroundColor: c, cursor: 'pointer' }}
              onClick={() => setColor(c)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ColorPickerPanel;