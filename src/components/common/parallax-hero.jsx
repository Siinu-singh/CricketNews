
// import type { HTMLAttributes } from 'react'; // Type import removed
import { cn } from '@/lib/utils';

// interface ParallaxHeroProps extends HTMLAttributes<HTMLDivElement> { // Interface removed
//   imageUrl: string;
//   children: React.ReactNode;
//   overlayOpacity?: number; 
//   minHeight?: string;
// }

export default function ParallaxHero({ 
  imageUrl, 
  children, 
  className, 
  overlayOpacity = 0.5, 
  minHeight = '60vh', 
  ...props 
}) { // Type annotation removed
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

