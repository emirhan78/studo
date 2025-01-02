import React, { createContext, useContext, useState } from 'react';

const FullScreenContext = createContext();

export const useFullScreen = () => useContext(FullScreenContext);

export const FullScreenProvider = ({ children }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <FullScreenContext.Provider value={{ isFullScreen, toggleFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
}; 