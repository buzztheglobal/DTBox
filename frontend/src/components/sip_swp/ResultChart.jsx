// Filename: src/components/sip_swp/ResultChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const ResultChart = ({ labels, data, adjusted }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // 🔥 Destroy previous instance
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Nominal',
            data,
            borderColor: 'green',
            backgroundColor: 'rgba(0,128,0,0.2)',
            fill: true,
          },
          {
            label: 'Inflation Adjusted',
            data: adjusted,
            borderColor: 'orange',
            backgroundColor: 'rgba(255,165,0,0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => {
      chartRef.current?.destroy(); // Cleanup on unmount
    };
  }, [labels, data, adjusted]);

  return (
    <div style={{ height: '300px', position: 'relative' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ResultChart;
// Note: Ensure you have Chart.js installed in your project with `npm install chart.js` or `yarn add chart.js`.