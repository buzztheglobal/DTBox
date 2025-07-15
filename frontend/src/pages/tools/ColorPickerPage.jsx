import React from 'react';
import ColorPickerPanel from '../../components/color_picker/ColorPickerPanel';

const ColorPickerPage = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2>🎨 Advanced Color Picker</h2>
      <ColorPickerPanel />
    </div>
  );
};

export default ColorPickerPage;
