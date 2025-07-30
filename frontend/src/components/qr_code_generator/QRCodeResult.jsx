// /src/components/qr_code_generator/QRCodeResult.jsx
import React, { useRef } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import QRCode from 'react-qr-code';
import domtoimage from 'dom-to-image';
import { resultBoxStyle, toolButtonStyle } from '../../styles/globalStyles';

const QRCodeResult = ({ qrValue = '', inputData, type }) => {
  const qrRef = useRef(null);

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const getIdentifier = () => {
    if (type === 'contact' && inputData?.name) return inputData.name.replace(/\s+/g, '-');
    if (type === 'url' && inputData?.url) {
      try {
        const { hostname } = new URL(inputData.url);
        return hostname.replace(/\./g, '-');
      } catch { return 'url'; }
    }
    if (type === 'email' && inputData?.email) return inputData.email.split('@')[0];
    if (type === 'geo' && inputData?.lat && inputData?.lng) return `${inputData.lat}_${inputData.lng}`;
    return type || 'qr';
  };

  const handleDownload = (format = 'png') => {
    if (!qrRef.current) return;

    const downloadFn = format === 'svg'
      ? domtoimage.toSvg(qrRef.current)
      : domtoimage.toPng(qrRef.current);

    downloadFn.then((dataUrl) => {
      const link = document.createElement('a');
      const filename = `${getIdentifier()}-qr-${getToday()}.${format}`;
      link.download = filename;
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

  if (!qrValue || typeof qrValue !== 'string' || qrValue.trim().length === 0) return null;

  return (
    <Box sx={resultBoxStyle} textAlign="center">
      <Typography variant="h6">QR Code Preview</Typography>

      <Box
        ref={qrRef}
        sx={{
          display: 'inline-block',
          background: '#fff',
          padding: 2,
          borderRadius: 2,
          mt: 2
        }}
      >
        <QRCode value={qrValue} size={256} />
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" spacing={2} mt={3}>
        <Button className='btn' onClick={() => handleDownload('png')} sx={toolButtonStyle}>
          Download PNG
        </Button>
        <Button className='btn' onClick={() => handleDownload('svg')} sx={toolButtonStyle}>
          Download SVG
        </Button>
        <Button className='btn' onClick={handleCopy} sx={toolButtonStyle}>
          Copy to Clipboard
        </Button>
      </Stack>

      <Box className="form-card"  mt={4}>
        <Typography variant="subtitle1" fontWeight={600}>Input Used:</Typography>
        <pre style={{ textAlign: 'left', fontSize: '0.9rem', overflowX: 'auto' }}>
          {JSON.stringify(inputData, null, 2)}
        </pre>
      </Box>
    </Box>
  );
};

export default QRCodeResult;
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\qr_code_generator\QRCodeResult.jsx
// This component displays the generated QR code and provides options to download it in different formats or copy it to the clipboard.
// It also shows the input data used for generating the QR code, formatted as JSON for clarity