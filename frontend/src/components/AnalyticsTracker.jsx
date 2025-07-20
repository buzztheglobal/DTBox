// src/components/AnalyticsTracker.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "../services/analytics";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  return null;
}
// src/components/AnalyticsTracker.jsx