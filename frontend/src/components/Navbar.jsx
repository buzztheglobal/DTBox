// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menuitems")
      .then((res) => {
        const uniqueCategories = [
          ...new Set(res.data.map((item) => item.tool_domain)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    navigate(`/tools?category=${encodeURIComponent(category)}`);
    handleMenuClose();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tools?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            DailyToolbox
          </Link>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <div>
            <Button color="inherit" onClick={handleMenuOpen}>
              Tools ▾
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {categories.map((cat) => (
                <MenuItem key={cat} onClick={() => handleCategorySelect(cat)}>
                  {cat}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="Search..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1, minWidth: 200 }}
            />
          </form>

          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
