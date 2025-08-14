// src/components/url_shortener/UrlAnalytics.jsx
// File: /frontend/src/components/url_shortener/UrlAnalytics.jsx
import React, { useState } from "react";
import { getUrlAnalytics } from "../../api/urlApi";

const UrlAnalytics = () => {
  const [shortCode, setShortCode] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchAnalytics = async () => {
    if (!shortCode.trim()) return;
    setLoading(true);
    try {
      const data = await getUrlAnalytics(shortCode.trim());
      setAnalytics(data);
    } catch (err) {
      console.error("[UrlAnalytics] Error fetching analytics:", err);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="url-analytics">
      <h3>URL Analytics</h3>
      <input
        type="text"
        placeholder="Enter Short Code"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
      />
      <button onClick={handleFetchAnalytics} disabled={loading}>
        {loading ? "Loading..." : "Get Analytics"}
      </button>

      {analytics && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Short Code:</strong> {analytics.short_code}</p>
          <p><strong>Original URL:</strong> {analytics.original_url}</p>
          <p><strong>Clicks:</strong> {analytics.clicks}</p>
          <p><strong>Created At:</strong> {new Date(analytics.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default UrlAnalytics;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\url_shortener\UrlAnalytics.jsx