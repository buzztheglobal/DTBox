import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import './emi_calculator.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const EMIResultCard = ({ result }) => {
  const { emi, totalPayment, totalInterest, principal } = result;

  const pieData = {
    labels: ['Total Interest', 'Principal (Loan Amount)'],
    datasets: [
      {
        data: [Number(totalInterest), Number(principal)],
        backgroundColor: ['#780206', '#061161'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 2,
        hoverOffset: 10,
      }
    ]
  };

  return (
    <Card className="emi-result" sx={{
      flex: 1,
      minWidth: '300px',
      padding: '1rem',
      background: 'linear-gradient(135deg, #f5c7c7 0%, #c7c9f5 100%)',
      borderRadius: '0 16px 16px 0'
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
          EMI Summary
        </Typography>

        <Box sx={{ height: 250, mb: 2 }}>
          <Pie data={pieData} />
        </Box>

        <Box mb={2}>
          <Typography className='emi-result' variant="body1"><strong>Monthly EMI:</strong> ₹{emi}</Typography>
          <Typography className='emi-result' variant="body1"><strong>Total Interest Payable:</strong> ₹{totalInterest}</Typography>
          <Typography className='emi-result' variant="body1"><strong>Total Payment:</strong> ₹{totalPayment}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EMIResultCard;
