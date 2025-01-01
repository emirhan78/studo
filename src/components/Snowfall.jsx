import React, { useEffect } from 'react';

function Snowfall() {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.style.left = Math.random() * window.innerWidth + 'px';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.opacity = Math.random();
      snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
      snowflake.innerHTML = '❄';
      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 5000);
    };

    const snowfallInterval = setInterval(createSnowflake, 100);

    return () => {
      clearInterval(snowfallInterval);
      const snowflakes = document.querySelectorAll('.snowflake');
      snowflakes.forEach(flake => flake.remove());
    };
  }, []);

  return null;
}

export default Snowfall; 