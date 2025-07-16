// Filename: src/pages/tools/UnitConverterPage.jsx

import React from 'react';
import { Container } from '@mui/material';
import UnitConverter from '../../components/unit_converter/UnitConverter';

const UnitConverterPage = () => {
  return (
    <Container sx={{ py: 5 }}>
      <UnitConverter />
    </Container>
  );
};

export default UnitConverterPage;
// src/pages/tools/UnitConverterPage.jsx
// This page serves as the main entry point for the unit converter tool, rendering the UnitConverter component within a styled container.