// src/index.js
// C:\Users\gupta\Documents\DailyToolbox\frontend\src\index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeContextProvider from "./ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <BrowserRouter>
        <AuthProvider>
          <SocketProvider>  {/* ✅ Shared socket context for all pages */}
            <App />
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  </React.StrictMode>
);
