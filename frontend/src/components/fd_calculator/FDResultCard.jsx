// File: src/components/fd_calculator/FDResultCard.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const FDResultCard = ({ result }) => {
  return (
    <Box mt={4} p={2} sx={{ background: '#e0f7fa', borderRadius: 2 }}>
      <Typography variant="h6" color="green">
        Maturity Amount: ₹{result.maturityAmount}
      </Typography>
      <Typography variant="body1">
        Interest Earned: ₹{result.interestEarned}
      </Typography>
      <Typography variant="body1">
        Maturity Date: {result.maturityDate}
      </Typography>
    </Box>
  );
};

export default FDResultCard;
