// File: src/components/survey_feedback/admin/AdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Button, IconButton, Tooltip, Table, TableHead,
  TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShareIcon from '@mui/icons-material/Share';
import PollSummaryPage from '../PollSummaryPage';

const AdminDashboardPage = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);

  const fetchPolls = () => {
    fetch('/api/polls')
      .then((res) => res.json())
      .then(setPolls);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to archive this poll?")) return;
    fetch(`/api/polls/${id}`, { method: 'DELETE' })
      .then(() => fetchPolls());
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>📋 Admin Poll Dashboard</Typography>

      <Paper sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Poll Question</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {polls.map((poll) => (
              <TableRow key={poll.id}>
                <TableCell>{poll.question}</TableCell>
                <TableCell>{new Date(poll.created_at).toLocaleString()}</TableCell>
                <TableCell>{poll.is_published ? '✅' : '❌'}</TableCell>
                <TableCell>
                  <Tooltip title="Share & Embed">
                    <IconButton onClick={() => setSelectedPoll(poll)}>
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Export CSV">
                    <IconButton
                      component="a"
                      href={`http://localhost:5000/api/polls/${poll.id}/export`}
                      target="_blank"
                    >
                      <FileDownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Poll">
                    <IconButton onClick={() => handleDelete(poll.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={!!selectedPoll} onClose={() => setSelectedPoll(null)} maxWidth="md" fullWidth>
        <DialogTitle>Poll Summary</DialogTitle>
        <DialogContent>
          {selectedPoll && (
            <PollSummaryPage pollId={selectedPoll.id} pollSlug={selectedPoll.slug} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminDashboardPage;
