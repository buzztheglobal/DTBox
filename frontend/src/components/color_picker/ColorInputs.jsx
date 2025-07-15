// src/components/color_picker/ColorInputs.jsx
import React from 'react';
import { Box, TextField, IconButton, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function ColorInputs({ hex, rgb, hsl }) {
  // Clipboard copy handler
  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log(`✅ Copied ${label}:`, text);
    } catch (err) {
      console.error(`❌ Failed to copy ${label}:`, err);
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        mt: 2,
        maxWidth: 400,
      }}
    >
      {/* HEX */}
      <Typography variant="body2">HEX</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          value={hex || ''}
          size="small"
          variant="outlined"
          InputProps={{ readOnly: true }}
          sx={{ mr: 1 }}
        />
        <Tooltip title="Copy HEX">
          <IconButton onClick={() => handleCopy(hex, 'HEX')}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* RGB */}
      <Typography variant="body2">RGB</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          value={rgb || ''}
          size="small"
          variant="outlined"
          InputProps={{ readOnly: true }}
          sx={{ mr: 1 }}
        />
        <Tooltip title="Copy RGB">
          <IconButton onClick={() => handleCopy(rgb, 'RGB')}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* HSL */}
      <Typography variant="body2">HSL</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          value={hsl || ''}
          size="small"
          variant="outlined"
          InputProps={{ readOnly: true }}
          sx={{ mr: 1 }}
        />
        <Tooltip title="Copy HSL">
          <IconButton onClick={() => handleCopy(hsl, 'HSL')}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default ColorInputs;
