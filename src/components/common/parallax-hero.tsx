import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxHeroProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  children: React.ReactNode;
  overlayOpacity?: number; // 0 to 1
  minHeight?: string;
}

export default function ParallaxHero({ 
  imageUrl, 
  children, 
  className, 
  overlayOpacity = 0.5, 
  minHeight = '60vh', 
  ...props 
}: ParallaxHeroProps) {
  const overlayStyle = {
    backgroundColor: `rgba(0, 0, 0, ${Math.max(0, Math.min(1, overlayOpacity))})`,
  };

  return (
    <div
      className={cn(
        'relative w-full bg-cover bg-center bg-fixed flex items-center justify-center text-center text-foreground shadow-lg rounded-lg overflow-hidden',
        className
      )}
      style={{ 
        backgroundImage: `url(${imageUrl})`,
        minHeight: minHeight 
      }}
      {...props}
    >
      <div className="absolute inset-0" style={overlayStyle}></div>
      <div className="relative z-10 p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}
