// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeContextProvider from "./ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Define a base MUI theme (light mode by default)
const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeContextProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ThemeContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
