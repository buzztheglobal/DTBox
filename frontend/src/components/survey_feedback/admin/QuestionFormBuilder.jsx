// File: src/components/survey_feedback/admin/QuestionFormBuilder.jsx
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, FormControlLabel, Checkbox
} from '@mui/material';

const questionTypes = [
  { label: 'Short Text', value: 'text' },
  { label: 'Multiple Choice', value: 'multiple_choice' },
  { label: 'Rating (1-5)', value: 'rating' },
  { label: 'Yes/No', value: 'boolean' },
];

const QuestionFormBuilder = ({ open, onClose, onSave }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('text');
  const [required, setRequired] = useState(true);
  const [options, setOptions] = useState('');

  const handleSave = () => {
    if (!text.trim()) return;
    const question = {
      text,
      type,
      required,
      options: type === 'multiple_choice' ? options.split(',').map(o => o.trim()) : null
    };
    onSave(question);
    setText('');
    setType('text');
    setOptions('');
    setRequired(true);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Question</DialogTitle>
      <DialogContent>
        <TextField
          label="Question Text"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mt: 2 }}
        />

        <TextField
          select
          fullWidth
          label="Question Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ mt: 2 }}
        >
          {questionTypes.map(q => (
            <MenuItem key={q.value} value={q.value}>{q.label}</MenuItem>
          ))}
        </TextField>

        {type === 'multiple_choice' && (
          <TextField
            label="Options (comma-separated)"
            fullWidth
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            sx={{ mt: 2 }}
          />
        )}

        <FormControlLabel
          control={<Checkbox checked={required} onChange={(e) => setRequired(e.target.checked)} />}
          label="Required"
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionFormBuilder;
// File: src/components/survey_feedback/admin/QuestionFormBuilder.jsx