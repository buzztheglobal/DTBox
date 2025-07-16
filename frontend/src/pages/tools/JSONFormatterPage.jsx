import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import JSONFormatterPanel from "../../components/json_formatter/JSONFormatterPanel";
import useGlobalStyles from "../../styles/useGlobalStyles";

const JSONFormatterPage = () => {
  const styles = useGlobalStyles(); // mode: "light"

  return (
    <Container sx={styles.pageContainerStyle}>
      <Typography variant="h4" sx={styles.pageTitleStyle}>
        JSON Formatter Tool
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <JSONFormatterPanel />

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Tips for Formatting JSON</Typography>
        <ul>
          <li>Use proper quotes: double quotes only.</li>
          <li>Use `{` and `}` for objects and `[` `]` for arrays.</li>
          <li>Ensure commas between items, no trailing comma at end.</li>
        </ul>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Example Passwords for Common Combinations
        </Typography>
        <ul>
          <li>{`{"username":"user1","password":"Abc@1234"}`}</li>
          <li>{`{"email":"demo@example.com","token":"eyJhbGci..."}`}</li>
        </ul>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Notes
        </Typography>
        <ul>
          <li>This tool supports JSON validation and error detection.</li>
          <li>Use minify mode for compact output ideal for API payloads.</li>
        </ul>
      </Box>
    </Container>
  );
};

export default JSONFormatterPage;
