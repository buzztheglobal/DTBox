// /src/components/qr_code_generator/QRCodeForm.jsx
import React, { useState, useEffect } from 'react';
import {
    Tabs, Tab, Box, TextField, Paper, Button, Tooltip, Alert, FormControlLabel, Switch
} from '@mui/material';
import QRCustomization from './QRCustomization';
import QRCodeResult from './QRCodeResult';
import {
    formBoxStyle,
    formFieldStyle,
    toolButtonStyle
} from '../../styles/globalStyles';

const tabTypes = ['url', 'text', 'email', 'phone', 'sms', 'geo', 'contact'];

const QRCodeForm = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [type, setType] = useState('url');
    const [inputData, setInputData] = useState({});
    const [qrValue, setQrValue] = useState('');
    const [error, setError] = useState('');
    const [isValidForm, setIsValidForm] = useState(false);
    const [useJsonContact, setUseJsonContact] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        setType(tabTypes[newValue]);
        setInputData({});
        setQrValue('');
        setError('');
        setUseJsonContact(false);
    };

    const handleChange = (key, value) => {
        setInputData((prev) => ({ ...prev, [key]: value }));
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidURL = (url) => {
        try {
            const parsed = new URL(url);
            return !!parsed.hostname;
        } catch {
            return false;
        }
    };
    const isValidPhone = (phone) => /^\+\d{1,4}-\d{6,15}$/.test(phone);
    const extractGeoFromGoogleMaps = (url) => {
        const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const match = url.match(regex);
        return match ? { lat: match[1], lng: match[2] } : null;
    };

    const validateInputs = () => {
        let err = '';
        switch (type) {
            case 'text':
                if (!inputData.text || inputData.text.length > 500)
                    err = 'Text must be under 500 characters.';
                break;
            case 'email':
                if (!isValidEmail(inputData.email || ''))
                    err = 'Enter a valid email address.';
                break;
            case 'url':
                if (!isValidURL(inputData.url || '') || inputData.url.length > 1000)
                    err = 'Enter a valid URL (max 1000 characters).';
                break;
            case 'phone':
                if (!isValidPhone(inputData.phone || ''))
                    err = 'Phone must be in +<countrycode>-<number> format.';
                break;
            case 'sms':
                if (!isValidPhone(inputData.smsNumber || ''))
                    err = 'SMS number must be in +<countrycode>-<number> format.';
                else if ((inputData.smsMessage || '').length > 500)
                    err = 'SMS message must be under 500 characters.';
                break;
            case 'geo': {
                let lat = inputData.lat;
                let lng = inputData.lng;
                if (inputData.mapURL) {
                    const coords = extractGeoFromGoogleMaps(inputData.mapURL);
                    if (!coords) return 'Invalid Google Maps link.';
                    lat = coords.lat;
                    lng = coords.lng;
                    handleChange('lat', lat);
                    handleChange('lng', lng);
                }
                if (!lat || !lng) return 'Provide either Google Maps link or both Lat & Long.';
                const isValidLat = !isNaN(lat) && +lat >= -90 && +lat <= 90;
                const isValidLng = !isNaN(lng) && +lng >= -180 && +lng <= 180;
                if (!isValidLat || !isValidLng) return 'Latitude or Longitude out of range.';
                break;
            }
            case 'contact': {
                if (useJsonContact) {
                    try {
                        const json = JSON.parse(inputData.contactJson || '{}');
                        if (!json.N || !json.TEL || !json.EMAIL)
                            err = 'JSON must include N, TEL, and EMAIL fields.';
                    } catch {
                        err = 'Invalid JSON format for vCard.';
                    }
                } else {
                    if ((inputData.name || '').length > 200)
                        err = 'Name must be under 200 characters.';
                    if (!isValidEmail(inputData.contactEmail || ''))
                        err = 'Enter a valid contact email.';
                    if (!isValidPhone(inputData.contactPhone || ''))
                        err = 'Phone must be in +<countrycode>-<number> format.';
                }
                break;
            }
            default:
                break;
        }
        setError(err);
        return err === '';
    };

    useEffect(() => {
        const isValid = validateInputs();
        setIsValidForm(isValid);
    }, [inputData, type, useJsonContact]);

    const generateQrString = () => {
        if (type === 'geo') {
            const lat = inputData.lat;
            const lng = inputData.lng;
            return `geo:${lat},${lng}`;
        }
        if (type === 'contact') {
            if (useJsonContact) {
                const json = JSON.parse(inputData.contactJson || '{}');
                return `BEGIN:VCARD\nVERSION:3.0\nN:${json.N}\nTEL:${json.TEL}\nEMAIL:${json.EMAIL}\nEND:VCARD`;
            } else {
                return `BEGIN:VCARD\nVERSION:3.0\nN:${inputData.name || ''}\nTEL:${inputData.contactPhone || ''}\nEMAIL:${inputData.contactEmail || ''}\nEND:VCARD`;
            }
        }
        switch (type) {
            case 'url': return inputData.url || '';
            case 'text': return inputData.text || '';
            case 'email': return `mailto:${inputData.email}?subject=${inputData.subject || ''}&body=${inputData.body || ''}`;
            case 'phone': return `tel:${inputData.phone || ''}`;
            case 'sms': return `SMSTO:${inputData.smsNumber || ''}:${inputData.smsMessage || ''}`;
            default: return '';
        }
    };

    const handleReset = () => {
        setInputData({});
        setQrValue('');
        setError('');
        setIsValidForm(false);
    };

    const handleCreateQR = () => {
        const value = generateQrString();
        setQrValue(value);
    };

    return (
        <Paper elevation={3} sx={formBoxStyle}>
            <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                {tabTypes.map((label, index) => <Tab key={index} label={label.toUpperCase()} />)}
            </Tabs>
            <Box className="form-card" mt={2}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {type === 'url' && (
                    <Box position="relative">
                        <Tooltip title="Enter a valid URL under 1000 characters" placement="top-start" arrow>
                            <Box>
                                <TextField
                                    label="URL"
                                    fullWidth
                                    sx={formFieldStyle}
                                    onChange={(e) => handleChange('url', e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                    </Box>
                )}

                {type === 'text' && (
                    <Box position="relative">
                        <Tooltip title="Enter plain text (max 500 characters)" placement="top-start" arrow>
                            <Box>
                                <TextField
                                    label="Text"
                                    fullWidth
                                    sx={formFieldStyle}
                                    onChange={(e) => handleChange('text', e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                    </Box>
                )}

                {type === 'email' && (
                    <>
                        <Box position="relative">
                            <Tooltip title="Enter a valid email address" placement="top-start" arrow>
                                <Box>
                                    <TextField label="Email" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('email', e.target.value)} />
                                </Box>
                            </Tooltip>
                        </Box>
                        <TextField label="Subject" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('subject', e.target.value)} />
                        <TextField label="Body" fullWidth multiline rows={2} sx={formFieldStyle} onChange={(e) => handleChange('body', e.target.value)} />
                    </>
                )}

                {type === 'phone' && (
                    <Box position="relative">
                        <Tooltip title="Format: +<countrycode>-<number>" placement="top-start" arrow>
                            <Box>
                                <TextField label="Phone Number" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('phone', e.target.value)} />
                            </Box>
                        </Tooltip>
                    </Box>
                )}

                {type === 'sms' && (
                    <>
                        <Box position="relative">
                            <Tooltip title="Format: +<countrycode>-<number>" placement="top-start" arrow>
                                <Box>
                                    <TextField label="Phone Number" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('smsNumber', e.target.value)} />
                                </Box>
                            </Tooltip>
                        </Box>
                        <Box position="relative">
                            <Tooltip title="Max 500 characters" placement="top-start" arrow>
                                <Box>
                                    <TextField label="Message" fullWidth multiline rows={2} sx={formFieldStyle} onChange={(e) => handleChange('smsMessage', e.target.value)} />
                                </Box>
                            </Tooltip>
                        </Box>
                    </>
                )}

                {type === 'geo' && (
                    <>
                        <Box position="relative">
                            <Tooltip title="Paste Google Maps URL or leave blank" placement="top-start" arrow>
                                <Box>
                                    <TextField label="Google Maps Link" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('mapURL', e.target.value)} />
                                </Box>
                            </Tooltip>
                        </Box>
                        <TextField label="Latitude" fullWidth sx={formFieldStyle} value={inputData.lat || ''} onChange={(e) => handleChange('lat', e.target.value)} />
                        <TextField label="Longitude" fullWidth sx={formFieldStyle} value={inputData.lng || ''} onChange={(e) => handleChange('lng', e.target.value)} />
                    </>
                )}

                {type === 'contact' && (
                    <>
                        <FormControlLabel
                            control={<Switch checked={useJsonContact} onChange={() => setUseJsonContact(!useJsonContact)} />}
                            label="Use vCard JSON input"
                            sx={{ mb: 2 }}
                        />
                        {useJsonContact ? (
                            <Box position="relative">
                                <Tooltip title='JSON format: {"N": "Name", "TEL": "+91-9999999999", "EMAIL": "name@example.com"}' placement="top-start" arrow>
                                    <Box>
                                        <TextField
                                            label="vCard JSON"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            sx={formFieldStyle}
                                            onChange={(e) => handleChange('contactJson', e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                            </Box>
                        ) : (
                            <>
                                <TextField label="Name" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('name', e.target.value)} />
                                <TextField label="Phone" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('contactPhone', e.target.value)} />
                                <TextField label="Email" fullWidth sx={formFieldStyle} onChange={(e) => handleChange('contactEmail', e.target.value)} />
                            </>
                        )}
                    </>
                )}

                <QRCustomization />
                <Box mt={2} display="flex" gap={2}>
                    <Button
                        variant="contained"
                        sx={{ ...toolButtonStyle, mt: 2 }}
                        onClick={handleCreateQR}
                        disabled={!isValidForm}
                    >
                        Create QR Code
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ ...toolButtonStyle, mt: 2 }}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Box>
                {qrValue && (
                    <QRCodeResult qrValue={qrValue} inputData={inputData} type={type} />
                )}
            </Box>
        </Paper>
    );
};

export default QRCodeForm;
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\qr_code_generator/QRCodeForm.jsx
// This component handles the QR code generation form, allowing users to select the type of data they want to encode, input the necessary information, and customize the QR code's appearance.  