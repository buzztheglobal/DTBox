// src/App.js
import { Routes, Route, useParams, Navigate } from "react-router-dom"; // ✅ includes Navigate
import CssBaseline from "@mui/material/CssBaseline";
import React, { useContext } from "react"; // 👈 add useContext here

import './App.css';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import ErrorBoundary from './components/ErrorBoundary';
import { AuthContext } from './context/AuthContext';
import firebaseConfig from './firebaseConfig'; // ✅ Import Firebase config
import BMICalculatorPage from './pages/tools/BMICalculatorPage';
import ColorPickerPage from './pages/tools/ColorPickerPage';
import DataStorageConverterPage from './pages/tools/DataStorageConverterPage';
import EMICalculatorPage from './pages/tools/EMICalculatorPage';
import PasswordInfoPage from './pages/tools/PasswordInfoPage';
// import JSONFormatterPage from "./pages/tools/JSONFormatterPage";
import UnitConverterPage from './pages/tools/UnitConverterPage';
import PregnancyDueDateCalculatorPage from './pages/tools/PregnancyDueDateCalculatorPage';
import SIPCalculatorPage from './pages/tools/SIPCalculatorPage';
import FDCalculatorPage from './pages/tools/FDCalculatorPage';
import RDCalculatorPage from "./pages/tools/RDCalculatorPage";
//
import JSONFormatterPage from './pages/tools/JSONFormatterPage';
//
import DateCalculatorPage from './pages/tools/DateCalculatorPage';
import AnalyticsTracker from './components/AnalyticsTracker'; // ✅
import QRCodeGeneratorPage from './pages/tools/QRCodeGeneratorPage';
//
import WebDiagnosticsPage from './pages/tools/WebDiagnosticsPage';
import TimerWorldClockPage from './pages/tools/TimerWorldClockPage'; // ✅
//
import SurveyFeedbackToolsPage from './pages/tools/SurveyFeedbackToolsPage';
import SurveyBuilderPage from './components/survey_feedback/admin/SurveyBuilderPage';
import AdminDashboardPage from './components/survey_feedback/admin/AdminDashboardPage';
import FormViewPage from './components/survey_feedback/FormViewPage';
import UpdateFormPage from './components/survey_feedback/admin/UpdateFormPage';

import PollGalleryPage from './pages/tools/PollGalleryPage';
import PollSummaryPage from './components/survey_feedback/PollSummaryPage';
import PollViewPage from './pages/tools/PollViewPage';
//
import TimeZoneConverterPage from './pages/tools/TimeZoneConverterPage';
import FavoritesViewer from './pages/tools/FavoritesViewer';

const PollSummaryPageWrapper = () => {
  const { id } = useParams();
  return <PollSummaryPage pollId={id} />;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <CssBaseline />
      <Navbar />
      <ErrorBoundary>
        <AnalyticsTracker /> {/* ✅ Tracks page views */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/*  */}
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
          {/* <Route path="/json-to-csv" element={<JsonToCsvPage />} /> */}
          <Route path="/date-calculator" element={<DateCalculatorPage />} />
          <Route path="/qr-code-generator" element={<QRCodeGeneratorPage />} />
          <Route path="/Web-Diagnostics" element={<WebDiagnosticsPage />} />
          <Route path="/countdown-timer-world-clock" element={<TimerWorldClockPage />} />
          <Route path="/Survey-Feedback-Tools" element={<SurveyFeedbackToolsPage />} />
          {/* Admin Routes (requires login) */}
          <Route path="/admin/survey-builder" element={user ? <SurveyBuilderPage /> : <div>Login Required</div>} />
          {/* <Route path="/admin/dashboard" element={user ? <AdminDashboardPage /> : <div>Login Required</div>} /> */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><AdminDashboardPage /></ProtectedRoute>
          } />
          {/* Public Tools */}
          <Route path="/Survey-Feedback-Tools" element={<SurveyFeedbackToolsPage />} />
          <Route path="/form/:formId" element={<FormViewPage />} />
          <Route path="/admin/update-form/:id" element={user ? <UpdateFormPage /> : <div>Login Required</div>} />
          <Route path="/form/:pollId" element={<PollViewPage />} />
          <Route path="/poll-gallery" element={<PollGalleryPage />} />
          <Route path="/admin/poll/:id/summary" element={<PollSummaryPageWrapper />} />
          {/* Admin Routes */}
          {/* <Route path="*" element={<div>404 - Page Not Found</div>} /> */}
          {/* time-zone-converter */}
          <Route path="/time-zone-converter" element={<TimeZoneConverterPage />} />
          <Route path="/tools/favorites" element={<FavoritesViewer />} />
          {/* json-formatter */}
          <Route path="/json-formatter" element={<JSONFormatterPage />} />

        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
