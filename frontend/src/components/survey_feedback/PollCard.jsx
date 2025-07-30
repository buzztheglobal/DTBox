// File: src/components/survey_feedback/PollCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const PollCard = ({ poll }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{poll.question}</Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(poll.created_at).toLocaleString()}
        </Typography>

        <Box className="form-card" mt={2}>
          <Button
            variant="contained"
            component={Link}
            to={`/form/${poll.slug || poll.id}`}
            sx={{ mr: 1 }}
          >
            View Poll
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to={`/admin/poll/${poll.id}/summary`}
          >
            Summary
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PollCard;
