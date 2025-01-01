import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  TextField
} from '@mui/material';
import Snowfall from '../components/Snowfall';

function HesapMakinesi() {
  const [ekran, setEkran] = useState('0');
  const [oncekiSayi, setOncekiSayi] = useState(null);
  const [islem, setIslem] = useState(null);
  const [yeniSayiBasliyor, setYeniSayiBasliyor] = useState(true);

  const sayiEkle = (sayi) => {
    if (yeniSayiBasliyor) {
      setEkran(sayi);
      setYeniSayiBasliyor(false);
    } else {
      setEkran(ekran === '0' ? sayi : ekran + sayi);
    }
  };

  const islemYap = (yeniIslem) => {
    const suankiSayi = parseFloat(ekran);
    
    if (oncekiSayi === null) {
      setOncekiSayi(suankiSayi);
    } else {
      const sonuc = hesapla();
      setOncekiSayi(sonuc);
      setEkran(String(sonuc));
    }
    
    setIslem(yeniIslem);
    setYeniSayiBasliyor(true);
  };

  const hesapla = () => {
    const suankiSayi = parseFloat(ekran);
    let sonuc = oncekiSayi;

    switch (islem) {
      case '+':
        sonuc += suankiSayi;
        break;
      case '-':
        sonuc -= suankiSayi;
        break;
      case '*':
        sonuc *= suankiSayi;
        break;
      case '/':
        if (suankiSayi === 0) {
          alert('Sıfıra bölünemez!');
          temizle();
          return 0;
        }
        sonuc /= suankiSayi;
        break;
      default:
        return suankiSayi;
    }

    return sonuc;
  };

  const esittir = () => {
    if (islem === null || oncekiSayi === null) return;
    
    const sonuc = hesapla();
    setEkran(String(sonuc));
    setOncekiSayi(null);
    setIslem(null);
    setYeniSayiBasliyor(true);
  };

  const temizle = () => {
    setEkran('0');
    setOncekiSayi(null);
    setIslem(null);
    setYeniSayiBasliyor(true);
  };

  return (
    <>
      <Snowfall />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ 
          textAlign: 'center',
          mb: 4,
          position: 'relative',
        }}>
          <Typography 
            variant="h3" 
            component="h1"
            className="christmas-title"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 1,
              '&::before': {
                content: '"🎄 "',
              },
              '&::after': {
                content: '""',
              },
            }}
          >
         Hesap Makinesi
          </Typography>
          <Typography 
            variant="subtitle1" 
            className="christmas-text"
            sx={{ 
              maxWidth: '500px', 
              mx: 'auto',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              opacity: 0.9
            }}
          >
            Matematik işlemlerinizi yapabileceğiniz hesap makinesi 🎅
          </Typography>
        </Box>

        <Paper 
          elevation={0}
          className="christmas-card"
          sx={{ 
            p: 3,
            borderRadius: '20px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{ 
                  p: 2,
                  mb: 2,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'right'
                }}
              >
                <Typography 
                  variant="h4"
                  sx={{ 
                    fontWeight: 600,
                    color: '#000000',
                    fontFamily: 'monospace'
                  }}
                >
                  {ekran}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={1}>
                {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((sayi) => (
                  <Grid item xs={4} key={sayi}>
                    <Button 
                      variant="contained"
                      onClick={() => sayiEkle(String(sayi))}
                      fullWidth
                      className="christmas-button"
                      sx={{
                        py: 2,
                        borderRadius: '12px',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#000000',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        }
                      }}
                    >
                      {sayi}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={1}>
                {['+', '-', '*', '/'].map((op) => (
                  <Grid item xs={3} key={op}>
                    <Button 
                      variant="contained"
                      onClick={() => islemYap(op)}
                      fullWidth
                      className="christmas-button"
                      sx={{
                        py: 2,
                        borderRadius: '12px',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                      }}
                    >
                      {op === '*' ? '×' : op === '/' ? '÷' : op}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined"
                    onClick={temizle}
                    fullWidth
                    sx={{
                      py: 2,
                      borderRadius: '12px',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      borderColor: 'var(--christmas-red)',
                      color: 'var(--christmas-red)',
                      '&:hover': {
                        borderColor: 'var(--christmas-red)',
                        backgroundColor: 'rgba(212, 36, 38, 0.1)',
                      }
                    }}
                  >
                    Temizle ❄️
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="contained"
                    onClick={esittir}
                    fullWidth
                    className="christmas-button"
                    sx={{
                      py: 2,
                      borderRadius: '12px',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                    }}
                  >
                    =
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default HesapMakinesi; 