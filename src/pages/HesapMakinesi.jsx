import React, { useState } from 'react';
import { Container, Box, Typography, IconButton, Grid, Paper } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';

function HesapMakinesi() {
  const [ekran, setEkran] = useState('0');
  const [oncekiSayi, setOncekiSayi] = useState(null);
  const [islem, setIslem] = useState(null);
  const [yeniSayiBasliyor, setYeniSayiBasliyor] = useState(true);
  const [hafiza, setHafiza] = useState(0);
  const [derece, setDerece] = useState(true); // true = derece, false = radyan

  // Bilimsel hesap makinesi butonları
  const bilimselButonlar = [
    { text: 'sin', action: () => trigonometrikHesapla('sin') },
    { text: 'cos', action: () => trigonometrikHesapla('cos') },
    { text: 'tan', action: () => trigonometrikHesapla('tan') },
    { text: 'DEG', action: () => setDerece(!derece), color: derece ? '#4CAF50' : '#666' },
    { text: 'π', action: () => sayiEkle(Math.PI.toString()) },
    { text: 'log', action: () => logaritmikHesapla('log') },
    { text: 'ln', action: () => logaritmikHesapla('ln') },
    { text: 'e', action: () => sayiEkle(Math.E.toString()) },
    { text: 'x²', action: () => usHesapla(2) },
    { text: 'x³', action: () => usHesapla(3) },
    { text: '√', action: () => kokHesapla() },
    { text: 'xʸ', action: () => islemYap('^') },
    { text: '(', action: () => parantezEkle('(') },
    { text: ')', action: () => parantezEkle(')') },
    { text: 'MC', action: () => setHafiza(0) },
    { text: 'MR', action: () => hafizadanOku() },
    { text: 'M+', action: () => hafizayaEkle() },
    { text: 'M-', action: () => hafizadanCikar() },
    { text: '%', action: () => yuzdeHesapla() },
    { text: '±', action: () => isaretDegistir() },
  ];

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
    } else if (islem) {
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
      case '^':
        sonuc = Math.pow(sonuc, suankiSayi);
        break;
      default:
        return suankiSayi;
    }

    return Number(sonuc.toFixed(8));
  };

  const trigonometrikHesapla = (fonksiyon) => {
    let sayi = parseFloat(ekran);
    if (!derece) {
      sayi = sayi * (Math.PI / 180); // Dereceyi radyana çevir
    }
    let sonuc;
    switch (fonksiyon) {
      case 'sin':
        sonuc = Math.sin(sayi);
        break;
      case 'cos':
        sonuc = Math.cos(sayi);
        break;
      case 'tan':
        sonuc = Math.tan(sayi);
        break;
      default:
        return;
    }
    setEkran(sonuc.toFixed(8));
    setYeniSayiBasliyor(true);
  };

  const logaritmikHesapla = (fonksiyon) => {
    const sayi = parseFloat(ekran);
    if (sayi <= 0) {
      alert('Logaritma için pozitif sayı giriniz!');
      return;
    }
    const sonuc = fonksiyon === 'log' ? Math.log10(sayi) : Math.log(sayi);
    setEkran(sonuc.toFixed(8));
    setYeniSayiBasliyor(true);
  };

  const usHesapla = (us) => {
    const sayi = parseFloat(ekran);
    const sonuc = Math.pow(sayi, us);
    setEkran(sonuc.toFixed(8));
    setYeniSayiBasliyor(true);
  };

  const kokHesapla = () => {
    const sayi = parseFloat(ekran);
    if (sayi < 0) {
      alert('Negatif sayının karekökü alınamaz!');
      return;
    }
    const sonuc = Math.sqrt(sayi);
    setEkran(sonuc.toFixed(8));
    setYeniSayiBasliyor(true);
  };

  const hafizayaEkle = () => {
    setHafiza(hafiza + parseFloat(ekran));
  };

  const hafizadanCikar = () => {
    setHafiza(hafiza - parseFloat(ekran));
  };

  const hafizadanOku = () => {
    setEkran(hafiza.toString());
    setYeniSayiBasliyor(true);
  };

  const yuzdeHesapla = () => {
    const sayi = parseFloat(ekran);
    setEkran((sayi / 100).toString());
    setYeniSayiBasliyor(true);
  };

  const isaretDegistir = () => {
    setEkran((parseFloat(ekran) * -1).toString());
  };

  const temizle = () => {
    setEkran('0');
    setOncekiSayi(null);
    setIslem(null);
    setYeniSayiBasliyor(true);
  };

  const silSon = () => {
    if (ekran.length === 1) {
      setEkran('0');
      setYeniSayiBasliyor(true);
    } else {
      setEkran(ekran.slice(0, -1));
    }
  };

  const esittir = () => {
    if (islem === null || oncekiSayi === null) return;
    
    const sonuc = hesapla();
    setEkran(String(sonuc));
    setOncekiSayi(null);
    setIslem(null);
    setYeniSayiBasliyor(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            background: 'linear-gradient(45deg, #ff4444, #4CAF50)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Bilimsel Hesap Makinesi
        </Typography>
      </Box>

      <Paper 
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 4,
          background: 'linear-gradient(to bottom, #1a1a1a, #000)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Ekran */}
        <Box 
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Typography 
            variant="h4" 
            align="right"
            sx={{
              fontFamily: "'DS-Digital', sans-serif",
              color: '#fff',
              fontSize: '2.5rem',
              minHeight: '3rem',
              textShadow: '0 0 10px rgba(255,255,255,0.3)',
            }}
          >
            {ekran}
          </Typography>
          {hafiza !== 0 && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#4CAF50',
                position: 'absolute',
                top: '8px',
                left: '8px'
              }}
            >
              M
            </Typography>
          )}
        </Box>

        {/* Bilimsel Butonlar */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {bilimselButonlar.map((buton, index) => (
            <Grid item xs={3} key={index}>
              <IconButton
                onClick={buton.action}
                sx={{
                  width: '100%',
                  height: '48px',
                  color: buton.color || '#fff',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  fontSize: '0.9rem',
                  borderRadius: 2,
                }}
              >
                {buton.text}
              </IconButton>
            </Grid>
          ))}
        </Grid>

        {/* Sayısal Tuş Takımı */}
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Grid container spacing={1}>
              {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'].map((sayi) => (
                <Grid item xs={4} key={sayi}>
                  <IconButton
                    onClick={() => sayiEkle(sayi.toString())}
                    sx={{
                      width: '100%',
                      height: '48px',
                      color: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                      fontSize: '1.25rem',
                      borderRadius: 2,
                    }}
                  >
                    {sayi}
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Grid container spacing={1}>
              {[
                { text: 'C', action: temizle, color: '#ff4444' },
                { text: <BackspaceIcon />, action: silSon },
                { text: '=', action: esittir, color: '#4CAF50' },
              ].map((buton, index) => (
                <Grid item xs={12} key={index}>
                  <IconButton
                    onClick={buton.action}
                    sx={{
                      width: '100%',
                      height: '48px',
                      color: buton.color || '#fff',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                      fontSize: '1.25rem',
                      borderRadius: 2,
                    }}
                  >
                    {buton.text}
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* İşlem Butonları */}
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {['+', '-', '*', '/'].map((op) => (
                <Grid item xs={3} key={op}>
                  <IconButton
                    onClick={() => islemYap(op)}
                    sx={{
                      width: '100%',
                      height: '48px',
                      color: '#4CAF50',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                      fontSize: '1.25rem',
                      borderRadius: 2,
                    }}
                  >
                    {op === '*' ? '×' : op === '/' ? '÷' : op}
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default HesapMakinesi; 