import React from "react";
import { Card, Typography, Box } from "@mui/material";

const ColorBox = ({ color }) => {
  return (
    <Card sx={{ mt: 4, p: 2, maxWidth: 420, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Picked Color:
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: 80,
          backgroundColor: color.hex,
          borderRadius: 2,
        }}
      />
      <Typography sx={{ mt: 1 }}>HEX: <strong>{color.hex}</strong></Typography>
      <Typography>RGB: <strong>{`rgb(${color.r}, ${color.g}, ${color.b})`}</strong></Typography>
    </Card>
  );
};

export default ColorBox;
