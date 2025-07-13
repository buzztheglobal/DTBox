// src/components/color_picker/ColorDetails.jsx
import React from "react";
import { Typography, Card, Box, Stack } from "@mui/material";

const ColorDetails = ({ hoverColor, pickedColor }) => {
  return (
    <Stack spacing={2} mt={4}>
      {hoverColor && (
        <Card sx={{ p: 2, backgroundColor: "#fafafa" }}>
          <Typography variant="h6">🎨 Hover Color</Typography>
          <Box
            sx={{
              backgroundColor: hoverColor.hex,
              height: 60,
              width: "100%",
              borderRadius: 2,
              border: "1px solid #ccc",
              mt: 1
            }}
          />
          <Typography>HEX: <b>{hoverColor.hex}</b></Typography>
          <Typography>RGB: <b>{`rgb(${hoverColor.r}, ${hoverColor.g}, ${hoverColor.b})`}</b></Typography>
        </Card>
      )}

      {pickedColor && (
        <Card sx={{ p: 2, backgroundColor: "#e8f5e9" }}>
          <Typography variant="h6">✅ Picked Color</Typography>
          <Box
            sx={{
              backgroundColor: pickedColor.hex,
              height: 60,
              width: "100%",
              borderRadius: 2,
              border: "1px solid #ccc",
              mt: 1
            }}
          />
          <Typography>HEX: <b>{pickedColor.hex}</b></Typography>
          <Typography>RGB: <b>{`rgb(${pickedColor.r}, ${pickedColor.g}, ${pickedColor.b})`}</b></Typography>
        </Card>
      )}
    </Stack>
  );
};

export default ColorDetails; // ✅ Default export
