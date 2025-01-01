import React, { useState, useEffect } from 'react';
import { IconButton, Box } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import christmasMusic from '../assets/christmas.mp3';

function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(christmasMusic));

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.02; // Ses seviyesi %10
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Müzik başladı');
          })
          .catch(error => {
            console.error('Müzik çalma hatası:', error);
          });
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Box sx={{ 
      position: 'fixed', 
      bottom: 20, 
      right: 20, 
      zIndex: 1000 
    }}>
      <IconButton 
        onClick={togglePlay}
        sx={{
          backgroundColor: 'rgba(212, 36, 38, 0.9)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(212, 36, 38, 1)'
          },
          boxShadow: '0 2px 8px rgba(212, 36, 38, 0.3)'
        }}
      >
        {isPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </IconButton>
    </Box>
  );
}

export default BackgroundMusic; 