// src/components/date_calculator/DateCalculatorTabs.jsx
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ChronologicalAgeCalculator from './ChronologicalAgeCalculator';
import RelationshipGapCalculator from './RelationshipGapCalculator';
import LifeExpectancyCalculator from './LifeExpectancyCalculator';
import RelationshipCompatibilityCalculator from './RelationshipCompatibilityCalculator';
import AgeCalculator from './AgeCalculator';
import DateDiffCalculator from './DateDiffCalculator';
import './date_calculator.css';

const DateCalculatorTabs = () =>  {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Box className="calculator-container nav-section" sx={{ width: '100%', typography: 'body1' }}>
      <Tabs
        className="nav-tabs"
        value={tabIndex}
        onChange={(_, val) => setTabIndex(val)}
        variant="scrollable"
        scrollButtons="on"
        allowScrollButtonsMobile
        aria-label="Date Calculator Tabs"
      >
        <Tab className='nav-tab ' label="Date Difference" />
        <Tab className='nav-tab' label="Chronological Age" />
        {/* <Tab className='nav-tab' label="Relationship Gap" /> */}
        <Tab className='nav-tab' label="Life Expectancy" />
        <Tab className='nav-tab' label="Compatibility" />
        <Tab className='nav-tab' label="Age Calculator" />
      </Tabs>
      <Box className="nav-section nav-tab:hover nav-section form-card subtitle" sx={{ mt: 4 }}>
        {tabIndex === 0 && <DateDiffCalculator />}
        {tabIndex === 1 && <ChronologicalAgeCalculator />}
        {/* {tabIndex === 2 && <RelationshipGapCalculator />} */}
        {tabIndex === 2 && <LifeExpectancyCalculator />}
        {tabIndex === 3 && <RelationshipCompatibilityCalculator />}
        {tabIndex === 4 && <AgeCalculator />}
      </Box>
    </Box>
  );
};

export default DateCalculatorTabs;
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\date_calculator\DateCalculatorTabs.jsx