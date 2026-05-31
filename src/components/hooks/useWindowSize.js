import { useState, useEffect } from 'react';

function useWindowSize() {
  // Start with 0/0 so server-rendered HTML matches the initial client render.
  // The real dimensions are set in useEffect, which runs only after hydration.
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
