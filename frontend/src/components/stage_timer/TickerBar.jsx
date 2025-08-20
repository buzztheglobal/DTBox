// frontend/src/components/stage_timer/TickerBar.jsx
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRoomSubscription } from "../../hooks/useRoomSubscription";

export default function TickerBar({ roomId }) {
  const [message, setMessage] = useState("");

  useRoomSubscription(roomId, "presenterMessage", (msg) => {
    console.log("📰 Received presenterMessage:", msg);
    setMessage(msg || "");
  });

  const isLong = message.length > 40;

  return (
    <Box
      sx={{
        bgcolor: "#111",
        color: "#fff",
        height: "50px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        borderTop: "2px solid #333",
        position: "relative",
      }}
    >
      {isLong ? (
        <Box
          sx={{
            whiteSpace: "nowrap",
            display: "inline-block",
            animation: "ticker-scroll 15s linear infinite",
            "@keyframes ticker-scroll": {
              "0%": { transform: "translateX(100%)" },
              "100%": { transform: "translateX(-100%)" },
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ px: 2, display: "inline-block", fontWeight: "bold" }}
          >
            {message}
          </Typography>
        </Box>
      ) : (
        <Typography
          variant="h6"
          sx={{
            px: 2,
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\stage_timer\TickerBar.jsx