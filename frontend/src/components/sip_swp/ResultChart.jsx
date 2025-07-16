// Filename: src/components/sip_swp/ResultChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const ResultChart = ({ labels, data, adjusted }) => {
  return (
    <Line
      data={{
        labels,
        datasets: [
          { label: 'Nominal', data, borderColor: 'green', backgroundColor: 'rgba(0,128,0,0.2)' },
          { label: 'Inflation Adjusted', data: adjusted, borderColor: 'orange', backgroundColor: 'rgba(255,165,0,0.2)' },
        ],
      }}
    />
  );
};

export default ResultChart;
