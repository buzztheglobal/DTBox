import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useGlobalStyles from "../../styles/useGlobalStyles";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
  formBoxStyle,
  formFieldStyle,
  resultBoxStyle,
  toolButtonStyle
} from '../../styles/globalStyles';

const JSONFormatterPanel = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [minify, setMinify] = useState(false);
  const [error, setError] = useState("");
  const [errorLine, setErrorLine] = useState(null);
  const [copied, setCopied] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [indentation, setIndentation] = useState(2); // 2 / 4 / tab
  const styles = useGlobalStyles(darkTheme ? "dark" : "light");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const indentValue =
        indentation === "tab" ? "\t" : Number(indentation) || 2;
      const output = minify
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, indentValue);
      setFormatted(output);
      setError("");
      setErrorLine(null);
    } catch (err) {
      setFormatted("");
      setError(err.message);
      const match = err.message.match(/position (\d+)/);
      if (match) {
        const pos = parseInt(match[1], 10);
        const line = input.substring(0, pos).split("\n").length;
        setErrorLine(line);
      }
    }
  };

  const handleClear = () => {
    setInput("");
    setFormatted("");
    setError("");
    setErrorLine(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getHelperText = () => {
    if (!error) return null;
    return errorLine
      ? `Error on line ${errorLine}: ${error}`
      : `Error: ${error}`;
  };

  return (
    <Box sx={styles.cardBoxStyle}>
      <Typography variant="h6" gutterBottom>
        Paste your JSON
      </Typography>

      <CodeEditor
        value={input}
        language="json"
        placeholder="Paste or type your JSON here..."
        onChange={(e) => setInput(e.target.value)}
        padding={15}
        style={{
          fontSize: 14,
          fontFamily: "monospace",
          backgroundColor: error ? "#fff0f0" : "#f8f8f8",
          border: error ? "1px solid #ff4d4f" : "1px solid #ccc",
          borderRadius: "8px",
          minHeight: "180px",
          marginBottom: "12px",
          whiteSpace: "pre-wrap",
        }}
      />

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {getHelperText()}
        </Typography>
      )}

      <Box  className="form-card"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
        }}
      >
        <FormControlLabel
        sx={formBoxStyle}
          control={
            <Switch
              checked={minify}
              onChange={(e) => setMinify(e.target.checked)}
            />
          }
          label="Minify Output"
        />

        <FormControlLabel
        sx={formBoxStyle}
          control={
            <Switch
              checked={darkTheme}
              onChange={() => setDarkTheme((prev) => !prev)}
            />
          }
          label="Dark Theme"
        />

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="indent-select-label">Indentation</InputLabel>
          <Select
            labelId="indent-select-label"
            value={indentation}
            label="Indentation"
            onChange={(e) => setIndentation(e.target.value)}
          >
            <MenuItem value={2}>2 spaces</MenuItem>
            <MenuItem value={4}>4 spaces</MenuItem>
            <MenuItem value="tab">Tabs</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button className="btn" variant="contained" sx={styles.toolButtonStyle} onClick={handleFormat}>
          Format JSON
        </Button>
        <Button className="btn" variant="outlined" color="error" onClick={handleClear}>
          Clear
        </Button>
      </Box>

      {formatted && (
        <Box sx={{ mt: 4, position: "relative" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Formatted Output:
          </Typography>
          <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
            <IconButton
              aria-label="copy"
              onClick={handleCopy}
              sx={{ position: "absolute", top: -4, right: 0 }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>

          <pre
            className={darkTheme ? "dark-code-block" : "light-code-block"}
            style={{
              padding: "1rem",
              borderRadius: "8px",
              overflowX: "auto",
              marginTop: "10px",
              fontSize: "0.95rem",
            }}
          >
            {formatted}
          </pre>
        </Box>
      )}
    </Box>
  );
};

export default JSONFormatterPanel;
