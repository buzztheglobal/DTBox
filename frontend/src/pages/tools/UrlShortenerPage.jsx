// src/pages/tools/UrlShortenerPage.jsx
// File: /frontend/src/pages/tools/UrlShortenerPage.jsx
import React from "react";
import ShortenUrlForm from "../../components/url_shortener/ShortenUrlForm";
import UrlList from "../../components/url_shortener/UrlList";
import UrlAnalytics from "../../components/url_shortener/UrlAnalytics";

const UrlShortenerPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🔗 URL Shortener</h2>
      <p>
        Create short, shareable links and track click analytics.
      </p>

      {/* Shorten URL Form */}
      <section style={{ marginBottom: "40px" }}>
        <h3>Shorten a New URL</h3>
        <ShortenUrlForm />
      </section>

      {/* URL List */}
      <section style={{ marginBottom: "40px" }}>
        <UrlList />
      </section>

      {/* URL Analytics */}
      <section>
        <UrlAnalytics />
      </section>
    </div>
  );
};

export default UrlShortenerPage;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\pages\tools\UrlShortenerPage.jsx