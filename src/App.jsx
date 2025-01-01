import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProgramOlustur from './pages/ProgramOlustur';
import HazirProgramlar from './pages/HazirProgramlar';
import NotAl from './pages/NotAl';
import HesapMakinesi from './pages/HesapMakinesi';
import Clock from './pages/Clock';
import BackgroundMusic from './components/BackgroundMusic';
import Snowfall from './components/Snowfall';

function App() {
  console.log('Clock component:', Clock); // Debug için

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
        <Navbar />
        <BackgroundMusic />
        <Snowfall />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/program-olustur" element={<ProgramOlustur />} />
          <Route path="/hazir-programlar" element={<HazirProgramlar />} />
          <Route path="/not-al" element={<NotAl />} />
          <Route path="/hesap-makinesi" element={<HesapMakinesi />} />
          <Route path="/saat" element={<Clock />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 