// /src/components/qr_code_generator/QRCodeForm.jsx
import React, { useState } from 'react';
import {
  Tabs, Tab, Box, TextField, Paper, Button
} from '@mui/material';
import QRCustomization from './QRCustomization';
import QRCodeResult from './QRCodeResult';
import { formBoxStyle, formFieldStyle, toolButtonStyle } from '../../styles/globalStyles';

const QRCodeForm = () => {
  const tabTypes = ['url', 'text', 'email', 'phone', 'sms', 'geo', 'contact'];
  const [tabIndex, setTabIndex] = useState(0);
  const [type, setType] = useState('url');
  const [inputData, setInputData] = useState({});
  const [qrValue, setQrValue] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setType(tabTypes[newValue]);
    setInputData({});
    setQrValue('');
  };

  const handleChange = (key, value) => {
    setInputData((prev) => ({ ...prev, [key]: value }));
  };

  const generateQrString = () => {
    switch (type) {
      case 'url': return inputData.url || '';
      case 'text': return inputData.text || '';
      case 'email': return `mailto:${inputData.email}?subject=${inputData.subject || ''}&body=${inputData.body || ''}`;
      case 'phone': return `tel:${inputData.phone || ''}`;
      case 'sms': return `SMSTO:${inputData.smsNumber || ''}:${inputData.smsMessage || ''}`;
      case 'geo': return `geo:${inputData.lat || ''},${inputData.lng || ''}`;
      case 'contact':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${inputData.name || ''}\nTEL:${inputData.contactPhone || ''}\nEMAIL:${inputData.contactEmail || ''}\nEND:VCARD`;
      default: return '';
    }
  };

  const handleCreateQR = () => {
    setQrValue(generateQrString());
  };

  return (
    <Paper elevation={3} sx={formBoxStyle}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="URL" />
        <Tab label="Text" />
        <Tab label="Email" />
        <Tab label="Phone" />
        <Tab label="SMS" />
        <Tab label="Geo" />
        <Tab label="Contact" />
      </Tabs>

      <Box mt={2}>
        {type === 'url' && (
          <TextField label="URL" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('url', e.target.value)} />
        )}
        {type === 'text' && (
          <TextField label="Text" fullWidth multiline rows={2} sx={formFieldStyle} onChange={(e) => handleChange('text', e.target.value)} />
        )}
        {type === 'email' && (
          <>
            <TextField label="Email" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('email', e.target.value)} />
            <TextField label="Subject" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('subject', e.target.value)} />
            <TextField label="Body" fullWidth multiline rows={2} sx={formFieldStyle} onChange={(e) => handleChange('body', e.target.value)} />
          </>
        )}
        {type === 'phone' && (
          <TextField label="Phone Number" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('phone', e.target.value)} />
        )}
        {type === 'sms' && (
          <>
            <TextField label="Phone Number" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('smsNumber', e.target.value)} />
            <TextField label="Message" fullWidth multiline rows={2} sx={formFieldStyle} onChange={(e) => handleChange('smsMessage', e.target.value)} />
          </>
        )}
        {type === 'geo' && (
          <>
            <TextField label="Latitude" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('lat', e.target.value)} />
            <TextField label="Longitude" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('lng', e.target.value)} />
          </>
        )}
        {type === 'contact' && (
          <>
            <TextField label="Name" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('name', e.target.value)} />
            <TextField label="Phone" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('contactPhone', e.target.value)} />
            <TextField label="Email" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('contactEmail', e.target.value)} />
          </>
        )}

        <QRCustomization />

        <Button variant="contained" sx={{ ...toolButtonStyle, mt: 2 }} onClick={handleCreateQR}>
          Create QR Code
        </Button>

        {qrValue && (
          <QRCodeResult qrValue={qrValue} inputData={inputData} />
        )}
      </Box>
    </Paper>
  );
};

export default QRCodeForm;
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\qr_code_generator/QRCodeForm.jsx
