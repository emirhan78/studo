import React, { useEffect } from 'react';

function Snowfall({
  frequency = 150, // Kar tanesi oluşturma sıklığı (ms)
  colors = ['#ffffff', 'rgb(174, 199, 210)', '#cce7ff'], // Kar tanesi renkleri
  sizeRange = [10, 40], // Kar tanelerinin minimum ve maksimum boyutları
}) {
  useEffect(() => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none'; // Tıklamayı engeller
    container.style.overflow = 'hidden';
    container.style.zIndex = '1000'; // Üst katman
    document.body.appendChild(container);

    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.style.position = 'absolute';
      snowflake.style.top = '-10px';
      snowflake.style.left = Math.random() * window.innerWidth + 'px';
      snowflake.style.color = colors[Math.floor(Math.random() * colors.length)];
      snowflake.style.animation = `fall ${Math.random() * 3 + 3}s linear`;
      snowflake.style.fontSize = `${Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]}px`;
      snowflake.style.opacity = Math.random() * 0.7 + 0.3;
      snowflake.innerHTML = '❄';
      container.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 6000);
    };

    const snowfallInterval = setInterval(createSnowflake, frequency);

    return () => {
      clearInterval(snowfallInterval);
      container.remove();
    };
  }, [frequency, colors, sizeRange]);

  return (
    <style>
      {`
        @keyframes fall {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .snowflake {
          pointer-events: none;
        }
      `}
    </style>
  );
}

export default Snowfall;
