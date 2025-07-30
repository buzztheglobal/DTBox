// src/pages/tools/TimeZoneConverterPage.jsx
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import TimeZoneSelector from '../../components/timezone_converter/TimeZoneSelector';
import TimeInputField from '../../components/timezone_converter/TimeInputField';

import TimeZoneResult from '../../components/timezone_converter/TimeZoneResult';

import { DateTime } from 'luxon';
import '../../components/timezone_converter/timezone_converter.css';

const TimeZoneConverterPage = () => {
    const [sourceZone, setSourceZone] = useState('UTC');
    const [targetZone, setTargetZone] = useState('Asia/Kolkata');
    const [inputTime, setInputTime] = useState('');
    const [convertedTime, setConvertedTime] = useState('');

    const handleConvert = () => {
        if (!inputTime) return;

        const dt = DateTime.fromISO(inputTime, { zone: sourceZone });
        const converted = dt.setZone(targetZone);
        setConvertedTime(converted.toFormat('yyyy-MM-dd HH:mm ZZZZ'));
    };

    console.log({ TimeZoneSelector, TimeInputField, TimeZoneResult });

    console.log({
        typeofTimeInputField: typeof TimeInputField,
        TimeInputField
    });

    return (
        <Container className="calculator-container">
            <Typography variant="h4" gutterBottom>🌍 Time Zone Converter</Typography>
            <TimeInputField
                label="Input Date and Time"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
            />
            <TimeZoneSelector
                label="From Timezone"
                value={sourceZone}
                onChange={(e) => setSourceZone(e.target.value)}
            />
            <TimeZoneSelector
                label="To Timezone"
                value={targetZone}
                onChange={(e) => setTargetZone(e.target.value)}
            />
            <Box mt={2}>
                <Button variant="contained" onClick={handleConvert} className="glassy-button">
                    Convert Time
                </Button>
            </Box>
            <TimeZoneResult convertedTime={convertedTime} targetZone={targetZone} />
        </Container>
    );
};

export default TimeZoneConverterPage;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\TimeZoneConverterPage.jsx