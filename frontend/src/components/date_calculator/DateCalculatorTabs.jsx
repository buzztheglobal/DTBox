import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ChronologicalAgeCalculator from './ChronologicalAgeCalculator';
import RelationshipGapCalculator from './RelationshipGapCalculator';
import LifeExpectancyCalculator from './LifeExpectancyCalculator';
import RelationshipCompatibilityCalculator from './RelationshipCompatibilityCalculator';
import AgeCalculator from './AgeCalculator';
import DateDiffCalculator from './DateDiffCalculator';

const DateCalculatorTabs = () =>  {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Tabs
        value={tabIndex}
        onChange={(_, val) => setTabIndex(val)}
        variant="scrollable"
        scrollButtons="on"
        allowScrollButtonsMobile
        aria-label="Date Calculator Tabs"
      >
        <Tab label="Date Difference" />
        <Tab label="Chronological Age" />
        <Tab label="Relationship Gap" />
        <Tab label="Life Expectancy" />
        <Tab label="Compatibility" />
        <Tab label="Age Calculator" />
      </Tabs>
      <Box sx={{ mt: 4 }}>
        {tabIndex === 0 && <DateDiffCalculator />}
        {tabIndex === 1 && <ChronologicalAgeCalculator />}
        {tabIndex === 2 && <RelationshipGapCalculator />}
        {tabIndex === 3 && <LifeExpectancyCalculator />}
        {tabIndex === 4 && <RelationshipCompatibilityCalculator />}
        {tabIndex === 5 && <AgeCalculator />}
      </Box>
    </Box>
  );
}

export default DateCalculatorTabs;
