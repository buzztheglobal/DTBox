// src/components/url_shortener/ShortenUrlForm.jsx
// File: /frontend/src/components/url_shortener/ShortenUrlForm.jsx
import React, { useState } from "react";
import { createShortUrl } from "../../api/urlApi";

const ShortenUrlForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!originalUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const data = await createShortUrl(originalUrl, customCode);
      setShortUrl(`${window.location.origin}/${data.short_code}`);
      setOriginalUrl("");
      setCustomCode("");
    } catch (err) {
      console.error("[ShortenUrlForm] Error:", err);
      setError(err.message || "Failed to shorten URL");
    }
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <form onSubmit={handleShorten}>
        <div style={{ marginBottom: "10px" }}>
          <label>Original URL:</label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com"
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Custom Short Code (optional):</label>
          <input
            type="text"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="my-custom-link"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Shorten URL
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {shortUrl && (
        <div style={{ marginTop: "10px" }}>
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(shortUrl)}
            style={{ padding: "6px 12px", marginTop: "5px" }}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default ShortenUrlForm;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\url_shortener\ShortenUrlForm.jsx