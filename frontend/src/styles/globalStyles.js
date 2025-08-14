// File: frontend/src/styles/globalStyles.js

// 🎨 Color Constants & Gradients
const primaryGradient = "linear-gradient(135deg, #780206, #061161)";
const lightCardGradient = "linear-gradient(135deg, #f5c7c7 0%, #c7c9f5 100%)";
const titleTextGradient = "linear-gradient(to right, #95D2B3, #D9D9D9)";
const searchBgColor = "#F1F8E8";

// 🔹 Navigation Chip Style
export const navChipStyle = (selected, mode = "light") => ({
  px: 1.5,
  py: 1,
  fontSize: "0.9rem",
  fontWeight: 500,
  borderRadius: "16px",
  cursor: "pointer",
  color: selected ? "#fff" : mode === "dark" ? "#ccc" : "#000",
  background: selected
    ? primaryGradient
    : mode === "dark"
    ? "#2e2e2e"
    : "#eee",
  '&:hover': {
    opacity: 0.85,
    boxShadow: 2,
  },
});

// 🔹 Page Container Padding
export const pageContainerStyle = {
  pt: 4,
  pb: 6,
};

// 🔹 Page Title with Gradient Text
export const pageTitleStyle = {
  fontWeight: "bold",
  mb: 2,
  background: titleTextGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

// 🔹 Search Field Styling
export const searchFieldStyle = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: searchBgColor,
  },
};

// 🔹 Background Based on Theme
export const gradientBackground = (mode) =>
  mode === "light"
    ? "linear-gradient(135deg, rgb(255, 255, 196) 0%, rgb(255, 97, 100) 50%, rgb(176, 0, 18) 100%)"
    : "linear-gradient(135deg, #FF6363 0%, #FF8282 100%)";

// 🔹 Card Style
// export const cardBoxStyle = {
//   p: 3,
//   borderRadius: 3,
//   boxShadow: 3,
//   height: "100%",
//   background: lightCardGradient,
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     color: "#111",
//   },
// };

// 🔹 Tool Button Style
export const toolButtonStyle = {
  borderRadius: 2,
  backdropFilter: "blur(6px)",
  background: primaryGradient,
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    opacity: 0.9,
    transform: "scale(1.02)",
  },
};

// 🔹 General Chip Style
export const chipStyle = {
  m: 0.5,
  fontSize: "0.85rem",
};

// 🔹 Form Container
export const formBoxStyle = {
  p: 2,
  border: '1px solid #ccc',
  borderRadius: 2,
  backgroundColor: '#f9f9f9',
  mb: 3,
};

// 🔹 Form Field Style
export const formFieldStyle = {
  mb: 2,
};
 

// Update existing exports
export const cardBoxStyle = {
  p: 3,
  borderRadius: 3,
  boxShadow: 3,
  height: "100%",
  background: "linear-gradient(135deg, #b2dfdb 0%, #e0f2f1 100%)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    color: "#111",
  },
};

export const resultBoxStyle = {
  p: 2,
  border: "2px dashed #00897b",
  borderRadius: 8,
  backgroundColor: "#e0f2f1",
  marginTop: "1.5rem",
  fontWeight: 500,
};

// Add function to calculate Maturity Date
export const getMaturityDate = (tenureMonths) => {
  const today = new Date("2025-07-18T14:09:00Z"); // Current date and time
  const maturity = new Date(today);
  maturity.setMonth(maturity.getMonth() + parseInt(tenureMonths));
  return maturity.toLocaleDateString("en-GB"); // e.g., 18/07/2026
};

// src/styles/globalStyles.js
export const globalStyles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
  },
  card: {
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  button: {
    textTransform: "none",
    fontWeight: "600",
  },
};
