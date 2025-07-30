// src/components/survey_feedback/PollListTab.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material';

const PollListTab = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetch('/api/polls')
      .then(res => res.json())
      .then(setPolls);
  }, []);

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" gutterBottom>All Polls</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Published</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {polls.map((poll) => (
            <TableRow key={poll.id}>
              <TableCell>{poll.question}</TableCell>
              <TableCell>{new Date(poll.created_at).toLocaleString()}</TableCell>
              <TableCell>{poll.is_published ? "✅" : "❌"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PollListTab;
