// src/components/color_picker/color_picker.jsx
import React, { useState, useEffect } from 'react';
import './color_picker.css';
import '../../../App.css';
import { SketchPicker } from 'react-color';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip, Button } from '@mui/material';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#EDF25C');
  const [savedColors, setSavedColors] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedColors')) || [];
    setSavedColors(saved);
  }, []);

  const saveColor = () => {
    const newColor = {
      hex: selectedColor,
      savedAt: new Date().toISOString(),
    };
    const updated = [newColor, ...savedColors];
    setSavedColors(updated);
    localStorage.setItem('savedColors', JSON.stringify(updated));
  };

  const deleteColor = (index) => {
    const updated = savedColors.filter((_, i) => i !== index);
    setSavedColors(updated);
    localStorage.setItem('savedColors', JSON.stringify(updated));
  };

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    alert(`Copied: ${hex}`);
  };

  return (
    <div className="color-tool container mt-4">
      <h3 className="text-center mb-3">🎨 Color Picker Tool</h3>
      <div className="text-center">
        <SketchPicker
          color={selectedColor}
          onChangeComplete={(color) => setSelectedColor(color.hex)}
        />
        <div className="color-preview mt-3 d-flex align-items-center justify-content-center gap-2">
          <span>{selectedColor}</span>
          <Tooltip title="Copy HEX">
            <ContentCopyIcon onClick={() => copyColor(selectedColor)} className="copy-icon" />
          </Tooltip>
        </div>
        <Button className="glassy-button mt-3" onClick={saveColor}>
          Save to Favorites
        </Button>
      </div>

      {savedColors.length > 0 && (
        <div className="saved-colors mt-5">
          <h5>💾 Saved Colors</h5>
          <div className="row mt-3">
            {savedColors.map((color, index) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
                <div className="card tool-card">
                  <div
                    className="card-img-top"
                    style={{
                      backgroundColor: color.hex,
                      height: '100px',
                      borderRadius: '1rem 1rem 0 0',
                    }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title">{color.hex}</h6>
                    <Button
                      size="small"
                      onClick={() => copyColor(color.hex)}
                      className="me-2"
                    >
                      Copy
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => deleteColor(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
