import React from 'react';
import { Container, Grid, Paper, Typography, Button, Box } from '@mui/material';
import jsPDF from 'jspdf';
import Snowfall from '../components/Snowfall';

const hazirProgramlar = [
  {
    id: 1,
    baslik: 'Dengeli Çalışma Programı',
    aciklama: 'Okul ve ders çalışma saatlerini dengeli bir şekilde planlayan program.',
    gunlukCalismaSaati: 6,
    molaSayisi: 4,
  },
  {
    id: 2,
    baslik: 'Yoğun Çalışma Programı',
    aciklama: 'Sınavlara hazırlık için günde 8 saat çalışma programı',
    gunlukCalismaSaati: 8,
    molaSayisi: 4,
  },
  {
    id: 3,
    baslik: 'Dengeli Çalışma Programı',
    aciklama: 'Hem ders çalışma hem sosyal aktivite için ideal program',
    gunlukCalismaSaati: 6,
    molaSayisi: 3,
  },
  {
    id: 4,
    baslik: 'Esnek Çalışma Programı',
    aciklama: 'Part-time çalışan öğrenciler için uygun program',
    gunlukCalismaSaati: 4,
    molaSayisi: 2,
  },
];

const dengeliProgramiIndir = () => {
  const img = new Image();
  img.src = '/dengeli-program.jpg';
  
  img.onload = () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    pdf.setFontSize(30);
    pdf.setTextColor(212, 36, 38); // Noel kırmızısı
    pdf.text('🎄 Noel Özel - Dengeli Çalışma Programı 🎄', pdf.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    pdf.setFontSize(14);
    pdf.setTextColor(22, 91, 51); // Noel yeşili
    pdf.text('Mutlu ve Başarılı Bir Yıl Dileğiyle!', pdf.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = img.width;
    const imgHeight = img.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.85;
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 40;

    pdf.addImage(img, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    pdf.setFontSize(10);
    pdf.setTextColor(44, 62, 80); // Koyu gri
    pdf.text('🎅 Bu program sizin için özel olarak hazırlanmıştır', pdfWidth / 2, pdfHeight - 20, { align: 'center' });
    pdf.text('⭐ Başarılar dileriz! ⭐', pdfWidth / 2, pdfHeight - 15, { align: 'center' });
    pdf.text('Not: Bu program her öğrencide aynı verimi vermeyebilir.', pdfWidth / 2, pdfHeight - 10, { align: 'center' });
    pdf.text('Daha detaylı bilgi almak için PDR servisine başvurunuz!', pdfWidth / 2, pdfHeight - 6, { align: 'center' });

    pdf.save('noel-ozel-dengeli-program.pdf');
  };
};

function HazirProgramlar() {
  return (
    <>
      <Snowfall />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1"
          className="christmas-title"
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            mb: 4,
            '&::before': {
              content: '"🎄 "',
            },
            '&::after': {
              content: '" 🎄"',
            },
          }}
        >
          Noel Özel Programları
        </Typography>
        <Grid container spacing={3}>
          {hazirProgramlar.map((program) => (
            <Grid item xs={12} md={6} key={program.id}>
              <Paper
                elevation={0}
                className="christmas-card"
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '20px',
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  className="christmas-text"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    '&::before': {
                      content: '"🎁 "',
                    },
                  }}
                >
                  {program.baslik}
                </Typography>
                <Typography
                  className="christmas-text"
                  sx={{ mb: 2, flex: 1, opacity: 0.9 }}
                >
                  {program.aciklama}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Typography
                    variant="body2"
                    className="christmas-badge"
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: '8px',
                      '&::before': {
                        content: '"⏰ "',
                      },
                    }}
                  >
                    Günlük {program.gunlukCalismaSaati} Saat
                  </Typography>
                  <Typography
                    variant="body2"
                    className="christmas-badge"
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: '8px',
                      '&::before': {
                        content: '"☕ "',
                      },
                    }}
                  >
                    {program.molaSayisi} Mola
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={program.id === 1 ? dengeliProgramiIndir : undefined}
                    className="christmas-button"
                    sx={{
                      flex: 1,
                      py: 1,
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textTransform: 'none',
                    }}
                  >
                    Programı İndir 🎅
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default HazirProgramlar; 