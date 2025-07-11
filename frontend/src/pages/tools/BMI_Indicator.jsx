// src/components/BMI_Indicator.jsx
import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/BMI_Indicator.css';
//frontend\src\App.css

function BMI_Indicator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unitSystem, setUnitSystem] = useState('metric');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [showBmiResult, setShowBmiResult] = useState(false);

  const getBMICategory = useCallback((bmiValue) => {
    let newCategory = '';
    let newMessage = '';

    if (bmiValue < 18.5) {
      newCategory = 'Underweight';
      newMessage = 'Being underweight can lead to health issues. Consider consulting a healthcare professional.';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      newCategory = 'Normal Weight';
      newMessage = 'You are in a healthy weight range. Keep up the good work!';
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      newCategory = 'Overweight';
      newMessage = 'Being overweight can increase health risks. Small changes can make a big difference.';
    } else if (bmiValue >= 30 && bmiValue <= 34.9) {
      newCategory = 'Obese Class I';
      newMessage = 'Obesity can have significant health implications. Consulting a doctor is recommended.';
    } else if (bmiValue >= 35 && bmiValue <= 39.9) {
      newCategory = 'Obese Class II';
      newMessage = 'This level of obesity carries substantial health risks. Seek professional medical advice.';
    } else {
      newCategory = 'Obese Class III';
      newMessage = 'Severe obesity requires immediate medical attention and lifestyle changes.';
    }

    setCategory(newCategory);
    setMessage(newMessage);
  }, []);

  const calculateBMI = useCallback(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setBmi(null);
      setCategory('');
      setMessage('');
      return;
    }

    let calculatedBmi;
    if (unitSystem === 'metric') {
      calculatedBmi = w / ((h / 100) * (h / 100));
    } else {
      calculatedBmi = (w / (h * h)) * 703;
    }

    setBmi(calculatedBmi.toFixed(2));
    getBMICategory(calculatedBmi);
  }, [height, weight, unitSystem, getBMICategory]);

  useEffect(() => {
    calculateBMI();
  }, [calculateBMI]);

  useEffect(() => {
    if (bmi !== null) {
      const timer = setTimeout(() => setShowBmiResult(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShowBmiResult(false);
    }
  }, [bmi]);

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setHeight(value);
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setWeight(value);
    }
  };

  return (
    <div className="bmi-card">
      <h1 className="bmi-title">BMI Calculator</h1>

      {/* Unit Toggle */}
      <div className="bmi-toggle">
        <button
          onClick={() => setUnitSystem('metric')}
          className={`glassy-button ${unitSystem === 'metric' ? 'active' : ''}`}
        >
          Metric (cm, kg)
        </button>
        <button
          onClick={() => setUnitSystem('imperial')}
          className={`glassy-button ${unitSystem === 'imperial' ? 'active' : ''}`}
        >
          Imperial (in, lbs)
        </button>
      </div>

      {/* Input Fields */}
      <div className="bmi-inputs">
        <label htmlFor="height">
          Height ({unitSystem === 'metric' ? 'cm' : 'inches'})
        </label>
        <input
          id="height"
          type="text"
          value={height}
          onChange={handleHeightChange}
          placeholder={unitSystem === 'metric' ? 'e.g., 175' : 'e.g., 68'}
        />

        <label htmlFor="weight">
          Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
        </label>
        <input
          id="weight"
          type="text"
          value={weight}
          onChange={handleWeightChange}
          placeholder={unitSystem === 'metric' ? 'e.g., 70' : 'e.g., 150'}
        />
      </div>

      {/* BMI Result */}
      {bmi && (
        <div
          className={`bmi-result ${showBmiResult ? 'bmi-result-visible' : 'bmi-result-hidden'}`}
        >
          <p>Your BMI is:</p>
          <span>{bmi}</span>
          <p>Category: <span>{category}</span></p>
          <p className="bmi-message">{message}</p>
        </div>
      )}

      {/* Info & Disclaimer */}
      <div className="bmi-info">
        <h4>What is BMI?</h4>
        <p>
          BMI (Body Mass Index) is a simple calculation using a person's height and weight.
          The formula is BMI = kg/m² where kg is weight and m² is height in meters squared.
        </p>
        <p className="disclaimer">
          Disclaimer: BMI is a general indicator and not a substitute for medical advice.
          Please consult a doctor for personalized health guidance.
        </p>
      </div>
    </div>
  );
}

export default BMI_Indicator;
