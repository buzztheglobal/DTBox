// src/App.js
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { initGA, logPageView } from "./services/analytics";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import ErrorBoundary from './components/ErrorBoundary';
import AgeCalculatorPage from './pages/tools/AgeCalculatorPage';
import BMI_Indicator from './pages/tools/BMI_Indicator';
import ColorPickerPage from './pages/tools/ColorPickerPage';
import DataStorageConverterPage from './pages/tools/DataStorageConverterPage';
import EMICalculatorPage from './pages/tools/EMICalculatorPage';
import PasswordInfoPage from './pages/tools/PasswordInfoPage';

function App() {
  const location = useLocation();

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
          <Route path="/bmi-calculator" element={<BMI_Indicator />} />
          <Route path="/color-picker" element={<ColorPickerPage />} />
          <Route path="/data-storage-converter" element={<DataStorageConverterPage />} />
          <Route path="/emi-calculator" element={<EMICalculatorPage />} />
          <Route path="/password-generator" element={<PasswordInfoPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;

// src/App.js
// This file sets up the main application structure, including routing and analytics initialization.