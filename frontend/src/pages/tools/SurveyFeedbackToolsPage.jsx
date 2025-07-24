// File: src/pages/tools/SurveyFeedbackToolsPage.jsx
import React, { useState } from 'react';
import {
  Box, Tabs, Tab, Typography, Paper
} from '@mui/material';

import SurveyBuilderPage from '../../components/survey_feedback/admin/SurveyBuilderPage';
import PollCreatorTab from '../../components/survey_feedback/PollCreatorTab';
import FeedbackFormTab from '../../components/survey_feedback/FeedbackFormTab';

const SurveyFeedbackToolsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🧠 Survey, Poll & Feedback Tools
      </Typography>

      <Paper elevation={3} sx={{ mb: 3 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Survey Builder" />
          <Tab label="Poll Creator" />
          <Tab label="Feedback Form" />
        </Tabs>
      </Paper>

      {tabIndex === 0 && <SurveyBuilderPage />}
      {tabIndex === 1 && <PollCreatorTab />}
      {tabIndex === 2 && <FeedbackFormTab />}
    </Box>
  );
};

export default SurveyFeedbackToolsPage;
//  C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\SurveyFeedbackToolsPage.jsx