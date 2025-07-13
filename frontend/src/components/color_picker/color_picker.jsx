import React, { useState } from 'react';
import axios from 'axios';
import './color_picker.css';

const predefinedColors = [
  { name: 'Lavender', hex: '#E6E6FA' },
  { name: 'Mint', hex: '#98FF98' },
  { name: 'Coral', hex: '#FF7F50' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Sunset', hex: '#FFD580' }
];

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = async (color) => {
    setSelectedColor(color);

    try {
      await axios.post('/api/logs', {
        type: 'click',
        category: 'color-picker',
        search: color.name,
        count: 1
      });
      console.log(`✅ Logged: ${color.name}`);
    } catch (err) {
      console.error('❌ Failed to log color selection', err);
    }
  };

  return (
    <div className="color-box" style={{ backgroundColor: color.toLowerCase() }}>
      <h2>🎨 Pick a Color</h2>
      <div className="color-options">
        {predefinedColors.map((color) => (
          <div
            key={color.name}
            className={`color-box ${selectedColor?.name === color.name ? 'selected' : ''}`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>

      {selectedColor && (
        <div className="color-info">
          <p>
            <strong>Selected:</strong> {selectedColor.name} ({selectedColor.hex})
          </p>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
