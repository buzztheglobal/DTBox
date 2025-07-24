// File: src/components/survey_feedback/admin/EmbedCodeGenerator.jsx
import React from 'react';
import {
  Box, TextField, IconButton, Tooltip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const EmbedCodeGenerator = ({ formId }) => {
  const embedCode = `<iframe src="https://yourdomain.com/form/${formId}" width="100%" height="600px" frameBorder="0"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Embed Code"
        fullWidth
        size="small"
        value={embedCode}
        InputProps={{
          endAdornment: (
            <Tooltip title="Copy to clipboard">
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          )
        }}
      />
    </Box>
  );
};

export default EmbedCodeGenerator;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\survey_feedback\admin\EmbedCodeGenerator.jsx   