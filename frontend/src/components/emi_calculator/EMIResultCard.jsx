//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\emi_calculator\EMIResultCard.jsx
import React from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#4caf50", "#f44336"]; // Principal vs Interest

// 🔹 Custom label renderer → show ₹ value instead of %
const renderValueLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#000"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="11px"
      fontFamily="Roboto, sans-serif"
    >
      ₹{value.toLocaleString()}
    </text>
  );
};

// 🔹 Tooltip formatter → same as slice label
const formatTooltip = (value, name) => {
  return [`₹${value.toLocaleString()}`, name];
};

const EMIResultCard = ({ result }) => {
  if (!result) return null;

  const data = [
    { name: "Principal", value: parseFloat(result.principal) },
    { name: "Interest", value: parseFloat(result.totalInterest) },
  ];

  return (
    <Card
      className="emi-result-card"
      sx={{
        p: 2,
        borderRadius: 3,
        background: "linear-gradient(135deg, #e0f7fa, #e1f5fe)", // light mode gradient
        boxShadow: 3,
        fontFamily: "Roboto, sans-serif",
        "&.dark-mode &": {
          background: "linear-gradient(135deg, #1e1e1e, #2c2c2c)", // dark mode gradient
          color: "#fff",
        },
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          EMI Calculation Result
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" sx={{ mb: 1 }}>
          Monthly EMI: <strong>₹{result.emi}</strong>
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Total Payment: <strong>₹{result.totalPayment}</strong>
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Principal: <strong>₹{result.principal}</strong>
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Interest: <strong>₹{result.totalInterest}</strong>
        </Typography>

        {/* Pie Chart */}
        <Box
          sx={{
            width: "100%",
            height: 250,
            "& .dark-mode &": {
              filter: "invert(1) hue-rotate(180deg)", // auto-invert in dark mode
            },
          }}
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={renderValueLabel} // 🔹 use ₹ labels
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EMIResultCard;
