import React, { useState, useRef, useLayoutEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

const ReadMore = ({
  children,
  initialMaxHeight,
  gradientBackgroundClass = 'from-slate-50',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);
  const { width } = useWindowSize();
  const isMobile = width > 0 && width < 768; // Tailwind 'md' breakpoint

  useLayoutEffect(() => {
    const checkOverflow = () => {
      const element = contentRef.current;
      
      if (!element || !isMobile) {
        setIsOverflowing(false);
        return;
      }

      // Check if the content's full scroll height is greater than its visible client height.
      // A 1px buffer is added for robustness against subpixel rendering inconsistencies.
      const hasOverflow = element.scrollHeight > element.clientHeight + 1;
      
      // Only update state if it has actually changed to prevent unnecessary re-renders.
      setIsOverflowing(current => current !== hasOverflow ? hasOverflow : current);
    };

    // Run the check after a short delay (e.g., 100ms). This gives the browser
    // time to complete its layout and paint calculations, ensuring that
    // scrollHeight and clientHeight are accurate, especially for complex children.
    const timeoutId = setTimeout(checkOverflow, 100);

    return () => clearTimeout(timeoutId);
  }, [isMobile, children, width, initialMaxHeight]);


  if (!isMobile) {
    return <>{children}</>;
  }
  
  const viaClass = gradientBackgroundClass.replace('from-', 'via-');

  return (
    <div>
      <div
        ref={contentRef}
        className={`relative transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[2000px]' : initialMaxHeight
        }`}
      >
        {children}
        {!isExpanded && isOverflowing && (
          <div
            className={`absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t ${gradientBackgroundClass} ${viaClass} to-transparent pointer-events-none`}
            aria-hidden="true"
          />
        )}
      </div>
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default ReadMore;