// src/components/ToolCard.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ToolCard = ({ title, description, children }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default ToolCard;
