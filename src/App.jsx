import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProgramOlustur from './pages/ProgramOlustur';
import HazirProgramlar from './pages/HazirProgramlar';
import NotAl from './pages/NotAl';
import HesapMakinesi from './pages/HesapMakinesi';
import Clock from './pages/Clock';
import BackgroundMusic from './components/BackgroundMusic';
import Snowfall from './components/Snowfall';

// Noel teması
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D42426',
    },
    secondary: {
      main: '#1E90FF',
    },
    background: {
      default: '#fff8e1',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#D42426',
    },
  },
  typography: {
    fontFamily: `'Raleway', sans-serif`,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.8,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div
          style={{
            minHeight: '100vh',
            position: 'relative',
            background: 'linear-gradient(to bottom, #dff9fb, #ffeaa7)',
            overflow: 'hidden',
          }}
        >
          <Navbar />
          <BackgroundMusic />
          <Snowfall frequency={150} colors={['#ffffff', '#cce7ff', 'rgb(174, 199, 210)']} sizeRange={[10, 25]} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/program-olustur" element={<ProgramOlustur />} />
            <Route path="/hazir-programlar" element={<HazirProgramlar />} />
            <Route path="/not-al" element={<NotAl />} />
            <Route path="/hesap-makinesi" element={<HesapMakinesi />} />
            <Route path="/saat" element={<Clock />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;