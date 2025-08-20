// File: /frontend/src/pages/tools/RedirectHandler.jsx
// frontend/src/pages/tools/RedirectHandler.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RedirectHandler() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAndRedirect() {
      try {
        console.log(`[RedirectHandler] Fetching URL for shortCode: ${shortCode}`);
        const response = await axios.get(`http://localhost:5000/api/urls/resolve/${shortCode}`);
        const { url } = response.data;
        console.log(`[RedirectHandler] Redirecting to: ${url}`);
        window.location.href = url; // Use window.location for external redirects
      } catch (err) {
        console.error(`[RedirectHandler] Redirect error:`, err);
        setError('Failed to resolve URL. Please try again.');
      }
    }
    fetchAndRedirect();
  }, [shortCode]);

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Redirecting...</div>;
}

export default RedirectHandler;
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\RedirectHandler.jsx