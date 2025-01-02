import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Menu, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsIcon from '@mui/icons-material/Settings';

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // Kronometre state'leri
  const [chronoTime, setChronoTime] = useState(0);
  const [isChronoRunning, setIsChronoRunning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Kronometre için useEffect
  useEffect(() => {
    let chronoInterval;
    if (isChronoRunning) {
      chronoInterval = setInterval(() => {
        setChronoTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(chronoInterval);
  }, [isChronoRunning]);

  useEffect(() => {
    let pomodoroTimer;
    if (isRunning && pomodoroTime > 0) {
      pomodoroTimer = setInterval(() => {
        setPomodoroTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setIsBreak(!isBreak);
            return isBreak ? workTime * 60 : breakTime * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(pomodoroTimer);
  }, [isRunning, isBreak, workTime, breakTime]);

  // Kronometre fonksiyonları
  const startChrono = () => setIsChronoRunning(true);
  const pauseChrono = () => setIsChronoRunning(false);
  const resetChrono = () => {
    setIsChronoRunning(false);
    setChronoTime(0);
  };

  const formatChronoTime = () => {
    const hours = Math.floor(chronoTime / 3600);
    const minutes = Math.floor((chronoTime % 3600) / 60);
    const seconds = chronoTime % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startPomodoro = () => setIsRunning(true);
  const pausePomodoro = () => setIsRunning(false);
  const resetPomodoro = () => {
    setIsRunning(false);
    setIsBreak(false);
    setPomodoroTime(workTime * 60);
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatPomodoroTime = () => {
    const minutes = Math.floor(pomodoroTime / 60);
    const seconds = pomodoroTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 56px)',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '800px',
          textAlign: 'center',
        }}
      >
        {/* Günler */}
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
            mb: 3,
          }}
        >
          {daysOfWeek.map((day, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: currentTime.getDay() === index ? '#fff' : '#555',
                transition: 'color 0.3s ease',
              }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        {/* Büyük Saat */}
        <Typography
          sx={{
            fontSize: '144px',
            fontFamily: "'DS-Digital', sans-serif",
            margin: 0,
            lineHeight: 1,
            color: '#fff',
            textShadow: '0 0 30px rgba(255,255,255,0.2)',
            mb: 6,
          }}
        >
          {currentTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>

        {/* Alt Kısım - Kronometre ve Pomodoro yan yana */}
        <Box sx={{ 
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* Kronometre */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '64px',
                fontFamily: "'DS-Digital', sans-serif",
                color: '#1E90FF',
                textShadow: '0 0 20px rgba(30,144,255,0.3)',
                mb: 1,
              }}
            >
              {formatChronoTime()}
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                color: '#888',
                mb: 2,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Kronometre
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton
                onClick={isChronoRunning ? pauseChrono : startChrono}
                sx={{
                  color: isChronoRunning ? '#ff4444' : '#4CAF50',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                {isChronoRunning ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton
                onClick={resetChrono}
                sx={{
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                <RestartAltIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Pomodoro Zamanlayıcı */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '64px',
                fontFamily: "'DS-Digital', sans-serif",
                color: isBreak ? '#4CAF50' : '#ff4444',
                textShadow: isBreak 
                  ? '0 0 20px rgba(76,175,80,0.3)'
                  : '0 0 20px rgba(255,68,68,0.3)',
                mb: 1,
              }}
            >
              {formatPomodoroTime()}
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '16px', 
                color: '#888', 
                mb: 2,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {isBreak ? 'Mola' : 'Pomodoro'} 
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton
                onClick={isRunning ? pausePomodoro : startPomodoro}
                sx={{
                  color: isRunning ? '#ff4444' : '#4CAF50',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton
                onClick={resetPomodoro}
                sx={{
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                <RestartAltIcon />
              </IconButton>
              <IconButton
                onClick={handleSettingsClick}
                sx={{
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Ayarlar Menüsü */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#333',
            color: '#fff',
            minWidth: '250px',
            p: 2,
            '& .MuiSlider-root': {
              color: '#4CAF50',
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography sx={{ mb: 1 }}>Çalışma Süresi (dk)</Typography>
          <Slider
            value={workTime}
            onChange={(e, newValue) => setWorkTime(newValue)}
            min={1}
            max={60}
            valueLabelDisplay="auto"
            disabled={isRunning}
          />
          <Typography sx={{ mt: 2, mb: 1 }}>Mola Süresi (dk)</Typography>
          <Slider
            value={breakTime}
            onChange={(e, newValue) => setBreakTime(newValue)}
            min={1}
            max={30}
            valueLabelDisplay="auto"
            disabled={isRunning}
          />
        </Box>
      </Menu>
    </Box>
  );
}

export default Clock;
