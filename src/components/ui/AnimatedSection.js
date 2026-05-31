import React, { useMemo } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const OBSERVER_OPTIONS = { threshold: 0.1 };

const AnimatedSection = ({ children, className = '' }) => {
  const [ref, isIntersecting] = useIntersectionObserver(OBSERVER_OPTIONS);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
