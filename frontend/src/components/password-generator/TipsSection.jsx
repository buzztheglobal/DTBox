// src/components/password_info/TipsSection.jsx
import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { pageTitleStyle, cardBoxStyle }  from '../../styles/globalStyles';

const tips = [
  "Use at least 12–16 characters.",
  "Avoid personal info like names or birthdays.",
  "Use a mix of uppercase, lowercase, numbers, and special characters.",
  "Avoid dictionary words or predictable sequences.",
  "Use a password manager for stronger and unique passwords.",
  "Don't reuse the same password on different sites.",
  "Include special characters from a wide set like !@#$%^&*()_+-=~|{}[]."
];

const TipsSection = () => (
  <Box sx={cardBoxStyle} mb={4}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>Tips for Strong Passwords</Typography>
    <List dense>
      {tips.map((tip, index) => (
        <ListItem key={index}>
          <ListItemText primary={`• ${tip}`} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default TipsSection;
// src/components/password_generator/TipsSection.jsx