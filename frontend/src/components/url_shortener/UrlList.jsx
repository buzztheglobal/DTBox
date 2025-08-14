// src/components/url_shortener/UrlList.jsx
// File: /frontend/src/components/url_shortener/UrlList.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  CircularProgress,
  Link
} from "@mui/material";
import { getAllUrls } from "../../api/urlApi";
import { cardBoxStyle } from "../../styles/globalStyles";

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

  if (loading) {
    return (
      <Paper sx={{ ...cardBoxStyle, p: 2, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading URLs...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ ...cardBoxStyle, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Shortened URLs
      </Typography>

      {urls.length === 0 ? (
        <Typography variant="body2">No URLs found.</Typography>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Short Code</strong></TableCell>
                <TableCell><strong>Original URL</strong></TableCell>
                <TableCell><strong>Created At</strong></TableCell>
                <TableCell><strong>Clicks</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => (
                <TableRow key={url.id}>
                  <TableCell>
                    <Link
                      href={`/${url.short_code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.short_code}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={url.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.original_url}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {new Date(url.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{url.clicks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default UrlList;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\url_shortener\UrlList.jsx