// src/ThemeContext.js
import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Context to toggle between dark/light mode
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => {
    // Gradient background based on mode
    const gradientBackground =
      mode === "light"
        ? "linear-gradient(180deg, #fef6f6 0%, #f6f7fe 100%)"
        : "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)";

    return createTheme({
      palette: {
        mode,
        ...(mode === "light"
          ? {
              background: {
                default: "#95D2B3",
                paper: "#55AD9B",
              },
              primary: { main: "#55AD9B" },
              secondary: { main: "#95D2B3" },
            }
          : {
              background: {
                default: "#232526",
                paper: "#414345",
              },
              primary: { main: "#9F7AEA" },
              secondary: { main: "#FFB74D" },
            }),
      },
      typography: {
        fontFamily: "Roboto, sans-serif",
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              margin: 0,
              padding: 0,
              backgroundImage: gradientBackground,
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              minHeight: "100vh",
              transition: "all 0.3s ease-in-out",
            },
            "*": {
              boxSizing: "border-box",
            },
            a: {
              color: "inherit",
              textDecoration: "none",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "2rem",
              padding: "0.5rem 1.25rem",
              fontWeight: 600,
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
              },
            },
          },
        },
      },
    });
  }, [mode]); // ✅ only depends on mode now

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
