// File: src/components/survey_feedback/admin/AdminPollAnalytics.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

const AdminPollAnalytics = ({ pollId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/polls/${pollId}/analytics`)
      .then((res) => res.json())
      .then((analytics) => {
        const labels = analytics.map((r) => r.date);
        const dataset = analytics.map((r) => r.votes);
        setData({
          labels,
          datasets: [{
            label: 'Daily Votes',
            data: dataset,
            fill: false,
            borderColor: '#4caf50',
          }],
        });
      });
  }, [pollId]);

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6">📈 Vote Trends</Typography>
      {data ? <Line data={data} /> : <CircularProgress />}
    </Paper>
  );
};

export default AdminPollAnalytics;
