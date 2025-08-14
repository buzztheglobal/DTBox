// File: /frontend/src/pages/tools/RedirectHandler.jsx
// File: /src/pages/tools/RedirectHandler.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Container, Typography, Box, Button } from "@mui/material";

const RedirectHandler = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/urls/resolve/${shortCode}`);
        if (res.data?.original_url) {
          setStatus("success");
          window.location.href = res.data.original_url; // Redirect to original URL
        } else {
          setStatus("error");
          setMessage("Short URL not found.");
        }
      } catch (err) {
        console.error("Redirect error:", err);
        setStatus("error");
        setMessage("Failed to redirect. The link may be invalid or expired.");
      }
    };

    fetchAndRedirect();
  }, [shortCode]);

  if (status === "loading") {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Redirecting...
        </Typography>
      </Container>
    );
  }

  if (status === "error") {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          {message}
        </Typography>
        <Box mt={2}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </Box>
      </Container>
    );
  }

  return null; // Will never reach here since redirect happens
};

export default RedirectHandler;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\RedirectHandler.jsx