// File: src/components/survey_feedback/PollCreatorTab.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel
} from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import PollPreviewModal from './PollPreviewModal';
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import '../../App.css';

const PollCreatorTab = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isVisible, setIsVisible] = useState(true);
  const [scheduledAt, setScheduledAt] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [submitting, setSubmitting] = useState(false);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddOption = () => {
    if (options.length < 10) setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleReset = () => {
    setQuestion('');
    setOptions(['', '']);
    setScheduledAt(null);
    setIsVisible(true);
  };

  const handleSubmitPoll = async () => {
    const trimmedOptions = options.map(o => o.trim()).filter(o => o);
    if (!question.trim() || trimmedOptions.length < 2) {
      setSnack({
        open: true,
        message: '❗ Provide a question and at least 2 non-empty options.',
        severity: 'error'
      });
      return;
    }

    const payload = {
      title: question.trim(),
      question: question.trim(),
      options: trimmedOptions,
      is_anonymous: true,
      is_visible: isVisible,
      created_by_id: localStorage.getItem('userEmail') || 'anonymous',
      scheduled_at: scheduledAt
    };

    try {
      setSubmitting(true);
      const res = await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Poll submission failed.');
      }

      const data = await res.json();
      console.log('✅ Poll Created:', data);

      navigator.clipboard.writeText(`${window.location.origin}/form/${data.id}`);

      setSnack({
        open: true,
        message: '✅ Poll created successfully! Link copied to clipboard.',
        severity: 'success'
      });

      handleReset();
      navigate(`/admin/poll/${data.id}/summary`);
    } catch (err) {
      console.error('❌ Poll submission failed:', err.message);
      setSnack({
        open: true,
        message: `❌ Failed to submit poll: ${err.message}`,
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>Create a Poll</Typography>

      <TextField
        fullWidth
        label="Poll Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ mb: 2 }}
      />

      {options.map((opt, index) => (
        <Box className="form-card" key={index} display="flex" alignItems="center" gap={1} mb={1}>
          <TextField
            fullWidth
            label={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          {options.length > 2 && (
            <Tooltip title="Remove Option">
              <IconButton color="error" onClick={() => handleRemoveOption(index)}>
                <Delete />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ))}

      <FormControlLabel
        control={
          <Switch checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />
        }
        label="Publicly Visible"
        sx={{ mt: 2 }}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Schedule Publish Time"
          value={scheduledAt}
          onChange={setScheduledAt}
          renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
        />
      </LocalizationProvider>

      <Box className="form-card" mt={3} display="flex" gap={2} flexWrap="wrap">
        <Button variant="outlined" className='btn' startIcon={<AddCircle />} onClick={handleAddOption}>
          Add Option
        </Button>
        <Button variant="outlined" className='btn' onClick={() => setShowPreview(true)}>
          Preview Poll
        </Button>
        <Button
          variant="contained"
          color="primary"
          className='btn'
          onClick={handleSubmitPoll}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Poll'}
        </Button>
        <Button variant="text" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      <PollPreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        question={question}
        options={options}
      />

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PollCreatorTab;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\survey_feedback\PollCreatorTab.jsx