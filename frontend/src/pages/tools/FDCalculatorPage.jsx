// File: src/pages/tools/FDCalculatorPage.jsx
import React, { useState } from 'react';
import {
    Typography,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
    Grid,
    Paper,
    Box,
} from '@mui/material';
import { format } from 'date-fns';
import { styled } from '@mui/system';
import '../../App.css';
import { pageTitleStyle } from '../../styles/globalStyles';

import FDResultCard from '../../components/fd_calculator/FDResultCard';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    borderRadius: '16px',
    backgroundColor: '#f9f9f9',
}));

const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(amount);

const FDCalculatorPage = () => {
    const [form, setForm] = useState({
        principal: '',
        rate: '',
        tenure: '',
        tenureType: 'years',
        compounding: 'quarterly',
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const calculateFD = () => {
        const { principal, rate, tenure, tenureType, compounding } = form;
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        let t = parseFloat(tenure);
        let n = 1;

        switch (compounding) {
            case 'monthly':
                n = 12;
                break;
            case 'quarterly':
                n = 4;
                break;
            case 'half-yearly':
                n = 2;
                break;
            case 'annually':
                n = 1;
                break;
            default:
                break;
        }

        if (tenureType === 'months') {
            t = t / 12;
        } else if (tenureType === 'days') {
            t = t / 365;
        }

        let A = 0;
        if (t >= 0.5) {
            A = P * Math.pow(1 + r / n, n * t);
        } else {
            A = P + P * r * t;
        }

        const maturityDate = new Date();
        maturityDate.setFullYear(maturityDate.getFullYear() + Math.floor(t));
        const interestEarned = A - P;

        setResult({
            maturityAmount: formatCurrency(A),
            interestEarned: formatCurrency(interestEarned),
            maturityDate: format(maturityDate, 'dd/MM/yyyy'),
        });
    };

    return (
        <Box className="calculator-container">
            <Typography variant="h4" sx={pageTitleStyle} gutterBottom>
                Fixed Deposit (FD) Calculator
            </Typography>

            <StyledPaper elevation={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Principal Amount (₹)"
                            fullWidth
                            name="principal"
                            type="number"
                            value={form.principal}
                            onChange={handleChange}
                            inputProps={{ min: 5000, step: 100 }}
                        />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <TextField
                            label="Interest Rate (%)"
                            fullWidth
                            name="rate"
                            type="number"
                            value={form.rate}
                            onChange={handleChange}
                            inputProps={{ min: 1, step: 0.1 }}
                        />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <TextField
                            label="Tenure"
                            fullWidth
                            name="tenure"
                            type="number"
                            value={form.tenure}
                            onChange={handleChange}
                            inputProps={{ min: 1 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Tenure Type</InputLabel>
                            <Select
                                name="tenureType"
                                value={form.tenureType}
                                onChange={handleChange}
                                label="Tenure Type"
                            >
                                <MenuItem value="days">Days</MenuItem>
                                <MenuItem value="months">Months</MenuItem>
                                <MenuItem value="years">Years</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Compounding Frequency</InputLabel>
                            <Select
                                name="compounding"
                                value={form.compounding}
                                onChange={handleChange}
                                label="Compounding Frequency"
                            >
                                <MenuItem value="monthly">Monthly</MenuItem>
                                <MenuItem value="quarterly">Quarterly</MenuItem>
                                <MenuItem value="half-yearly">Half-Yearly</MenuItem>
                                <MenuItem value="annually">Annually</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Button variant="contained" color="primary" fullWidth onClick={calculateFD}>
                            Calculate
                        </Button>
                    </Grid>
                </Grid>

                {result && <FDResultCard result={result} />}
            </StyledPaper>
        </Box>
    );
};

export default FDCalculatorPage;
