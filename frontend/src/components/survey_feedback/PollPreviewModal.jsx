// File: src/components/survey_feedback/PollPreviewModal.jsx

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import PollResultViewer from './PollResultViewer';

const PollPreviewModal = ({ open, onClose, question, options }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const fakePollId = null; // 🔧 Replace with real poll ID when integrating

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API POST
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setSnackOpen(true);
      // Auto-close modal after 2.5 sec
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setSelectedOption('');
      }, 2500);
    }, 1000);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>🗳️ Poll Preview</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>{question}</Typography>

          {!submitted ? (
            <>
              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {options.map((opt, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={opt}
                    control={<Radio />}
                    label={opt}
                  />
                ))}
              </RadioGroup>
              {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
            </>
          ) : (
            <>
              {submitted && fakePollId ? (
                <PollResultViewer pollId={fakePollId} />
              ) : (
                <Typography align="center" sx={{ mt: 2 }}>
                  ✅ Response submitted. (No results available for preview)
                </Typography>
              )}
            </>
          )}
        </DialogContent>

        <DialogActions>
          {!submitted ? (
            <>
              <Button onClick={onClose}>Close</Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!selectedOption || loading}
              >
                Submit
              </Button>
            </>
          ) : (
            <Button onClick={onClose}>Close</Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          ✅ Vote submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PollPreviewModal;
