// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  Pagination,
  Chip,
  Badge,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  cardBoxStyle,
  toolButtonStyle,
  navChipStyle,
  navButtonStyle,
} from "../styles/globalStyles";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const theme = useTheme();

  const isToolsPage = location.pathname === "/tools";
  const categoryFilter = query.get("category") || (isToolsPage ? null : "Featured");
  const searchTerm = query.get("search") || "";

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/menuitems")
      .then((res) => {
        setMenuItems(res.data);
        const uniqueCategories = [...new Set(res.data.map((item) => item.tool_domain))];
        setAllCategories(uniqueCategories);

        const counts = {};
        res.data.forEach((item) => {
          counts[item.tool_domain] = (counts[item.tool_domain] || 0) + 1;
        });
        setCategoryCounts(counts);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tools:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let items = [...menuItems];

    if (searchTerm) {
      items = items.filter((item) =>
        `${item.title} ${item.seo_description} ${item.tool_domain}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (query.get("category")) {
      items = items.filter((item) => item.tool_domain === categoryFilter);
    }

    items.sort((a, b) => a.order - b.order);
    setFilteredItems(items);
    setCurrentPage(1);

    if (items.length > 0 && (query.get("category") || searchTerm)) {
      axios.post("http://localhost:5000/api/logs", {
        type: "view",
        category: categoryFilter || null,
        search: searchTerm || null,
        count: items.length,
      });
    }
  }, [menuItems, categoryFilter, searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Container sx={{ pt: 10, textAlign: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" size={60} />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading tools...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ pt: 4, pb: 6 }}>
      <Typography variant="h4" gutterBottom>
        {isToolsPage
          ? searchTerm
            ? `Search Results for ${searchTerm}`
            : query.get("category")
              ? `Tools selected for ${query.get("category")}`
              : "Explore All Tools"
          : "Welcome to DailyToolbox 🧰"}
      </Typography>

      <Typography variant="body1" gutterBottom>
        {searchTerm || query.get("category")
          ? "Here are your filtered results:"
          : "Browse handy tools and converters below"}
      </Typography>

      {(categoryFilter || searchTerm) && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/tools");
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      {allCategories.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
          {allCategories.map((cat) => (
            <Badge
              key={cat}
              badgeContent={categoryCounts[cat] || 0}
              color="primary"
              overlap="circular"
            >
              <Chip
                label={cat}
                onClick={() => navigate(`/tools?category=${encodeURIComponent(cat)}`)}
                sx={navChipStyle(categoryFilter === cat, theme.palette.mode)}
              />
            </Badge>
          ))}
        </Box>
      )}

      <Grid container spacing={3}>
        {paginatedItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Box
              sx={{
                ...cardBoxStyle,
                transition: "all 0.3s ease",
                '&:hover': {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {item.seo_description || "No description"}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                sx={{ mb: 2, opacity: 0.7 }}>
                Category: {item.tool_domain}
              </Typography>
              <Button
                variant="contained"
                href={item.url}
                fullWidth
                sx={toolButtonStyle}
              >
                Open Tool →
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}

export default Home;
