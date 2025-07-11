import React, { useState } from 'react';
import { DateTime, Duration } from 'luxon';
import '../../styles/AgeCalculator.css'; // Adjust the path as necessary

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
          ...diff,
        });
        return;
      }

      const diff = comparisonDate.diff(birthDate, [
        'years',
        'months',
        'days',
        'weeks',
        'hours',
        'minutes',
        'seconds',
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
    <div className="age-calculator-container">
      <h2 className="age-calculator-title">Age Calculator</h2>

      <div className="input-group">
        <label className="input-label">Date of Birth:</label>
        <input
          type="date"
          className="date-input"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="input-label">Calculate As of:</label>
        <input
          type="date"
          className="date-input"
          value={asOfDate}
          onChange={(e) => setAsOfDate(e.target.value)}
        />
      </div>

      <button className="calculate-button" onClick={handleCalculation}>
        Calculate
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>
      )}

      {result && !result.future && (
        <div className="results-section">
          <p className="age-summary">
            {Math.floor(result.yearsMonthsDays.years)} years, {result.yearsMonthsDays.months} months,{' '}
            {Math.floor(result.yearsMonthsDays.days)} days
          </p>
          <ul className="total-breakdown">
            <li className="total-item">
              <span>Total Years:</span> <span>{result.totalYears}</span>
            </li>
            <li className="total-item">
              <span>Total Months:</span> <span>{result.totalMonths}</span>
            </li>
            <li className="total-item">
              <span>Total Weeks:</span> <span>{result.totalWeeks}</span>
            </li>
            <li className="total-item">
              <span>Total Days:</span> <span>{result.totalDays}</span>
            </li>
            <li className="total-item">
              <span>Total Hours:</span> <span>{result.totalHours}</span>
            </li>
            <li className="total-item">
              <span>Total Minutes:</span> <span>{result.totalMinutes}</span>
            </li>
            <li className="total-item">
              <span>Total Seconds:</span> <span>{result.totalSeconds}</span>
            </li>
          </ul>
        </div>
      )}

      {result?.future && (
        <p className="age-summary">
          Born in {Math.abs(result.years).toFixed(0)} years, {Math.abs(result.months).toFixed(0)} months,{' '}
          {Math.abs(result.days).toFixed(0)} days
        </p>
      )}
    </div>
  );
};

export default AgeCalculator;
