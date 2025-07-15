// src/pages/tools/EMICalculatorPage.jsx
import React from 'react';
import EMICalculatorPanel from '../../components/emi_calculator/EMICalculatorPanel';
import '../../App.css';

const EMICalculatorPage = () => {
  return (
    <div className="tool-card converter-wrapper">
      <main style={{ padding: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1000px', width: '100%', background: 'linear-gradient(135deg, #4b42d5, #9a6fff)', borderRadius: '16px', display: 'flex', flexWrap: 'wrap', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <EMICalculatorPanel />
        </div>
      </main>
    </div>
  );
};

export default EMICalculatorPage;
