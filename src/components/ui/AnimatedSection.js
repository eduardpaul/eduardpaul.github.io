
import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const AnimatedSection = ({ children, className }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
