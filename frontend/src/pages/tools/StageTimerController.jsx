// frontend/src/pages/tools/StageTimerController.jsx
// frontend/src/pages/tools/StageTimerController.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import '../../App.css';

function StageTimerController() {
  const { roomId } = useParams();
  const location = useLocation();
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Extract apiKey from query string
    const params = new URLSearchParams(location.search);
    const key = params.get('apiKey');
    setApiKey(key || '');

    // Mock authentication
    if (key === 'mock-api-key-123') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // Fetch messages for roomId
    async function fetchMessages() {
      try {
        console.log(`[StageTimerController] Fetching messages for roomId: ${roomId}, apiKey: ${key}`);
        const response = await axios.get(`http://localhost:5000/api/timers/messages/${roomId}`, {
          params: { apiKey: key }
        });
        setMessages(response.data);
        console.log(`[StageTimerController] Messages fetched: ${JSON.stringify(response.data)}`);
      } catch (err) {
        console.error(`[StageTimerController] Error fetching messages:`, err);
      }
    }
    if (key === 'mock-api-key-123') {
      fetchMessages();
    }
  }, [location.search, roomId]);

  if (!isAuthenticated) {
    return (
      <Container className="calculator-container">
        <Row>
          <Col>
            <div className="tool-card">
              <Typography variant="h4" className="card-title">
                Unauthorized
              </Typography>
              <Typography className="card-text">
                Invalid or missing API key. Please scan a valid QR code.
              </Typography>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="calculator-container">
      <Row>
        <Col>
          <div className="tool-card">
            <Typography variant="h4" className="card-title">
              Stage Timer Controller
            </Typography>
            <Typography className="card-text">
              Controlling timers for Room: {roomId}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography className="card-text">
                Timer controls for {roomId} will be displayed here.
              </Typography>
              <Typography className="card-text">
                API Key: {apiKey} (Authenticated)
              </Typography>
              <Typography variant="h6" className="card-text" sx={{ mt: 2 }}>
                Messages
              </Typography>
              <List>
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <ListItem key={msg.id}>
                      <ListItemText
                        primary={msg.message}
                        secondary={new Date(msg.created_at).toLocaleString()}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography className="card-text">No messages yet.</Typography>
                )}
              </List>
            </Box>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default StageTimerController;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\StageTimerController.jsx