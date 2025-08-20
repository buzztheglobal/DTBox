import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useSocket } from "../../context/SocketContext";

export default function SocketDebugPanel() {
  const socket = useSocket();
  const [status, setStatus] = useState(socket.connected ? "connected" : "disconnected");
  const [lastEvent, setLastEvent] = useState("");

  useEffect(() => {
    const handleConnect = () => setStatus("connected");
    const handleDisconnect = () => setStatus("disconnected");

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    // Example: capture all incoming events (debug only)
    const originalOnevent = socket.onevent;
    socket.onevent = function (packet) {
      setLastEvent(JSON.stringify(packet.data));
      originalOnevent.call(this, packet);
    };

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.onevent = originalOnevent;
    };
  }, [socket]);

  return (
    <Box
      sx={{
        p: 2,
        m: 2,
        border: "1px solid #444",
        borderRadius: 2,
        bgcolor: "#111",
        color: "#fff",
        fontSize: "0.9rem",
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        🔌 Socket Debug Panel
      </Typography>
      <Typography>Status: {status}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Last Event: {lastEvent || "None"}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => socket.connect()}
          disabled={socket.connected}
        >
          Connect
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => socket.disconnect()}
          disabled={!socket.connected}
        >
          Disconnect
        </Button>
      </Stack>
    </Box>
  );
}
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\debug\SocketDebugPanel.jsx