// src/components/CategoryChips.jsx
// src/components/CategoryChips.jsx
import React from "react";
import { Box, Badge, Chip } from "@mui/material";
import { navChipStyle } from "../styles/globalStyles";
import { useNavigate, useLocation } from "react-router-dom";

const CategoryChips = ({ allCategories, categoryCounts, categoryFilter, theme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!allCategories) return null;

  // 🟢 Detect homepage
  const isHomePage = location.pathname === "/";
  // 🟢 Default to "Featured" if on homepage & no filter selected
  const effectiveFilter = categoryFilter || (isHomePage ? "Featured" : null);

  // 🟢 Ensure "Featured" always appears first, even if backend doesn't return it
  const sortedCategories = [
    "Featured",
    ...allCategories.filter((cat) => cat !== "Featured"),
  ];

  // 🟢 Total tool count (all categories)
  const totalTools = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
      {sortedCategories.map((cat) => (
        <Badge
          key={cat}
          badgeContent={cat === "Featured" ? totalTools : (categoryCounts[cat] || 0)}
          color="primary"
          overlap="circular"
        >
          <Chip
            label={cat}
            onClick={() =>
              navigate(`/tools?category=${encodeURIComponent(cat)}`)
            }
            sx={navChipStyle(effectiveFilter === cat, theme.palette.mode)}
          />
        </Badge>
      ))}
    </Box>
  );
};

export default CategoryChips;

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\CategoryChips.jsx