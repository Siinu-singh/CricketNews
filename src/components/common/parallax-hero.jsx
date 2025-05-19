
"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils.js';

export default function ParallaxHero({
  imageUrl,
  children,
  className,
  overlayOpacity = 0.5,
  minHeight = '60vh',
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
          const maxScrollForEffect = height / 1.5; // Zoom effect applied over more of the hero's scroll

          if (scrollAmount > 0 && scrollAmount <= maxScrollForEffect) {
            // Increase scale from 1 to 1.1
            newScale = 1 + (scrollAmount / maxScrollForEffect) * 0.1; // Max scale 1.1
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
  }, [minHeight]); // Re-run if minHeight changes, as it affects calculations

  const overlayStyle = {
    backgroundColor: `rgba(0, 0, 0, ${Math.max(0, Math.min(1, overlayOpacity))})`,
  };

  return (
    <div
      ref={heroRef}
      className={cn(
        'relative w-full flex items-center justify-center text-center text-foreground overflow-hidden',
        className
      )}
      style={{
        minHeight: minHeight
      }}
      {...props}
    >
      {/* Inner div for the background image and scaling */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out" // Smoother transition
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `scale(${scale})`,
        }}
      />
      <div className="absolute inset-0" style={overlayStyle}></div>
      <div className="relative z-10 p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}
