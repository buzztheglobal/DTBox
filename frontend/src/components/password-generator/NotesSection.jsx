// src/components/password_info/NotesSection.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { cardBoxStyle, pageTitleStyle }  from '../../styles/globalStyles';

const NotesSection = () => (
  <Box sx={cardBoxStyle}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>Notes</Typography>
    <Typography variant="body1" mt={2}>
      Passwords should be treated like toothbrushes — never shared and changed regularly.
      For better protection, combine memorability with randomness using passphrases or password managers.
    </Typography>
  </Box>
);

export default NotesSection;
// src/components/password_generator/NotesSection.jsx