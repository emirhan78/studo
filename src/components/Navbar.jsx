import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  margin: '0 8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#D42426' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          🎄 Öğrenci Program Planlayıcı
        </Typography>
        <StyledButton component={Link} to="/">
          Ana Sayfa
        </StyledButton>
        <StyledButton component={Link} to="/program-olustur">
          Program Oluştur
        </StyledButton>
        <StyledButton component={Link} to="/hazir-programlar">
          Hazır Programlar
        </StyledButton>
        <StyledButton component={Link} to="/not-al">
          Not Al
        </StyledButton>
        <StyledButton component={Link} to="/hesap-makinesi">
          Hesap Makinesi
        </StyledButton>
        <StyledButton component={Link} to="/saat">
          Saat
        </StyledButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 