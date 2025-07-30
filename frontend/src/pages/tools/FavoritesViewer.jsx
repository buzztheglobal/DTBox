// File: /src/pages/tools/FavoritesViewer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const FavoritesViewer = () => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const res = await axios.get('/api/user-favorites/demo_user');
      setFavorites(res.data);
    } catch (err) {
      console.error('Failed to load favorites:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/user-favorites/${id}`);
      fetchFavorites();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const filteredFavorites = favorites.filter((fav) =>
    fav.timezone.toLowerCase().includes(search.toLowerCase())
  );

  const handleQuickSelect = (zone) => {
    localStorage.setItem('selectedFavoriteZone', zone);
    navigate('/time-zone-converter');
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <Container className="calculator-container">
      <Typography variant="h4" gutterBottom>
        ⭐ Favorite Timezones
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Search favorites"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={() => navigate('/time-zone-converter')}
        >
          ⏱ Back to Converter
        </Button>
      </Box>

      <Paper elevation={3}>
        <List>
          {filteredFavorites.map((fav) => (
            <ListItem
              key={fav.id}
              secondaryAction={
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleQuickSelect(fav.timezone)}
                  >
                    Quick Select
                  </Button>
                  <IconButton edge="end" onClick={() => handleDelete(fav.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`${fav.timezone}`}
                secondary={`Usage: ${fav.usage_count || 0}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default FavoritesViewer;