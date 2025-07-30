// File: src/pages/tools/PollGalleryPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PollCard from '../../components/survey_feedback/PollCard';

const PollGalleryPage = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetch('/api/polls?public=true')
      .then((res) => res.json())
      .then(setPolls);
  }, []);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>🌐 Public Poll Gallery</Typography>
      {polls.length === 0 ? (
        <Typography>No public polls available.</Typography>
      ) : (
        <Paper sx={{ p: 2 }}>
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default PollGalleryPage;
