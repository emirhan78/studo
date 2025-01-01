import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Snowfall from '../components/Snowfall';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Snowfall />
      <Container 
        maxWidth="md" 
        sx={{ 
          mt: { xs: 4, sm: 8 },
          mb: 4,
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Paper
          elevation={0}
          className="christmas-card"
          sx={{
            p: { xs: 3, sm: 6 },
            textAlign: 'center',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography 
            variant="h2" 
            component="h1"
            className="christmas-title"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
              mb: 2,
              position: 'relative',
              '&::before': {
                content: '"🎄 "',
              },
              '&::after': {
                content: '" 🎄"',
              },
            }}
          >
            Noel Özel
          </Typography>
          <Typography 
            variant="h3" 
            component="h2"
            className="christmas-title"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              mb: 4,
            }}
          >
            Ders Çalışma Programı
          </Typography>
          <Typography 
            variant="h6"
            component="p"
            className="christmas-text"
            sx={{ 
              mb: 6,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            Yeni yıla özel hazırlanmış ders çalışma programları ile başarıya ulaşın! 
            Kendi programınızı oluşturun veya hazır programlarımızı kullanın. 🎅
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              className="christmas-button"
              onClick={() => navigate('/program-olustur')}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: '200px',
              }}
            >
              Program Oluştur ⭐
            </Button>
            <Button
              variant="contained"
              className="christmas-button"
              onClick={() => navigate('/hazir-programlar')}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: '200px',
              }}
            >
              Hazır Programlar 🎁
            </Button>
          </Box>
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '40px',
              opacity: 0.2,
            }}
          >
            ❄️❄️❄️
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Home; 