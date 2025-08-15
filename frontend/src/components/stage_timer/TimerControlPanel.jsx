// frontend/src/components/stage_timer/QRCodePanel.jsx
// frontend/src/components/stage_timer/TimerControlPanel.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Typography, Box } from '@mui/material';
import axios from 'axios';
import { formatTime } from './TimerUtils';

function TimerControlPanel() {
  const [timers, setTimers] = useState([{ id: 1, duration: 300, timeLeft: 300, isRunning: false }]);
  const [message, setMessage] = useState('');
  const [roomId] = useState('room1'); // Mock roomId
  const [apiKey] = useState('mock-api-key-123'); // Mock apiKey

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((timer) =>
          timer.isRunning && timer.timeLeft > 0
            ? { ...timer, timeLeft: timer.timeLeft - 1 }
            : timer
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTimer = () => {
    const newId = timers.length + 1;
    setTimers([...timers, { id: newId, duration: 300, timeLeft: 300, isRunning: false }]);
  };

  const startTimer = (id) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, isRunning: true } : timer
      )
    );
  };

  const pauseTimer = (id) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false } : timer
      )
    );
  };

  const resetTimer = (id) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, timeLeft: timer.duration, isRunning: false } : timer
      )
    );
  };

  const updateDuration = (id, value) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, duration: value, timeLeft: value } : timer
      )
    );
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }

    try {
      console.log(`[TimerControlPanel] Sending message for roomId: ${roomId}, message: ${message}, apiKey: ${apiKey}`);
      const response = await axios.post('http://localhost:5000/api/timers/send-message', {
        roomId,
        message,
        apiKey,
      });
      console.log(`[TimerControlPanel] Message sent: ${JSON.stringify(response.data)}`);
      setMessage('');
      alert('Message sent successfully!');
    } catch (err) {
      console.error(`[TimerControlPanel] Error sending message:`, err);
      alert('Failed to send message: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <Box>
      <Typography variant="h6" className="card-title">Timer Controls</Typography>
      {timers.map((timer) => (
        <div key={timer.id} className="mb-3">
          <Typography className="card-text">Timer {timer.id}: {formatTime(timer.timeLeft)}</Typography>
          <Form.Group className="mb-2">
            <Form.Label>Duration (seconds)</Form.Label>
            <FormControl
              type="number"
              value={timer.duration}
              onChange={(e) => updateDuration(timer.id, parseInt(e.target.value))}
              className="form-control"
            />
          </Form.Group>
          <Button className="glassy-button me-2" onClick={() => startTimer(timer.id)}>
            Start
          </Button>
          <Button className="glassy-button me-2" onClick={() => pauseTimer(timer.id)}>
            Pause
          </Button>
          <Button className="glassy-button" onClick={() => resetTimer(timer.id)}>
            Reset
          </Button>
        </div>
      ))}
      <Button className="glassy-button mb-3" onClick={addTimer}>
        Add New Timer
      </Button>
      <Form.Group>
        <Form.Label>Send Message to Presenter</Form.Label>
        <InputGroup>
          <FormControl
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            className="form-control"
          />
          <Button className="glassy-button" onClick={sendMessage}>
            Send
          </Button>
        </InputGroup>
      </Form.Group>
    </Box>
  );
}

export default TimerControlPanel;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\stage_timer\TimerControlPanel.jsx