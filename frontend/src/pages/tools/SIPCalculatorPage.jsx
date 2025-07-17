// Filename: src/pages/tools/SIPCalculatorPage.jsx
import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import '../../App.css';
import useGlobalStyles from '../../styles/useGlobalStyles';

import SIPForm from '../../components/sip_swp/SIPFormWithPieChart';
import SWPForm from '../../components/sip_swp/SWPForm';
import GoalPlanner from '../../components/sip_swp/GoalPlanner';
import StepUpCalculator from '../../components/sip_swp/StepUpCalculator';
import TooltipsAccordion from '../../components/sip_swp/TooltipsAccordion';

const SIPCalculatorPage = () => {
  const globalStyles = useGlobalStyles();
  const [tab, setTab] = useState(0);

  const handleTabChange = (_, newValue) => setTab(newValue);

  return (
    <Container className="tool-container" sx={globalStyles.pageContainerStyle}>
      <Typography variant="h4" sx={globalStyles.pageTitleStyle}>
        Mutual Fund SIP & SWP Calculator
      </Typography>

      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label="SIP Calculator" />
        <Tab label="Goal Planner" />
        <Tab label="Step-Up SIP" />
        <Tab label="SWP Calculator" />
        <Tab label="FAQs / Tooltips" />
      </Tabs>

      <Box hidden={tab !== 0}><SIPForm showChart formatAmount /></Box>
      <Box hidden={tab !== 1}><GoalPlanner showChart formatAmount /></Box>
      <Box hidden={tab !== 2}><StepUpCalculator showChart formatAmount /></Box>
      <Box hidden={tab !== 3}><SWPForm showChart formatAmount /></Box>
      <Box hidden={tab !== 4}><TooltipsAccordion /></Box>
    </Container>
  );
};

export default SIPCalculatorPage;
// Note: Ensure you have the necessary components and styles defined in the specified paths.
// This page serves as a central hub for various mutual fund calculators, allowing users to switch between