// Simple API helper for URL Shortener
const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

export const createShortUrl = async (originalUrl) => {
  const res = await fetch(`${API_BASE}/urls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalUrl }),
  });
  if (!res.ok) throw new Error("Failed to create short URL");
  return res.json();
};

export const getAnalytics = async (shortCode) => {
  const res = await fetch(`${API_BASE}/urls/${shortCode}/analytics`);
  if (!res.ok) throw new Error("Failed to fetch analytics");
  return res.json();
};
