// /src/components/qr_code_generator/QRCodeResult.jsx
import React, { useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import QRCode from 'react-qr-code';
import domtoimage from 'dom-to-image';
import { resultBoxStyle, toolButtonStyle } from '../../styles/globalStyles';

const QRCodeResult = ({ qrValue = '', inputData }) => {
  const qrRef = useRef(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    domtoimage.toPng(qrRef.current).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = dataUrl;
      link.click();
    });
  };

  const handleCopy = () => {
    if (!qrRef.current) return;
    domtoimage.toPng(qrRef.current).then((dataUrl) => {
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]));
    });
  };

  if (!qrValue || typeof qrValue !== 'string' || qrValue.trim().length === 0) {
    return null; // 👈 Don't render anything if qrValue is invalid
  }

  return (
    <Box sx={resultBoxStyle} textAlign="center">
      <Typography variant="h6">QR Code Preview</Typography>
      <Box ref={qrRef} sx={{ display: 'inline-block', background: '#fff', padding: 2, borderRadius: 2, mt: 2 }}>
        <QRCode value={qrValue} size={256} />
      </Box>

      <Box mt={2}>
        <Button onClick={handleDownload} sx={{ ...toolButtonStyle, mr: 2 }}>
          Download PNG
        </Button>
        <Button onClick={handleCopy} sx={toolButtonStyle}>
          Copy to Clipboard
        </Button>
      </Box>

      <Box mt={3}>
        <Typography variant="subtitle1" fontWeight={600}>Input Used:</Typography>
        <pre style={{ textAlign: 'left', fontSize: '0.9rem' }}>
          {JSON.stringify(inputData, null, 2)}
        </pre>
      </Box>
    </Box>
  );
};

export default QRCodeResult;
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\qr_code_generator/QRCodeResult.jsx
// This component displays the generated QR code and allows downloading or copying it to clipboard. 
// It also shows the input data used for generating the QR code.