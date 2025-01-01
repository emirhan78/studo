import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const NotAl = () => {
  const [notlar, setNotlar] = useState([]); // Notlar listesi
  const [yeniNot, setYeniNot] = useState(''); // Yeni notun metni

  // Not ekleme fonksiyonu
  const notEkle = () => {
    if (yeniNot.trim() !== '') {
      setNotlar([...notlar, yeniNot]);
      setYeniNot(''); // TextField'i temizle
    }
  };

  // Not silme fonksiyonu
  const notSil = (index) => {
    const yeniNotlar = notlar.filter((_, i) => i !== index);
    setNotlar(yeniNotlar);
  };

  return (
    <Box
      sx={{
        p: 4,
        textAlign: 'center',
        maxWidth: '600px',
        mx: 'auto',
        overflow: 'hidden',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Not Al Sayfası
      </Typography>

      {/* Not ekleme alanı */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Yeni Not"
          variant="outlined"
          fullWidth
          value={yeniNot}
          onChange={(e) => setYeniNot(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={notEkle}
          sx={{
            backgroundColor: '#D42426',
            '&:hover': { backgroundColor: '#B71C1C' },
          }}
        >
          Ekle
        </Button>
      </Box>

      {/* Notlar listesi */}
      {notlar.length > 0 ? (
        <Box
          sx={{
            textAlign: 'left',
            maxHeight: '300px', // Maksimum yüksekliği belirledik
            overflowY: 'auto', // Dikey kaydırma çubuğu ekledik
            paddingRight: '8px',
          }}
        >
          {notlar.map((not, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                p: 2,
                backgroundColor: '#fff8e1',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                sx={{
                  wordBreak: 'break-word', // Taşma olduğunda kelimeleri kırar
                }}
              >
                {not}
              </Typography>
              <Button
                onClick={() => notSil(index)}
                variant="contained"
                color="error"
                size="small"
                sx={{ fontWeight: 600 }}
              >
                Sil
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography sx={{ color: 'gray' }}>Henüz bir not eklenmedi.</Typography>
      )}
    </Box>
  );
};

export default NotAl;
