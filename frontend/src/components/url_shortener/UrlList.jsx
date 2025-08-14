// src/components/url_shortener/UrlList.jsx
// File: /frontend/src/components/url_shortener/UrlList.jsx
import React, { useEffect, useState } from "react";
import { getAllUrls } from "../../api/urlApi";

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUrls() {
      try {
        const data = await getAllUrls();
        setUrls(data);
      } catch (err) {
        console.error("[UrlList] Error fetching URLs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUrls();
  }, []);

  if (loading) return <p>Loading URLs...</p>;

  return (
    <div className="url-list">
      <h3>Shortened URLs</h3>
      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Short Code</th>
              <th>Original URL</th>
              <th>Created At</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.id}>
                <td>
                  <a
                    href={`/${url.short_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.short_code}
                  </a>
                </td>
                <td>
                  <a href={url.original_url} target="_blank" rel="noopener noreferrer">
                    {url.original_url}
                  </a>
                </td>
                <td>{new Date(url.created_at).toLocaleString()}</td>
                <td>{url.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UrlList;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\url_shortener\UrlList.jsx