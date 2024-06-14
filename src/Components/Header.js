import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CompanyLogo from '../Assets/number-10.png';

const Header = ({ heading, handleEvent, eventName }) => {
  

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo on the extreme left */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={CompanyLogo} alt="Company Logo" style={{ height: '64px' }} />
          <Typography sx={{fontSize: '50px', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px #000000'}}>XERS</Typography>
        </Box>

        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h4">
            {heading}
          </Typography>
        </Box>

        {/* Cart icon and logout button on the extreme right */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <FaShoppingCart />
          </IconButton>
          <Button color="inherit" onClick={handleEvent}>
            <Link to='/login' style={{ color: 'inherit', textDecoration: 'none' }}>{eventName}</Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
