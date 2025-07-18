// src/App.js
import React, { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { initGA, logPageView } from "./services/analytics";

import './App.css'; // Import global styles

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import ErrorBoundary from './components/ErrorBoundary';
import AgeCalculatorPage from './pages/tools/AgeCalculatorPage';
import BMICalculatorPage from './pages/tools/BMICalculatorPage';
import ColorPickerPage from './pages/tools/ColorPickerPage';
import DataStorageConverterPage from './pages/tools/DataStorageConverterPage';
import EMICalculatorPage from './pages/tools/EMICalculatorPage';
import PasswordInfoPage from './pages/tools/PasswordInfoPage';
import JSONFormatterPage from "./pages/tools/JSONFormatterPage";
import UnitConverterPage from './pages/tools/UnitConverterPage';
import PregnancyDueDateCalculatorPage from './pages/tools/PregnancyDueDateCalculatorPage';
import SIPCalculatorPage from './pages/tools/SIPCalculatorPage';
import FDCalculatorPage from './pages/tools/FDCalculatorPage';

function App() {
  const location = useLocation();

  console.log("JSONFormatterPage?", JSONFormatterPage);
  // Initialize Google Analytics
  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/age-calculator" element={<AgeCalculatorPage />} />
          <Route path="/bmi-calculator" element={<BMICalculatorPage />} />
          <Route path="/color-picker" element={<ColorPickerPage />} />
          <Route path="/data-storage-converter" element={<DataStorageConverterPage />} />
          <Route path="/emi-calculator" element={<EMICalculatorPage />} />
          <Route path="/password-generator" element={<PasswordInfoPage />} />
          <Route path="/json-formatter" element={<JSONFormatterPage />} />
          <Route path="/unit-converter" element={<UnitConverterPage />} />
          <Route path="/Pregnancy-Due-Date-Calculator" element={<PregnancyDueDateCalculatorPage />} />
           <Route path="/mf-sip-calculator" element={<SIPCalculatorPage />} />
             <Route path="/Fixed-Deposit-Calculator" element={<FDCalculatorPage />} />
          
          {/* Catch-all route for 404 */}
        {/* <Route path="*" element={<div style={{ padding: '2rem' }}>404 - Page Not Found</div>} /> */}

          {/* Add more routes as needed */}
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;

// src/App.js
// This file sets up the main application structure, including routing and analytics initialization.