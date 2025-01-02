import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function NetHesaplama() {
  const [activeTab, setActiveTab] = useState(0);
  const [tytDersler, setTytDersler] = useState({
    turkce: { dogru: 0, yanlis: 0, bos: 40, net: 0, toplamSoru: 40 },
    sosyal: { dogru: 0, yanlis: 0, bos: 20, net: 0, toplamSoru: 20 },
    matematik: { dogru: 0, yanlis: 0, bos: 40, net: 0, toplamSoru: 40 },
    fen: { dogru: 0, yanlis: 0, bos: 20, net: 0, toplamSoru: 20 },
  });

  const [aytDersler, setAytDersler] = useState({
    turkce: { dogru: 0, yanlis: 0, bos: 40, net: 0, toplamSoru: 40 },
    matematik: { dogru: 0, yanlis: 0, bos: 40, net: 0, toplamSoru: 40 },
    sosyal: { dogru: 0, yanlis: 0, bos: 40, net: 0, toplamSoru: 40 },
    fen: { dogru: 0, yanlis: 0, bos: 40, net: 0, toplamSoru: 40 },
  });

  const [ydtDersler, setYdtDersler] = useState({
    yabancidil: { dogru: 0, yanlis: 0, bos: 80, net: 0, toplamSoru: 80 },
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTytChange = (ders, alan, value) => {
    const temizDeger = value.replace(/^0+/, '') || '0';
    const yeniDeger = Math.max(0, parseInt(temizDeger) || 0);
    const dersData = { ...tytDersler[ders] };

    // Toplam soru kontrolü
    const digerAlanlarToplami = alan === 'dogru' 
      ? dersData.yanlis
      : alan === 'yanlis'
        ? dersData.dogru
        : dersData.dogru + dersData.yanlis;

    if (yeniDeger + digerAlanlarToplami > dersData.toplamSoru) {
      return;
    }

    // Değeri güncelle
    dersData[alan] = yeniDeger;

    // Boş sayısını güncelle
    dersData.bos = dersData.toplamSoru - (dersData.dogru + dersData.yanlis);

    // Net hesapla
    dersData.net = Number((dersData.dogru - (dersData.yanlis * 0.25)).toFixed(2));

    setTytDersler({
      ...tytDersler,
      [ders]: dersData,
    });
  };

  const handleAytChange = (ders, alan, value) => {
    const temizDeger = value.replace(/^0+/, '') || '0';
    const yeniDeger = Math.max(0, parseInt(temizDeger) || 0);
    const dersData = { ...aytDersler[ders] };

    // Toplam soru kontrolü
    const digerAlanlarToplami = alan === 'dogru' 
      ? dersData.yanlis
      : alan === 'yanlis'
        ? dersData.dogru
        : dersData.dogru + dersData.yanlis;

    if (yeniDeger + digerAlanlarToplami > dersData.toplamSoru) {
      return;
    }

    // Değeri güncelle
    dersData[alan] = yeniDeger;

    // Boş sayısını güncelle
    dersData.bos = dersData.toplamSoru - (dersData.dogru + dersData.yanlis);

    // Net hesapla
    dersData.net = Number((dersData.dogru - (dersData.yanlis * 0.25)).toFixed(2));

    setAytDersler({
      ...aytDersler,
      [ders]: dersData,
    });
  };

  const handleYdtChange = (ders, alan, value) => {
    const temizDeger = value.replace(/^0+/, '') || '0';
    const yeniDeger = Math.max(0, parseInt(temizDeger) || 0);
    const dersData = { ...ydtDersler[ders] };

    // Toplam soru kontrolü
    const digerAlanlarToplami = alan === 'dogru' 
      ? dersData.yanlis
      : alan === 'yanlis'
        ? dersData.dogru
        : dersData.dogru + dersData.yanlis;

    if (yeniDeger + digerAlanlarToplami > dersData.toplamSoru) {
      return;
    }

    // Değeri güncelle
    dersData[alan] = yeniDeger;

    // Boş sayısını güncelle
    dersData.bos = dersData.toplamSoru - (dersData.dogru + dersData.yanlis);

    // Net hesapla
    dersData.net = Number((dersData.dogru - (dersData.yanlis * 0.25)).toFixed(2));

    setYdtDersler({
      ...ydtDersler,
      [ders]: dersData,
    });
  };

  const toplamNet = (dersler) => {
    return Object.values(dersler).reduce((toplam, ders) => toplam + ders.net, 0).toFixed(2);
  };

  const renderDersTable = (dersler, handleChange, basliklar) => (
    <TableContainer component={Paper} sx={{ mt: 3, backgroundColor: 'rgba(255,255,255,0.05)' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Ders</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Doğru</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Yanlış</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Boş</TableCell>
            <TableCell align="center" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>Net</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(dersler).map(([key, ders]) => (
            <TableRow key={key}>
              <TableCell sx={{ color: '#fff' }}>{basliklar[key]}</TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  value={ders.dogru}
                  onChange={(e) => handleChange(key, 'dogru', e.target.value)}
                  inputProps={{ 
                    min: 0, 
                    max: ders.toplamSoru,
                    style: { textAlign: 'center' }
                  }}
                  size="small"
                  sx={{
                    width: '80px',
                    '& .MuiInputBase-input': {
                      color: '#fff',
                      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                      },
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&.Mui-focused fieldset': { borderColor: '#4CAF50' },
                    },
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  value={ders.yanlis}
                  onChange={(e) => handleChange(key, 'yanlis', e.target.value)}
                  inputProps={{ 
                    min: 0, 
                    max: ders.toplamSoru,
                    style: { textAlign: 'center' }
                  }}
                  size="small"
                  sx={{
                    width: '80px',
                    '& .MuiInputBase-input': {
                      color: '#fff',
                      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                      },
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&.Mui-focused fieldset': { borderColor: '#4CAF50' },
                    },
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  value={ders.bos}
                  disabled
                  inputProps={{ 
                    style: { textAlign: 'center' }
                  }}
                  size="small"
                  sx={{
                    width: '80px',
                    '& .MuiInputBase-input': {
                      color: '#fff',
                      '-webkit-text-fill-color': '#fff !important',
                      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                      },
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    },
                  }}
                />
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  color: '#4CAF50', 
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  fontFamily: "'DS-Digital', sans-serif",
                }}
              >
                {ders.net}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'right' }}>
              Toplam Net:
            </TableCell>
            <TableCell 
              align="center" 
              sx={{ 
                color: '#4CAF50', 
                fontWeight: 'bold',
                fontSize: '1.2rem',
                fontFamily: "'DS-Digital', sans-serif",
              }}
            >
              {toplamNet(dersler)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  const tytBasliklar = {
    turkce: 'Türkçe (40)',
    sosyal: 'Sosyal Bilimler (20)',
    matematik: 'Temel Matematik (40)',
    fen: 'Fen Bilimleri (20)',
  };

  const aytBasliklar = {
    turkce: 'Türk Dili ve Edebiyatı (40)',
    matematik: 'Matematik (40)',
    sosyal: 'Sosyal Bilimler (40)',
    fen: 'Fen Bilimleri (40)',
  };

  const ydtBasliklar = {
    yabancidil: 'Yabancı Dil (80)',
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
          YKS Net Hesaplama
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
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTab-root': {
              color: '#fff',
              '&.Mui-selected': {
                color: '#4CAF50',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#4CAF50',
            },
          }}
        >
          <Tab label="TYT" />
          <Tab label="AYT" />
          <Tab label="YDT" />
        </Tabs>

        {activeTab === 0 && renderDersTable(tytDersler, handleTytChange, tytBasliklar)}
        {activeTab === 1 && renderDersTable(aytDersler, handleAytChange, aytBasliklar)}
        {activeTab === 2 && renderDersTable(ydtDersler, handleYdtChange, ydtBasliklar)}
      </Paper>
    </Container>
  );
}

export default NetHesaplama; 