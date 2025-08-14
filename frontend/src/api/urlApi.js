// src/api/urlApi.js
// File: /frontend/src/api/urlApi.js

const API_BASE = "http://localhost:5000/api/urls";

/**
 * Create a shortened URL.
 * @param {string} originalUrl - The original long URL.
 * @param {string} customCode - Optional custom short code.
 */
export async function createShortUrl(originalUrl, customCode = "") {
  try {
    const res = await fetch(`${API_BASE}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ original_url: originalUrl, custom_code: customCode }),
    });

    if (!res.ok) throw new Error(`Failed to shorten URL: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("[urlApi] createShortUrl error:", error);
    throw error;
  }
}

/**
 * Get the list of all shortened URLs.
 */
export async function getAllUrls() {
  try {
    const res = await fetch(`${API_BASE}/list`);
    if (!res.ok) throw new Error(`Failed to fetch URLs: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("[urlApi] getAllUrls error:", error);
    throw error;
  }
}

/**
 * Get analytics data for a specific short code.
 * @param {string} shortCode - The short code for the URL.
 */
export async function getUrlAnalytics(shortCode) {
  try {
    const res = await fetch(`${API_BASE}/analytics/${shortCode}`);
    if (!res.ok) throw new Error(`Failed to fetch analytics: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("[urlApi] getUrlAnalytics error:", error);
    throw error;
  }
}

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\api\urlApi.js