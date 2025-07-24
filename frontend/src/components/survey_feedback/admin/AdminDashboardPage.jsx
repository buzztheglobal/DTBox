// File: src/components/survey_feedback/admin/AdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Button, CircularProgress
} from '@mui/material';
import { CSVLink } from 'react-csv';
import EmbedCodeGenerator from './EmbedCodeGenerator';

const AdminDashboardPage = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch('/api/forms/admin/forms', {
          headers: { Authorization: localStorage.getItem('userEmail') || '' }
        });
        const data = await res.json();
        setForms(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load forms:', err);
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3}>📊 Admin Dashboard</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Created</strong></TableCell>
            <TableCell><strong>Responses</strong></TableCell>
            <TableCell><strong>Export</strong></TableCell>
            <TableCell><strong>Embed</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {forms.map((form) => (
            <TableRow key={form.id}>
              <TableCell>{form.title}</TableCell>
              <TableCell>{form.type}</TableCell>
              <TableCell>{new Date(form.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{form.response_count || 0}</TableCell>

              {/* CSV Export */}
              <TableCell>
                {form.responses && form.responses.length > 0 ? (
                  <CSVLink
                    filename={`${form.title.replace(/\s+/g, '_')}-responses.csv`}
                    data={form.responses.map((r) => {
                      const row = { submitted_at: r.submitted_at };
                      r.answers.forEach((a, i) => {
                        row[`Q${i + 1}`] = a.answer_text;
                      });
                      return row;
                    })}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant="outlined" size="small">Download</Button>
                  </CSVLink>
                ) : '—'}
              </TableCell>

              {/* Embed Code Generator */}
              <TableCell>
                <EmbedCodeGenerator formId={form.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminDashboardPage;
