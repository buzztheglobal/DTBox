// File: src/components/survey_feedback/admin/SurveyBuilderPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, TextField, Paper, IconButton,
  Tooltip, Snackbar, Alert, Dialog, DialogTitle, DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QuestionFormBuilder from './QuestionFormBuilder';
import PreviewFormModal from './PreviewFormModal';
import { v4 as uuidv4 } from 'uuid';

const SurveyBuilderPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [formURL, setFormURL] = useState('');
  const [postSaveOpen, setPostSaveOpen] = useState(false);

  // Load draft
  useEffect(() => {
    const saved = localStorage.getItem('survey-draft');
    if (saved) {
      try {
        const { title, description, questions } = JSON.parse(saved);
        setTitle(title || '');
        setDescription(description || '');
        setQuestions(questions || []);
      } catch (err) {
        console.warn('Invalid draft:', err.message);
      }
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    const draft = { title, description, questions };
    localStorage.setItem('survey-draft', JSON.stringify(draft));
  }, [title, description, questions]);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, { id: uuidv4(), ...question }]);
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setQuestions(items);
  };

  const handleClearDraft = () => {
    localStorage.removeItem('survey-draft');
    setTitle('');
    setDescription('');
    setQuestions([]);
    alert('🗑️ Draft cleared.');
  };

  const handleSubmit = async () => {
    if (!title.trim()) return alert('❗ Title is required.');
    if (questions.length === 0) return alert('❗ Add at least one question.');
    if (questions.some(q => !q.text?.trim())) return alert('❗ All questions must have text.');

    const payload = {
      title,
      description,
      type: 'survey',
      created_by: localStorage.getItem('userEmail') || 'anonymous',
      questions: questions.map(q => ({
        question_text: q.text,
        question_type: q.type,
        is_required: q.required,
        options: q.options || []
      }))
    };

    try {
      const res = await fetch('/api/forms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      console.log('📦 Raw response:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('❌ JSON parse failed:', e.message);
        return alert('⚠️ Server returned invalid JSON. Check backend logs.');
      }

      if (!data.formId) {
        console.error('❌ Missing formId in response');
        return alert('⚠️ Form creation failed. Invalid response.');
      }

      const url = `${window.location.origin}/form/${data.formId}`;
      setFormURL(url);
      setSnackOpen(true);
      setPostSaveOpen(true);
      navigator.clipboard.writeText(url);
      localStorage.removeItem('survey-draft');
      setTitle('');
      setDescription('');
      setQuestions([]);
    } catch (err) {
      console.error('❌ Form save error:', err);
      alert('Failed to save. Check server logs.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>🛠️ Survey Builder</Typography>

      <TextField
        fullWidth label="Title" value={title}
        onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }}
      />
      <TextField
        fullWidth multiline rows={3} label="Description"
        value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 3 }}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questions" isDropDisabled={false}>
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {questions.map((q, index) => (
                <Draggable key={q.id} draggableId={String(q.id)} index={index}>
                  {(provided) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ mb: 2, p: 2 }}
                    >
                      <Typography variant="subtitle1">
                        Q{index + 1}: {q.text}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">{q.type}</Typography>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(q.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setModalOpen(true)}>
          Add Question
        </Button>
        <Button variant="outlined" onClick={() => setPreviewOpen(true)}>
          Preview
        </Button>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit}>
          Save Form
        </Button>
        <Button color="error" startIcon={<ClearIcon />} onClick={handleClearDraft}>
          Clear Draft
        </Button>
      </Box>

      <QuestionFormBuilder
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddQuestion}
      />

      <PreviewFormModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={title}
        description={description}
        questions={questions}
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          ✅ Form saved! Link copied to clipboard.
        </Alert>
      </Snackbar>

      <Dialog open={postSaveOpen} onClose={() => setPostSaveOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>🎉 Form Created Successfully!</DialogTitle>
        <DialogContent>
          <Typography gutterBottom><strong>Public URL:</strong></Typography>
          <Paper sx={{ p: 1, mb: 2 }}>{formURL}</Paper>
          <Typography variant="body2" gutterBottom>✅ You can now:</Typography>
          <ul>
            <li>🔗 Share the form link above</li>
            <li>📊 Track responses in the <strong>Admin Dashboard</strong></li>
            <li>🌐 Embed it using the Embed Code Generator</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPostSaveOpen(false)}>Close</Button>
          <Button variant="contained" href={formURL} target="_blank">Open Form</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SurveyBuilderPage;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\survey_feedback\admin\SurveyBuilderPage.jsx  