// File: src/components/survey_feedback/admin/PreviewFormModal.jsx
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box
} from '@mui/material';

const PreviewFormModal = ({ open, onClose, title, description, questions }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>📋 Preview Form</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body1" gutterBottom>{description}</Typography>

        <Box sx={{ mt: 2 }}>
          {questions.map((q, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Q{idx + 1}. {q.text}</Typography>
              <Typography variant="body2" color="text.secondary">{q.type}</Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewFormModal;
// File: src/components/survey_feedback/admin/PreviewFormModal.jsx