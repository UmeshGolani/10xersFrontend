import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <AppBar position="fixed" component="footer" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Typography variant="body2" color="inherit" align="center" sx={{ width: '100%' }}>
          © {new Date().getFullYear()} Umesh Golani 10xers
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
