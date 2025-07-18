// File: frontend/src/components/rd_calculator/RDResultBox.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { resultBoxStyle, getMaturityDate } from "../../styles/globalStyles";
import RDChart from "./RDChart";

const RDResultBox = ({ result }) => {
    if (!result) return null;

    const { maturityAmount, interestEarned, totalInvestment, tenure } = result;

    return (
        <Box sx={resultBoxStyle}>
            <Typography variant="h6">Results</Typography>
            <Typography>
                Total Investment: ₹{totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Typography>
            <Typography>
                Interest Earned: ₹{interestEarned.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Typography>
            <Typography fontWeight="bold" color="green">
                Maturity Amount: ₹{maturityAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Typography>
            <Typography>Maturity Date: {getMaturityDate(tenure)}</Typography>
            <RDChart principal={totalInvestment} interest={interestEarned} />
        </Box>
    );
};

export default RDResultBox;
// File: frontend/src/components/rd_calculator/RDChart.jsx