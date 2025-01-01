import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'black',
      }}
    >
      {/* Dijital saat tasarımı */}
      <Box
        sx={{
          position: 'relative',
          padding: 3,
          backgroundColor: '#222',
          color: '#fff',
          borderRadius: 2,
          width: '300px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        }}
      >
        {/* Günler */}
        <Box sx={{ textAlign: 'left', position: 'absolute', top: 8, left: 16 }}>
          {daysOfWeek.map((day, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: currentTime.getDay() === index ? '#fff' : '#555',
              }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        {/* Saat */}
        <Typography
          sx={{
            fontSize: '72px',
            fontFamily: "'DS-Digital', sans-serif",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {currentTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Box>
    </Box>
  );
}

export default Clock;
