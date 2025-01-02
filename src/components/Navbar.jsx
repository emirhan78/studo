import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SchoolIcon from '@mui/icons-material/School';

const StyledButton = styled(Button)(({ theme, active }) => ({
  color: '#fff',
  margin: '0',
  padding: '6px 10px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: active ? '100%' : '0%',
    height: '2px',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    '&:after': {
      width: '100%',
    },
  },
}));

const pages = [
  { title: 'Ana Sayfa', path: '/' },
  { title: 'Program Oluştur', path: '/program-olustur' },
  { title: 'Hazır Programlar', path: '/hazir-programlar' },
  { title: 'Not Al', path: '/not-al' },
  { title: 'Hesap Makinesi', path: '/hesap-makinesi' },
  { title: 'Saat', path: '/saat' },
  { title: 'YKS Net Hesaplama', path: '/net-hesaplama' },
];

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: isDarkMode ? '#333333' : '#D42426',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        height: '56px',
      }}
    >
      <Toolbar sx={{ minHeight: '56px !important', height: '56px', padding: '0 16px' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
          flexGrow: 1,
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.3s ease',
          }
        }}>
          <SchoolIcon sx={{ fontSize: 28 }} />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              color: 'white',
              textDecoration: 'none',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              fontSize: '1.1rem',
            }}
          >
            STUDO
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {pages.map((page) => (
            <StyledButton 
              key={page.path}
              component={Link}
              to={page.path}
              active={location.pathname === page.path ? 1 : 0}
              sx={{
                fontSize: '0.9rem',
                textTransform: 'none',
                fontWeight: location.pathname === page.path ? 600 : 400,
                height: '56px',
              }}
            >
              {page.title}
            </StyledButton>
          ))}
          <IconButton 
            color="inherit" 
            onClick={toggleDarkMode}
            sx={{
              ml: 1,
              padding: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'rotate(180deg)',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 