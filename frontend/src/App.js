// File: /frontend/src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useContext } from "react";

import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthContext } from "./context/AuthContext";
import firebaseConfig from "./firebaseConfig";

import BMICalculatorPage from "./pages/tools/BMICalculatorPage";
import ColorPickerPage from "./pages/tools/ColorPickerPage";
import DataStorageConverterPage from "./pages/tools/DataStorageConverterPage";
import EMICalculatorPage from "./pages/tools/EMICalculatorPage";
import PasswordInfoPage from "./pages/tools/PasswordInfoPage";
import UnitConverterPage from "./pages/tools/UnitConverterPage";
import PregnancyDueDateCalculatorPage from "./pages/tools/PregnancyDueDateCalculatorPage";
import SIPCalculatorPage from "./pages/tools/SIPCalculatorPage";
import FDCalculatorPage from "./pages/tools/FDCalculatorPage";
import RDCalculatorPage from "./pages/tools/RDCalculatorPage";
import JSONFormatterPage from "./pages/tools/JSONFormatterPage";
import DateCalculatorPage from "./pages/tools/DateCalculatorPage";
import AnalyticsTracker from "./components/AnalyticsTracker";
import QRCodeGeneratorPage from "./pages/tools/QRCodeGeneratorPage";
import WebDiagnosticsPage from "./pages/tools/WebDiagnosticsPage";
import TimeZoneConverterPage from "./pages/tools/TimeZoneConverterPage";
import FavoritesViewer from "./pages/tools/FavoritesViewer";

// ✅ URL Shortener imports
import UrlShortenerPage from "./pages/tools/UrlShortenerPage";
import RedirectHandler from "./pages/tools/RedirectHandler";
import UrlList from "./components/url_shortener/UrlList";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <ErrorBoundary>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Tools */}
          <Route path="/bmi-calculator" element={<BMICalculatorPage />} />
          <Route path="/color-picker" element={<ColorPickerPage />} />
          <Route path="/data-storage-converter" element={<DataStorageConverterPage />} />
          <Route path="/emi-calculator" element={<EMICalculatorPage />} />
          <Route path="/password-generator" element={<PasswordInfoPage />} />
          <Route path="/unit-converter" element={<UnitConverterPage />} />
          <Route path="/Pregnancy-Due-Date-Calculator" element={<PregnancyDueDateCalculatorPage />} />
          <Route path="/mf-sip-calculator" element={<SIPCalculatorPage />} />
          <Route path="/Fixed-Deposit-Calculator" element={<FDCalculatorPage />} />
          <Route path="/RD-Calculator" element={<RDCalculatorPage />} />
          <Route path="/date-calculator" element={<DateCalculatorPage />} />
          <Route path="/qr-code-generator" element={<QRCodeGeneratorPage />} />
          <Route path="/Web-Diagnostics" element={<WebDiagnosticsPage />} />

          {/* Removed SurveyBuilderPage, AdminDashboardPage, UpdateFormPage */}

          {/* Time Zone Converter */}
          <Route path="/time-zone-converter" element={<TimeZoneConverterPage />} />
          <Route path="/tools/favorites" element={<FavoritesViewer />} />

          {/* JSON Formatter */}
          <Route path="/json-formatter" element={<JSONFormatterPage />} />

          {/* URL Shortener */}
          <Route path="/url-shortener" element={<UrlShortenerPage />} />
          <Route path="/url-list" element={<UrlList />} />
          <Route path="/:shortCode" element={<RedirectHandler />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
