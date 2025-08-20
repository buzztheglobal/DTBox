import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import "../../App.css"; // ✅ Correct import path

export default function StageTimerHome() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleGenerateRoom = () => {
    const newRoom = Math.random().toString(36).substring(2, 10).toUpperCase();
    navigate(`/stage-timer/controller/${newRoom}`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/stage-timer/viewer/${roomId}`);
    }
  };

  return (
    <Container maxWidth="sm" className="tool-page">
      <Box className="tool-box">
        <Typography variant="h4" gutterBottom>
          🎤 Stage Timer
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGenerateRoom}
          sx={{ mb: 2 }}
        >
          Create New Room
        </Button>

        <Typography variant="h6">Or Join Existing Room</Typography>
        <TextField
          fullWidth
          label="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          sx={{ my:2 }}
        />
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleJoinRoom}
        >
          Join Room
        </Button>
      </Box>
    </Container>
  );
}
