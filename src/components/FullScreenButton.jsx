import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useFullScreen } from '../context/FullScreenContext';

const FullScreenButton = () => {
  const { isFullScreen, toggleFullScreen } = useFullScreen();

  return (
    <Tooltip title={isFullScreen ? "Tam Ekrandan Çık" : "Tam Ekran"}>
      <Fab
        size="medium"
        onClick={toggleFullScreen}
        sx={{
          position: 'fixed',
          left: 20,
          bottom: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          transition: 'all 0.3s ease',
          zIndex: 9999,
        }}
      >
        {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </Fab>
    </Tooltip>
  );
};

export default FullScreenButton; 