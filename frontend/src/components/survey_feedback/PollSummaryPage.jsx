// File: src/components/survey_feedback/PollSummaryPage.jsx
import React from 'react';
import {
  Box, Typography, Paper, Button, Tooltip, TextField, IconButton
} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const PollSummaryPage = ({ pollId, pollSlug }) => {
  const pollUrl = `https://yourdomain.com/form/${pollSlug || pollId}`;
  const embedCode = `<iframe src="${pollUrl}" width="100%" height="300" frameborder="0"></iframe>`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <Paper sx={{ p: 4, mt: 3 }}>
      <Typography variant="h5" gutterBottom>📊 Poll Summary & Sharing</Typography>

      <Box className="form-card" mt={3}>
        <Typography variant="subtitle1">🔗 Shareable Link</Typography>
        <TextField
          fullWidth
          value={pollUrl}
          InputProps={{
            endAdornment: (
              <Tooltip title="Copy link">
                <IconButton onClick={() => copyToClipboard(pollUrl)}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            )
          }}
          sx={{ mt: 1 }}
        />
      </Box>

      <Box className="form-card" mt={3}>
        <Typography variant="subtitle1">🧩 Embed Code</Typography>
        <TextField
          fullWidth
          multiline
          value={embedCode}
          InputProps={{
            endAdornment: (
              <Tooltip title="Copy embed code">
                <IconButton onClick={() => copyToClipboard(embedCode)}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            )
          }}
          sx={{ mt: 1 }}
        />
      </Box>

      <Box className="form-card" mt={4}>
        <Typography variant="subtitle1">📱 QR Code</Typography>
        <Box mt={1}>
          <QRCodeCanvas value={pollUrl} size={150} />
        </Box>
      </Box>

      <Box className="form-card" mt={3}>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          href={`http://localhost:5000/api/polls/${pollId}/export`}
          target="_blank"
        >
          Export Responses (CSV)
        </Button>
      </Box>
    </Paper>
  );
};

export default PollSummaryPage;
