// File: frontend/src/components/rd_calculator/RDChart.jsx

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Box } from "@mui/material"; // ← also missing this

// Custom formatter for labels and tooltips
const formatCurrency = (val) =>
    `₹${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const RDChart = ({ principal, interest }) => {
    const data = [
        { name: "Principal", value: principal },
        { name: "Interest", value: interest },
    ];
    const COLORS = ["#8884d8", "#00C49F"];

    return (
        <Box className="form-card" sx={{ height: 250, mt: 3 }} className="pie-chart">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data} dataKey="value"
                        cx="50%" cy="50%" outerRadius={80}
                        label={({ name, value }) => `${name}: ${formatCurrency(value)}`} // ✅ label formatting
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => formatCurrency(value)} // ✅ tooltip formatting
                    />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default RDChart; // ✅ ADD THIS LINE
// This line exports the RDChart component so it can be used in other parts of the application.