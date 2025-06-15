
"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils.js';

export default function ParallaxHero({
  imageUrl,
  children,
  className,
  overlayOpacity = 0.5,
  minHeight = '60vh', // Default, can be overridden by responsive classes in `className`
  ...props
}) {
  const [scale, setScale] = useState(1);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const { top, height } = heroRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        let newScale = 1;
        // Only apply effect if hero is somewhat in view from the top
        if (top < viewportHeight && top + height > 0) {
          const scrollAmount = Math.max(0, -top); // How much the top of the hero is scrolled above the viewport
          // Increase the denominator to make the zoom effect progress over a larger scroll distance (slower zoom)
          // Decrease it to make it faster. Height / 1.5 means effect completes over 2/3 of hero height scrolled.
          const maxScrollForEffect = height / 1.5; 

          if (scrollAmount > 0 && scrollAmount <= maxScrollForEffect) {
            // Zoom up to 1.1 (10% zoom)
            newScale = 1 + (scrollAmount / maxScrollForEffect) * 0.1; 
          } else if (scrollAmount > maxScrollForEffect) {
            newScale = 1.1; // Keep max scale if scrolled further
          } else {
            newScale = 1; // Reset if scrolled back up fully
          }
        }
        setScale(Math.min(newScale, 1.1)); // Cap max scale
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  const overlayStyle = {
    backgroundColor: `rgba(0, 0, 0, ${Math.max(0, Math.min(1, overlayOpacity))})`,
  };

  return (
    <div
      ref={heroRef}
      className={cn(
        'relative w-full flex items-center justify-center text-center text-foreground overflow-hidden',
        className // className can now include responsive minHeight like 2xl:min-h-[70vh]
      )}
      style={{
        minHeight: !className?.includes('min-h-') ? minHeight : undefined // Apply default minHeight only if not specified in className
      }}
      {...props}
    >
      {/* Inner div for the background image and scaling */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out" 
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `scale(${scale})`,
        }}
      />
      <div className="absolute inset-0" style={overlayStyle}></div>
      {/* Removed p-4 sm:p-8 from this div to let children control their padding */}
      <div className="relative z-10 w-full"> 
        {children}
      </div>
    </div>
  );
}
