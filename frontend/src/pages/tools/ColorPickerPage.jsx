// src/pages/tools/ColorPickerPage.jsx
import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Input
} from "@mui/material";
import "../../components/color_picker/color_picker.css";
import ColorDetails from "../../components/color_picker/ColorDetails"; // ✅ No curly braces


const ColorPickerPage = () => {
  const canvasRef = useRef(null);
  const [imageURL, setImageURL] = useState(null);
  const [hoverColor, setHoverColor] = useState(null);
  const [pickedColor, setPickedColor] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageURL(url);
    setPickedColor(null);
    setHoverColor(null);
  };

  const drawImage = (img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };

  const getColorAtPosition = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    const data = ctx.getImageData(x, y, 1, 1).data;
    return {
      r: data[0],
      g: data[1],
      b: data[2],
      hex: `#${[data[0], data[1], data[2]].map((v) => v.toString(16).padStart(2, "0")).join("")}`
    };
  };

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const color = getColorAtPosition(e);
    setHoverColor(color);
  };

  const handleCanvasClick = (e) => {
    const color = getColorAtPosition(e);
    setPickedColor(color);
  };

  return (
    <Box className="color-picker-container">
      <Typography variant="h4" gutterBottom>
        🎯 Pick a Color from Image
      </Typography>

      <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
        <Input
          type="file"
          onChange={handleImageUpload}
          inputProps={{ accept: "image/*" }}
        />
        <Button variant="outlined" onClick={() => setPickedColor(null)}>
          Reset
        </Button>
      </Stack>

      {imageURL && (
        <>
          <canvas
            ref={canvasRef}
            className="color-picker-canvas"
            onMouseMove={handleMouseMove}
            onClick={handleCanvasClick}
          />
          <img
            src={imageURL}
            alt="Uploaded"
            onLoad={(e) => drawImage(e.target)}
            style={{ display: "none" }}
          />
        </>
      )}

      <ColorDetails
        hoverColor={hoverColor}
        pickedColor={pickedColor}
      />
    </Box>
  );
};

export default ColorPickerPage;
