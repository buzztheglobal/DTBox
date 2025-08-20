// src/pages/tools/StageTimerController.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";

export default function StageTimerController() {
  const { roomId } = useParams();
  const socket = useSocket();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState("");

  // ✅ Join room + subscribe to messages
  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", roomId);

    socket.on("presenterMessages", (msgs) => setMessages(msgs));
    socket.on("presenterMessage", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    return () => {
      socket.off("presenterMessages");
      socket.off("presenterMessage");
    };
  }, [socket, roomId]);

  const sendMessage = () => {
    if (!msgInput.trim()) return;
    socket.emit(
      "sendPresenterMessage",
      {
        roomId,
        message: msgInput,
        sender: user?.displayName || "Presenter",
      },
      (ack) => {
        if (ack.status === "ok") setMsgInput("");
      }
    );
  };

  // ✅ Group messages by sender
  const grouped = messages.reduce((acc, msg) => {
    const lastGroup = acc[acc.length - 1];
    if (lastGroup && lastGroup.sender === msg.sender) {
      lastGroup.items.push(msg);
    } else {
      acc.push({ sender: msg.sender, items: [msg] });
    }
    return acc;
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stage Timer Controller (Room {roomId})
      </Typography>

      {/* Message input */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <TextField
          fullWidth
          label="Type a message..."
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>

      {/* Messages grouped by sender */}
      <List sx={{ mt: 3 }}>
        {grouped.map((group, idx) => (
          <Box key={idx} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar>{group.sender?.[0] || "P"}</Avatar>
              <Typography sx={{ ml: 1, fontWeight: "bold" }}>
                {group.sender}
              </Typography>
            </Box>
            {group.items.map((m) => (
              <ListItem key={m.id || m.timestamp} sx={{ pl: 6 }}>
                <ListItemText
                  primary={m.message}
                  secondary={new Date(
                    m.created_at || m.timestamp
                  ).toLocaleTimeString()}
                />
              </ListItem>
            ))}
            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </List>
    </Box>
  );
}
