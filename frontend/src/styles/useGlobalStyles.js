// File: src/styles/useGlobalStyles.js
import { useMemo } from "react";

export default function useGlobalStyles(mode = "light") {
  const styles = useMemo(() => {
    // 🎨 Gradients & Colors
    const primaryGradient = "linear-gradient(135deg, #780206, #061161)";
    const lightCardGradient = "linear-gradient(135deg, #f5c7c7 0%, #c7c9f5 100%)";
    const titleTextGradient = "linear-gradient(to right, #95D2B3, #D9D9D9)";
    const searchBgColor = "#F1F8E8";

    return {
      // 🔹 Navigation Chip Style
      navChipStyle: (selected) => ({
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
        "&:hover": {
          opacity: 0.85,
          boxShadow: 2,
        },
      }),

      // 🔹 Page Container
      pageContainerStyle: {
        pt: 4,
        pb: 6,
      },

      // 🔹 Gradient Title
      pageTitleStyle: {
        fontWeight: "bold",
        mb: 2,
        background: titleTextGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },

      // 🔹 Search Field Input
      searchFieldStyle: {
        mb: 3,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          backgroundColor: searchBgColor,
        },
      },

      // 🔹 Background for Light/Dark Mode
      gradientBackground:
        mode === "light"
          ? "linear-gradient(135deg, rgb(255, 255, 196) 0%, rgb(255, 97, 100) 50%, rgb(176, 0, 18) 100%)"
          : "linear-gradient(135deg, #FF6363 0%, #FF8282 100%)",

      // 🔹 Card Style
      cardBoxStyle: {
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        height: "100%",
        background: lightCardGradient,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          color: "#111",
        },
      },

      // 🔹 Tool Button
      toolButtonStyle: {
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
      },

      // 🔹 Generic Chip
      chipStyle: {
        m: 0.5,
        fontSize: "0.85rem",
      },
    };
  }, [mode]);

  return styles;
}
