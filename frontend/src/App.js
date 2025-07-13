// src/App.js
import React, { useEffect } from "react";
import { Routes, Route, useLocation, BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { initGA, logPageView } from "./services/analytics";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AgeCalculatorPage from './pages/tools/AgeCalculatorPage';
import BMI_Indicator from './pages/tools/BMI_Indicator';
import ColorPickerPage from './pages/tools/ColorPickerPage';
 
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/age-calculator" element={<AgeCalculatorPage />} />
        <Route path="/bmi-calculator" element={<BMI_Indicator />} />
        <Route path="/color-picker" element={<ColorPickerPage />} />

      </Routes>
    </>
  );
}

export default App;
