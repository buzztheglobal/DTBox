// File: src/components/survey_feedback/PollCreateWizard.jsx
import React, { useState } from 'react';
import {
  Stepper, Step, StepLabel, Box, Typography,
  TextField, Button, Paper, Checkbox, FormControlLabel
} from '@mui/material';
import PollPreviewModal from './PollPreviewModal';

const steps = ['Enter Question', 'Add Options', 'Poll Settings', 'Preview & Submit'];

const PollCreateWizard = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const handleNext = () => {
    if (activeStep === 3) {
      const body = {
        question,
        options,
        is_anonymous: isAnonymous,
        is_visible: isVisible,
      };
      fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((poll) => {
          onComplete(poll); // Pass created poll to parent
        });
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <TextField fullWidth label="Poll Question" value={question} onChange={(e) => setQuestion(e.target.value)} />;
      case 1:
        return (
          <>
            {options.map((opt, i) => (
              <TextField
                key={i}
                fullWidth
                label={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const updated = [...options];
                  updated[i] = e.target.value;
                  setOptions(updated);
                }}
                sx={{ mt: 2 }}
              />
            ))}
            <Button onClick={() => setOptions([...options, ''])} sx={{ mt: 2 }}>
              Add Option
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <FormControlLabel
              control={<Checkbox checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />}
              label="Allow Anonymous Votes"
            />
            <FormControlLabel
              control={<Checkbox checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />}
              label="Show Results to Voters"
            />
          </>
        );
      case 3:
        return (
          <PollPreviewModal
            open
            onClose={() => setShowPreview(false)}
            question={question}
            options={options}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 3 }}>
      <Typography variant="h5" gutterBottom>Create a Poll</Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>
      <Box className="form-card">{renderStep()}</Box>
      <Box className="form-card" mt={3}>
        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 2 }}>Back</Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PollCreateWizard;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\survey_feedback\PollCreateWizard.jsx