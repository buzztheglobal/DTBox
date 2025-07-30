// File: src/components/survey_feedback/PollResultViewer.jsx
import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PollResultViewer = ({ pollId }) => {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('pie');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pollId) return;

    fetch(`/api/polls/${pollId}/results`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch poll results.');
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          setChartData(null);
          return;
        }

        const labels = data.map((r) => r.selected_option);
        const values = data.map((r) => parseInt(r.votes, 10));

        setChartData({
          labels,
          datasets: [
            {
              label: 'Votes',
              data: values,
              backgroundColor: [
                '#4caf50',
                '#ff9800',
                '#2196f3',
                '#e91e63',
                '#9c27b0',
                '#00bcd4',
                '#ffc107',
                '#8bc34a',
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [pollId]);

  if (!pollId) return <Typography>No poll ID provided.</Typography>;
  if (loading) return <Box textAlign="center"><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center">❌ {error}</Typography>;
  if (!chartData) return <Typography align="center" sx={{ mt: 2 }}>⚠️ No votes recorded yet.</Typography>;

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>📊 Live Poll Results</Typography>
      <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={(e, val) => setChartType(val)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="pie">Pie</ToggleButton>
        <ToggleButton value="line">Line</ToggleButton>
      </ToggleButtonGroup>

      {chartType === 'pie' ? (
        <Pie data={chartData} />
      ) : (
        <Line
          data={{
            labels: chartData.labels,
            datasets: [{
              ...chartData.datasets[0],
              fill: false,
              borderColor: '#3f51b5',
            }],
          }}
        />
      )}
    </Paper>
  );
};

export default PollResultViewer;
