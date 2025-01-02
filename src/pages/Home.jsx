import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Snowfall from '../components/Snowfall';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Snowfall 
        frequency={120} 
        colors={['#ffffff', '#cce7ff', '#ffcccc']} 
        sizeRange={[10, 25]} 
      />
      <Container 
        maxWidth="md" 
        sx={{ 
          mt: { xs: 4, sm: 8 },
          mb: 4,
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={6}
          className="christmas-card"
          sx={{
            p: { xs: 3, sm: 6 },
            textAlign: 'center',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
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
              color: '#0d47a1',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
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
            variant="h4" 
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              mb: 4,
              color: '#0d47a1',
            }}
          >
            Ders Çalışma Programı
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              mb: 6,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.8,
              color: '#37474f',
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
                backgroundColor: '#0d47a1',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
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
                backgroundColor: '#0d47a1',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
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
              pointerEvents: 'none',
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
