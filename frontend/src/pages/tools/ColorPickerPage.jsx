import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const logColorPick = async (selectedColorName) => {
  try {
    await axios.post('/api/logs', {
      type: 'action',
      category: 'color-picker',
      search: selectedColorName,
      count: 1,
    });
    console.log('✅ Log saved');
  } catch (err) {
    console.error('❌ Log failed:', err.message);
  }
};

const ColorPickerPage = () => {
  const colors = ['Lavender', 'Sky Blue', 'Coral', 'Mint', 'Peach'];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        🎨 Color Picker Tool
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {colors.map((color) => (
          <Button
            key={color}
            variant="contained"
            onClick={() => logColorPick(color.toLowerCase())}
            sx={{ backgroundColor: color.toLowerCase(), color: '#000' }}
          >
            {color}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ColorPickerPage;
