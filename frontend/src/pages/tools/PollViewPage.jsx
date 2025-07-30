// File: src/pages/tools/PollViewPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import PollResultViewer from '../../components/survey_feedback/PollResultViewer';

const PollViewPage = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/polls/${pollId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Poll not found or inactive.');
        return res.json();
      })
      .then((data) => {
        setPoll(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [pollId]);

  const handleSubmit = () => {
    if (!selectedOption) {
      setError('Please select an option.');
      return;
    }

    fetch(`/api/polls/${pollId}/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selected_option: selectedOption }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error submitting response.');
        return res.json();
      })
      .then(() => {
        setSubmitted(true);
        setError('');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body2" mt={2}>Loading poll...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!poll) return null;

  const isExpired = poll.scheduled_at && new Date(poll.scheduled_at) < new Date();

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>{poll.question}</Typography>

        {isExpired ? (
          <Alert severity="warning" sx={{ mt: 2 }}>
            This poll has expired.
          </Alert>
        ) : submitted ? (
          <>
            <Alert severity="success" sx={{ mb: 2 }}>Thanks for your response!</Alert>
            {poll.is_visible && <PollResultViewer pollId={pollId} />}
          </>
        ) : (
          <>
            <RadioGroup
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              sx={{ my: 2 }}
            >
              {poll.options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Button
              variant="contained"
              disabled={!selectedOption}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PollViewPage;
