import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #780206, #061161)' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            DailyToolbox - Date Tools
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
