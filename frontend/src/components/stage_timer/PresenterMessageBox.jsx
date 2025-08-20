// frontend/src/components/stage_timer/PresenterMessageBox.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useSocket } from "../../context/SocketContext";
import { useRoomSubscription } from "../../hooks/useRoomSubscription";

export default function PresenterMessageBox({ roomId }) {
  const socket = useSocket();
  const [message, setMessage] = useState("");

  // Auto-leave room when unmounted
  useRoomSubscription(roomId, null, null, { leaveOnUnmount: true });

  const send = () => {
    const msg = message.trim();
    if (!msg || !socket) return;
    socket.emit("sendPresenterMessage", { roomId, message: msg }, (ack) => {
      if (ack?.status === "ok") {
        console.log("✅ Message sent:", msg);
        setMessage("");
      } else {
        console.warn("⚠️ Failed to send message", ack);
      }
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="Send message to ticker"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" onClick={send}>
          Send
        </Button>
      </Stack>
    </Box>
  );
}

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\stage_timer\PresenterMessageBox.jsx