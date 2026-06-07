import { useEffect, useState } from 'react';
import Hero from './Hero.jsx';
import HeroDesktop from './HeroDesktop.jsx';

const HeroGuard = () => {
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  if (isMobile === undefined) {
    return null;
  }

  return isMobile ? <Hero /> : <HeroDesktop />;
};

export default HeroGuard;
