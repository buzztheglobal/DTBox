// frontend/src/components/stage_timer/QRCodePanel.jsx
import React, { useState } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import { Typography, Box } from '@mui/material';
import QRCode from 'qrcode.react';
import { generateControllerUrl } from './TimerUtils';

function QRCodePanel() {
  const [roomId, setRoomId] = useState('room1'); // Mock room ID
  const controllerUrl = generateControllerUrl(roomId);

  return (
    <Box>
      <Typography variant="h6" className="card-title">QR Code Access</Typography>
      <Typography className="card-text mb-3">
        Scan the QR code to access the timer controller or viewer page.
      </Typography>
      <Form.Group className="mb-3">
        <Form.Label>Room ID</Form.Label>
        <FormControl
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
          className="form-control"
        />
      </Form.Group>
      <Box className="text-center mb-3">
        <Typography className="card-text">Controller QR Code</Typography>
        <QRCode value={controllerUrl} size={200} />
      </Box>
      <Button className="glassy-button" onClick={() => alert('Download QR code (placeholder)')}>
        Download QR Code
      </Button>
    </Box>
  );
}

export default QRCodePanel;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\stage_timer\TimerControlPanel.jsx