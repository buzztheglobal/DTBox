// Age Calculator Core Requirements Implementation Sketch (React + Luxon)
// Architecture link reference: https://chatgpt.com/c/686d2a76-fa08-800b-bddd-689a28d54d9a

// Technologies: ReactJS, Luxon (for date/time and time zone handling), Material UI / Bootstrap for UI, i18n support

// 1. Install Luxon via npm
// npm install luxon

// 2. Example Core Component: AgeCalculator.jsx

import React, { useState } from 'react';
import { DateTime, Duration } from 'luxon';

const AgeCalculator = () => {
  const [dob, setDob] = useState('');
  const [asOfDate, setAsOfDate] = useState(DateTime.local().toISODate());
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculation = () => {
    setError(null);
    try {
      const birthDate = DateTime.fromISO(dob);
      const comparisonDate = DateTime.fromISO(asOfDate);

      if (!birthDate.isValid || !comparisonDate.isValid) {
        setError('Invalid date(s) selected.');
        return;
      }

      if (birthDate > comparisonDate) {
        const diff = birthDate.diff(comparisonDate, ['years', 'months', 'days']).toObject();
        setResult({
          future: true,
          ...diff
        });
        return;
      }

      const diff = comparisonDate.diff(birthDate, [
        'years', 'months', 'days', 'weeks', 'hours', 'minutes', 'seconds'
      ]);

      const duration = Duration.fromObject(diff.toObject());

      setResult({
        yearsMonthsDays: comparisonDate.diff(birthDate, ['years', 'months', 'days']).toObject(),
        totalYears: duration.as('years').toFixed(2),
        totalMonths: duration.as('months').toFixed(0),
        totalWeeks: duration.as('weeks').toFixed(0),
        totalDays: duration.as('days').toFixed(0),
        totalHours: duration.as('hours').toFixed(0),
        totalMinutes: duration.as('minutes').toFixed(0),
        totalSeconds: duration.as('seconds').toFixed(0),
      });
    } catch (e) {
      setError('Something went wrong during calculation.');
    }
  };

  return (
    <div className="container">
      <h2>Age Calculator</h2>
      <label>Date of Birth:</label>
      <input type="date" value={dob} onChange={e => setDob(e.target.value)} />
      <label>Calculate As of:</label>
      <input type="date" value={asOfDate} onChange={e => setAsOfDate(e.target.value)} />
      <button onClick={handleCalculation}>Calculate</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && !result.future && (
        <div>
          <p><strong>Age:</strong> {Math.floor(result.yearsMonthsDays.years)} years, {result.yearsMonthsDays.months} months, {Math.floor(result.yearsMonthsDays.days)} days</p>
          <ul>
            <li><strong>Total Years:</strong> {result.totalYears}</li>
            <li><strong>Total Months:</strong> {result.totalMonths}</li>
            <li><strong>Total Weeks:</strong> {result.totalWeeks}</li>
            <li><strong>Total Days:</strong> {result.totalDays}</li>
            <li><strong>Total Hours:</strong> {result.totalHours}</li>
            <li><strong>Total Minutes:</strong> {result.totalMinutes}</li>
            <li><strong>Total Seconds:</strong> {result.totalSeconds}</li>
          </ul>
        </div>
      )}

      {result?.future && (
        <p><strong>Future Date:</strong> Born in {Math.abs(result.years).toFixed(0)} years, {Math.abs(result.months).toFixed(0)} months, {Math.abs(result.days).toFixed(0)} days</p>
      )}
    </div>
  );
};

console.log("AgeCalculatorPage loaded successfully");

export default AgeCalculator;

// 3. Future Extensions
// - Add time inputs for precise hour/minute calculation
// - Support Time Zones via Luxon's `setZone()`
// - Add localization using i18n (e.g., date format DD/MM/YYYY vs MM/DD/YYYY)
// - Custom calendar support (Julian, etc.) if needed
// - Responsive layout using Material UI or Bootstrap

// 4. Use this component inside your App.js or routing file
// import AgeCalculator from './components/AgeCalculator';
// Then use <AgeCalculator />
