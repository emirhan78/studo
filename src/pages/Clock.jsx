import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: 'calc(100vh - 64px)',
      p: 2
    }}>
      <Paper sx={{ 
        p: 4, 
        textAlign: 'center',
        background: 'linear-gradient(45deg, #D42426 30%, #FF4B4B 90%)',
        borderRadius: 2,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        width: '100%',
        maxWidth: 400
      }}>
        <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          {currentTime.toLocaleTimeString('tr-TR')}
        </Typography>
        <Typography variant="h5" component="div">
          {currentTime.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
      </Paper>
    </Box>
  );
}

export default Clock; 