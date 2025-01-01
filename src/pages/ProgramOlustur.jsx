import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Autocomplete,
} from '@mui/material';
import Snowfall from '../components/Snowfall';

const gunler = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const saatler = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00'
];

const anaDersler = [
  'Matematik',
  'Fizik',
  'Kimya',
  'Biyoloji',
  'Türkçe',
  'Edebiyat',
  'Tarih',
  'Coğrafya',
  'İngilizce',
  'Almanca',
  'Fransızca',
  'Felsefe',
  'Din Kültürü',
  'Müzik',
  'Resim',
  'Beden Eğitimi'
];

function ProgramOlustur() {
  const [dersAdi, setDersAdi] = useState('');
  const [seciliGun, setSeciliGun] = useState('');
  const [seciliSaat, setSeciliSaat] = useState('');
  const [program, setProgram] = useState({});
  const [sonEklenenDersler, setSonEklenenDersler] = useState([]);
  const tableRef = useRef();

  const dersEkle = () => {
    if (dersAdi && seciliGun && seciliSaat) {
      setProgram((prev) => ({
        ...prev,
        [`${seciliGun}-${seciliSaat}`]: dersAdi,
      }));
      
      // Son eklenen derslere ekle (tekrar etmeyecek şekilde)
      if (!sonEklenenDersler.includes(dersAdi) && !anaDersler.includes(dersAdi)) {
        setSonEklenenDersler(prev => [...prev.slice(-4), dersAdi]);
      }
      
      setDersAdi('');
      setSeciliGun('');
      setSeciliSaat('');
    }
  };

  // Tüm ders seçeneklerini birleştir
  const tumDersSecenekleri = [...anaDersler, ...sonEklenenDersler];

  const dersSil = (gun, saat) => {
    setProgram((prev) => {
      const yeniProgram = { ...prev };
      delete yeniProgram[`${gun}-${saat}`];
      return yeniProgram;
    });
  };

  const programiKaydet = async () => {
    if (!tableRef.current) return;
    
    try {
      const element = tableRef.current;
      
      // Tablo stillerini geçici olarak ayarla
      const originalStyle = element.style.cssText;
      element.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 12px;
        width: max-content;
        min-width: 100%;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      `;
      
      // Tablo hücrelerinin stillerini geçici olarak ayarla
      const cells = element.getElementsByTagName('td');
      const originalCellStyles = [];
      for (let cell of cells) {
        originalCellStyles.push(cell.style.cssText);
        cell.style.cssText = `
          padding: 12px;
          font-size: 14px;
          border: 1px solid #e0e0e0;
          min-width: 120px;
          height: 40px;
          text-align: center;
          color: #000000;
          background: white;
        `;
      }
      
      // Başlık hücrelerinin stillerini geçici olarak ayarla
      const headers = element.getElementsByTagName('th');
      const originalHeaderStyles = [];
      for (let header of headers) {
        originalHeaderStyles.push(header.style.cssText);
        header.style.cssText = `
          padding: 15px;
          font-size: 16px;
          font-weight: bold;
          background-color: #D42426;
          color: #000000;
          border: 1px solid #D42426;
          min-width: 120px;
          text-align: center;
        `;
      }

      // Ders içeren hücrelerin stillerini güncelle
      const dersHucreleri = element.querySelectorAll('td > div');
      dersHucreleri.forEach(div => {
        div.style.cssText = `
          background-color: rgba(212, 36, 38, 0.1);
          color: #000000;
          padding: 8px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
        `;
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: element.scrollWidth + 60,
        height: element.scrollHeight + 60,
        windowWidth: element.scrollWidth + 60,
        windowHeight: element.scrollHeight + 60
      });
      
      // Orijinal stilleri geri yükle
      element.style.cssText = originalStyle;
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.cssText = originalCellStyles[i];
      }
      for (let i = 0; i < headers.length; i++) {
        headers[i].style.cssText = originalHeaderStyles[i];
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a3'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min((pdfWidth - 40) / imgWidth, (pdfHeight - 80) / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 50;

      // Sayfa arka planı
      pdf.setFillColor(248, 249, 250);
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

      // Süslü başlık çerçevesi
      const titleY = 25;
      pdf.setDrawColor(212, 36, 38);
      pdf.setLineWidth(0.5);
      pdf.line(40, titleY - 10, pdfWidth - 40, titleY - 10);
      pdf.line(40, titleY + 15, pdfWidth - 40, titleY + 15);

      // PDF başlığı ve süslemeleri
      pdf.setFontSize(30);
      pdf.setTextColor(212, 36, 38);
      pdf.text('🎄 Noel Özel Ders Programı 🎄', pdfWidth / 2, titleY, { align: 'center' });
      
      // Alt başlık
      pdf.setFontSize(16);
      pdf.setTextColor(22, 91, 51);
      pdf.text('Mutlu ve Başarılı Bir Yıl Dileğiyle!', pdfWidth / 2, titleY + 30, { align: 'center' });
      
      // Program tablosu
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Alt bilgi için süslü çerçeve
      const footerY = pdfHeight - 30;
      pdf.setDrawColor(212, 36, 38);
      pdf.setLineWidth(0.5);
      pdf.line(40, footerY - 15, pdfWidth - 40, footerY - 15);
      pdf.line(40, footerY + 10, pdfWidth - 40, footerY + 10);

      // Alt bilgi
      pdf.setFontSize(12);
      pdf.setTextColor(44, 62, 80);
      pdf.text('🎅 Bu program sizin için özel olarak hazırlanmıştır', pdfWidth / 2, footerY - 5, { align: 'center' });
      pdf.text('⭐ Başarılar dileriz! ⭐', pdfWidth / 2, footerY + 5, { align: 'center' });

      pdf.save('noel-ozel-ders-programi.pdf');
    } catch (error) {
      console.error('PDF oluşturulurken bir hata oluştu:', error);
    }
  };

  return (
    <>
      <Snowfall />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
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
                content: '" 🎄"',
              },
            }}
          >
            Noel Özel Program Oluşturucu
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
            Ünlü prof. EMİRHAN YILDIZIN katkılarıyla ders programınızı oluşturun ve PDF olarak indirin 🎅
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Paper 
                elevation={0}
                className="christmas-card"
                sx={{ 
                  p: 3,
                  borderRadius: '20px',
                }}
              >
                <Typography 
                  variant="h5" 
                  gutterBottom
                  className="christmas-title"
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    textAlign: 'center',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    '&::before': {
                      content: '"🎁 "',
                    },
                  }}
                >
                  Yeni Ders Ekle
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Autocomplete
                    freeSolo
                    value={dersAdi}
                    onChange={(event, newValue) => setDersAdi(newValue)}
                    onInputChange={(event, newInputValue) => setDersAdi(newInputValue)}
                    options={tumDersSecenekleri}
                    groupBy={(option) => anaDersler.includes(option) ? "Ana Dersler" : "Son Eklenen Dersler"}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ders Adı"
                        size="small"
                        className="christmas-text"
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            },
                            '&.Mui-focused': {
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            },
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'var(--christmas-red)',
                            },
                          }
                        }}
                      />
                    )}
                    renderGroup={(params) => (
                      <Box key={params.key}>
                        <Typography
                          className="christmas-text"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            px: 2,
                            py: 0.5,
                          }}
                        >
                          {params.group}
                        </Typography>
                        {params.children}
                      </Box>
                    )}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        {...props}
                        sx={{
                          fontSize: '0.875rem',
                          py: 0.75,
                          px: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(212, 36, 38, 0.1) !important',
                          },
                        }}
                      >
                        {option}
                      </Box>
                    )}
                  />
                  <TextField
                    select
                    label="Gün Seçin"
                    value={seciliGun}
                    onChange={(e) => setSeciliGun(e.target.value)}
                    fullWidth
                    size="small"
                    className="christmas-text"
                    SelectProps={{
                      native: true,
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'var(--christmas-red)',
                        },
                      }
                    }}
                  >
                    <option value="">Gün Seçin</option>
                    {gunler.map((gun) => (
                      <option key={gun} value={gun}>
                        {gun}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Saat Seçin"
                    value={seciliSaat}
                    onChange={(e) => setSeciliSaat(e.target.value)}
                    fullWidth
                    size="small"
                    className="christmas-text"
                    SelectProps={{
                      native: true,
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'var(--christmas-red)',
                        },
                      }
                    }}
                  >
                    <option value="">Saat Seçin</option>
                    {saatler.map((saat) => (
                      <option key={saat} value={saat}>
                        {saat}
                      </option>
                    ))}
                  </TextField>
                  <Button 
                    variant="contained" 
                    onClick={dersEkle}
                    className="christmas-button"
                    sx={{
                      py: 1,
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                    }}
                  >
                    Ders Ekle ⭐
                  </Button>
                </Box>
              </Paper>

              <Button 
                variant="contained"
                onClick={programiKaydet}
                className="christmas-button"
                sx={{
                  py: 1.5,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                Programı PDF Olarak İndir 🎅
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper 
              ref={tableRef}
              elevation={0}
              className="christmas-card"
              sx={{ 
                borderRadius: '20px',
                overflow: 'hidden',
                height: 'fit-content'
              }}
            >
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell 
                        className="christmas-text"
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '0.65rem',
                          borderBottom: '2px solid var(--christmas-red)',
                          textAlign: 'center',
                          py: 0.75,
                          px: 0.5,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: '#000000 !important'
                        }}
                      >
                        Saat
                      </TableCell>
                      {gunler.map((gun) => (
                        <TableCell 
                          key={gun}
                          className="christmas-text"
                          sx={{ 
                            fontWeight: 600,
                            fontSize: '0.65rem',
                            borderBottom: '2px solid var(--christmas-red)',
                            textAlign: 'center',
                            py: 0.75,
                            px: 0.5,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#000000 !important'
                          }}
                        >
                          {gun}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {saatler.map((saat) => (
                      <TableRow key={saat} hover>
                        <TableCell 
                          className="christmas-text"
                          sx={{ 
                            fontWeight: 500,
                            textAlign: 'center',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            fontSize: '0.65rem',
                            py: 0.5,
                            px: 0.5,
                            color: '#000000 !important'
                          }}
                        >
                          {saat}
                        </TableCell>
                        {gunler.map((gun) => (
                          <TableCell 
                            key={`${gun}-${saat}`}
                            sx={{ 
                              position: 'relative',
                              minWidth: '75px',
                              height: '28px',
                              p: 0.25,
                              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            {program[`${gun}-${saat}`] && (
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: 'rgba(212, 36, 38, 0.1)',
                                backdropFilter: 'blur(5px)',
                                borderRadius: '4px',
                                p: 0.25,
                                height: '100%',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: 'rgba(212, 36, 38, 0.15)',
                                  transform: 'translateY(-1px)',
                                  boxShadow: '0 2px 8px rgba(212, 36, 38, 0.15)'
                                }
                              }}>
                                <Typography 
                                  className="christmas-text"
                                  sx={{ 
                                    fontWeight: 500,
                                    flex: 1,
                                    textAlign: 'center',
                                    fontSize: '0.6rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    color: '#000000 !important'
                                  }}
                                >
                                  {program[`${gun}-${saat}`]}
                                </Typography>
                                <Button 
                                  size="small" 
                                  onClick={() => dersSil(gun, saat)}
                                  sx={{ 
                                    minWidth: 'auto',
                                    p: 0.25,
                                    ml: 0.25,
                                    color: 'var(--christmas-red)',
                                    fontSize: '0.55rem',
                                    borderRadius: '3px',
                                    '&:hover': {
                                      backgroundColor: 'rgba(212, 36, 38, 0.1)'
                                    }
                                  }}
                                >
                                  Sil
                                </Button>
                              </Box>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProgramOlustur; 