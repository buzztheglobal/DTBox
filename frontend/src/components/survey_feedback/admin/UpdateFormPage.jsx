// File: src/components/survey_feedback/admin/UpdateFormPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Paper, CircularProgress
} from '@mui/material';

const UpdateFormPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/forms/${id}`);
        const data = await res.json();
        setForm(data);
        setTitle(data.title);
        setDescription(data.description);
      } catch (err) {
        console.error('❌ Error loading form:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/forms/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      const data = await res.json();
      alert('✅ Form updated successfully!');
      console.log('Updated form:', data.updatedForm);
    } catch (err) {
      console.error('❌ Update failed:', err);
    }
  };

  if (loading) return <CircularProgress sx={{ m: 3 }} />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>✏️ Edit Form</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth multiline rows={4} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Paper>
      <Button variant="contained" onClick={handleUpdate}>Save Changes</Button>
    </Box>
  );
};

export default UpdateFormPage;
