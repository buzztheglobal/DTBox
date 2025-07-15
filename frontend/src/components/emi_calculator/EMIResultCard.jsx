//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\emi_calculator\EMIResultCard.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './emi_calculator.css';

const EMIResultCard = ({ result }) => {
  const { emi, totalPayment, totalInterest } = result;

  return (
    <Card className="emi-result">
      <CardContent>
        <Typography className="emi-card" variant="h6" gutterBottom>
          EMI Summary
        </Typography>
        <Typography className="emi-card" variant="body1">
          <strong>Monthly EMI:</strong> ₹{emi}
        </Typography>
        <Typography className="emi-card" variant="body1">
          <strong>Total Interest Payable:</strong> ₹{totalInterest}
        </Typography>
        <Typography className="emi-card" variant="body1">
          <strong>Total Payment:</strong> ₹{totalPayment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EMIResultCard;
