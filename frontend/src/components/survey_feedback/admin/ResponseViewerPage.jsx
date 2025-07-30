// File: src/components/survey_feedback/admin/ResponseViewerPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, CircularProgress, Button
} from '@mui/material';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';

const ResponseViewerPage = () => {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [formTitle, setFormTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch(`/api/forms/${formId}/responses`);
        const data = await res.json();
        setFormTitle(data.form_title);
        setResponses(data.responses || []);
      } catch (err) {
        console.error('❌ Failed to load responses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [formId]);

  const headers = responses.length > 0 ? Object.keys(responses[0]).map((key) => ({
    label: key.replace(/_/g, ' ').toUpperCase(),
    key
  })) : [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>📊 Responses for: {formTitle}</Typography>
      {loading ? (
        <CircularProgress />
      ) : responses.length === 0 ? (
        <Typography>No responses yet.</Typography>
      ) : (
        <>
          <Paper sx={{ mb: 3, p: 2 }}>
            <Typography variant="subtitle1">Total Responses: {responses.length}</Typography>
            <Button variant="outlined" sx={{ mt: 1 }}>
              <CSVLink data={responses} headers={headers} filename={`responses-${formId}.csv`} style={{ textDecoration: 'none' }}>
                Export CSV
              </CSVLink>
            </Button>
          </Paper>
          {responses.map((resp, i) => (
            <Paper key={i} sx={{ mb: 2, p: 2 }}>
              <Typography variant="subtitle2">Response #{i + 1}</Typography>
              <ul>
                {Object.entries(resp).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </Paper>
          ))}
        </>
      )}
    </Box>
  );
};

export default ResponseViewerPage;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\survey_feedback\admin\ResponseViewerPage.jsx