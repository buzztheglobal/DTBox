// src/components/json_csv_converter/JsonTreeView.jsx
import React, { useState, useCallback } from "react";
import { Box, IconButton, Typography } from "@mui/material";

/**
 * Small, dependency-free JSON tree viewer.
 * Renders objects/arrays with collapsible nodes and color-coded types.
 *
 * Props:
 * - data: the parsed JSON object/array
 * - initiallyExpandedDepth: number (default 1)
 */

const valueStyles = {
  key: { color: "#2b6cb0", fontWeight: 600 },         // blue keys
  string: { color: "#22863a" },                       // green strings
  number: { color: "#6f42c1" },                       // purple numbers
  boolean: { color: "#b31d1d" },                      // red booleans
  nil: { color: "#6a737d", fontStyle: "italic" },     // gray null
  punctuation: { color: "#444" },
  typeLabel: { fontSize: "0.8rem", color: "#888", marginLeft: 8 }
};

const isPrimitive = (v) =>
  v === null || typeof v === "string" || typeof v === "number" || typeof v === "boolean";

const JsonNode = ({ name, value, depth = 0, initiallyOpenDepth = 1 }) => {
  const [open, setOpen] = useState(depth < initiallyOpenDepth);

  const toggle = () => setOpen((s) => !s);

  if (isPrimitive(value)) {
    let style = valueStyles.nil;
    let display = "null";
    if (typeof value === "string") {
      style = valueStyles.string;
      display = `"${value}"`;
    } else if (typeof value === "number") {
      style = valueStyles.number;
      display = String(value);
    } else if (typeof value === "boolean") {
      style = valueStyles.boolean;
      display = String(value);
    }
    return (
      <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", ml: depth * 2 }}>
        {name !== undefined && <Typography component="span" sx={valueStyles.key}>{name}:</Typography>}
        <Typography component="span" sx={style}>{display}</Typography>
      </Box>
    );
  }

  // object or array
  const isArr = Array.isArray(value);
  const keys = isArr ? value : Object.keys(value);
  const opener = isArr ? "[" : "{";
  const closer = isArr ? "]" : "}";

  return (
    <Box sx={{ ml: depth * 2, mb: 0.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          component="button"
          onClick={toggle}
          sx={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            margin: 0,
            color: "#111",
            fontSize: "0.95rem",
            textAlign: "left"
          }}
        >
          {open ? "▾" : "▸"}
        </Typography>

        {name !== undefined && <Typography component="span" sx={valueStyles.key}>{name}:</Typography>}
        <Typography component="span" sx={valueStyles.punctuation}>{opener}</Typography>
        <Typography component="span" sx={valueStyles.typeLabel}>{isArr ? `Array(${value.length})` : `Object(${keys.length})`}</Typography>
      </Box>

      {open && (
        <Box sx={{ mt: 0.5 }}>
          {isArr
            ? value.map((v, i) => <JsonNode key={i} name={i} value={v} depth={depth + 1} initiallyOpenDepth={initiallyOpenDepth} />)
            : Object.keys(value).map((k) => <JsonNode key={k} name={k} value={value[k]} depth={depth + 1} initiallyOpenDepth={initiallyOpenDepth} />)
          }
          <Box sx={{ ml: 0.5 }}>
            <Typography component="span" sx={valueStyles.punctuation}>{closer}</Typography>
          </Box>
        </Box>
      )}
      {!open && (
        <Typography component="span" sx={{ ml: 2, ...valueStyles.punctuation }}>
          {closer}
        </Typography>
      )}
    </Box>
  );
};

export default function JsonTreeView({ data, initiallyExpandedDepth = 1 }) {
  const [expandSignal, setExpandSignal] = useState(0);

  // helper to cause re-mount of nodes (simple expand/collapse all)
  const forceUpdate = useCallback(() => setExpandSignal((x) => x + 1), []);

  return (
    <Box>
      {/* key: expandSignal to force subcomponents to re-evaluate initial open state if necessary */}
      <Box key={expandSignal}>
        <JsonNode value={data} depth={0} initiallyOpenDepth={initiallyExpandedDepth} />
      </Box>
    </Box>
  );
}
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\json_csv_converter\JsonTreeView.jsx
