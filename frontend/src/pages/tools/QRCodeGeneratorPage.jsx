// /src/pages/tools/QRCodeGeneratorPage.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import QRCodeForm from '../../components/qr_code_generator/QRCodeForm';
import QRCodeResult from '../../components/qr_code_generator/QRCodeResult';
import { pageTitleStyle, pageContainerStyle } from '../../styles/globalStyles';

const QRCodeGeneratorPage = () => {
  return (
    <Container maxWidth="md" sx={pageContainerStyle}>
      <Typography variant="h4" sx={pageTitleStyle}>
        QR Code Generator
      </Typography>
      <Box mt={4}>
        <QRCodeForm />
        <QRCodeResult />
      </Box>
    </Container>
  );
};

export default QRCodeGeneratorPage;
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\QRCodeGeneratorPage.jsx