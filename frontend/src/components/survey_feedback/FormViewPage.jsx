// File: src/components/survey_feedback/FormViewPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Checkbox, FormControlLabel,
  Button, CircularProgress, MenuItem
} from '@mui/material';
import { useParams } from 'react-router-dom';
import {
    formBoxStyle,
    formFieldStyle,
    toolButtonStyle
} from '../../styles/globalStyles';

const FormViewPage = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      const res = await fetch(`/api/forms/${formId}`);
      const data = await res.json();
      setForm(data);
      setLoading(false);
    };
    fetchForm();
  }, [formId]);

  const handleChange = (qid, value) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      form_id: formId,
      answers: form.questions.map((q) => ({
        question_id: q.id,
        answer_text: answers[q.id] || '',
      })),
    };

    await fetch('/api/forms/submit-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    alert('Thank you! Your response has been submitted.');
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Box className="form-card" sx={{ p: 3 }}>
      <Typography variant="h5">{form.title}</Typography>
      <Typography variant="body1" mb={2}>{form.description}</Typography>

      {form.questions.map((q, idx) => (
        <Box key={q.id} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Q{idx + 1}. {q.question_text}</Typography>

          {q.question_type === 'text' && (
            <TextField fullWidth onChange={(e) => handleChange(q.id, e.target.value)} />
          )}

          {q.question_type === 'multiple_choice' && (
            <TextField select fullWidth onChange={(e) => handleChange(q.id, e.target.value)}>
              {q.options.map((opt, i) => (
                <MenuItem key={i} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>
          )}

          {q.question_type === 'rating' && (
            <TextField
              type="number" SX={formFieldStyle}
              inputProps={{ min: 1, max: 5 }}
              fullWidth
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.question_type === 'boolean' && (
            <FormControlLabel  SX={formFieldStyle}
              control={<Checkbox onChange={(e) => handleChange(q.id, e.target.checked ? 'Yes' : 'No')} />}
              label="Yes"
            />
          )}
        </Box>
      ))}

      <Button className='btn' variant="contained" onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default FormViewPage;
// File: src/components/survey_feedback/admin/AdminDashboardPage.jsx