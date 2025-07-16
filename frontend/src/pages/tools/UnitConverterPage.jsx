import React from 'react';
import { Container } from '@mui/material';
import UnitConverter from '../../components/unit_converter/UnitConverter';
import '../../App.css';

const UnitConverterPage = () => {
  return (
    <Container sx={{ py: 5 }}>
      <UnitConverter />
    </Container>
  );
};

export default UnitConverterPage;
