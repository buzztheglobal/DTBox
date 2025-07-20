// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeContextProvider from "./ThemeContext";
import { BrowserRouter } from "react-router-dom";
import './App.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
       <BrowserRouter> {/* ✅ Wrap App with Router */}
      <App />
    </BrowserRouter>
    </ThemeContextProvider>
  </React.StrictMode>
);
