
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'; // Removed RadioTower
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TeamCarouselCard = ({ team, isActive }) => {
  if (!team) return null;

  const accentColorHsl = team.accentColor || '210 100% 50%'; 

  return (
    <div 
      className={cn(
        "relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl transition-all duration-500 ease-in-out group",
        isActive ? "scale-100 opacity-100" : "scale-90 opacity-60",
        "border-2 border-transparent",
        isActive && "border-primary shadow-primary/40"
      )}
      style={{
        '--team-accent-color-hsl': accentColorHsl,
        '--team-accent-color': `hsl(${accentColorHsl})`,
      }}
    >
      <Image
        src={team.bannerImageUrlLarge || 'https://placehold.co/1200x800.png'}
        alt={`${team.name} banner`}
        fill
        className="object-cover absolute inset-0 z-0 transition-transform duration-700 ease-in-out group-hover:scale-105"
        data-ai-hint={team.bannerDataAiHint || "team action background"}
        priority={isActive} 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(180deg, hsla(${accentColorHsl}, 0.2) 0%, hsla(${accentColorHsl}, 0.4) 30%, hsla(0,0%,0%,0.6) 70%, hsla(0,0%,0%,0.8) 100%)`
        }}
      />
      
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-3 sm:p-4 md:p-6 lg:p-8 2xl:p-10">
        <div className="bg-card/70 dark:bg-popover/70 backdrop-blur-md p-3 sm:p-4 md:p-6 2xl:p-8 rounded-lg sm:rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md text-center border border-card-foreground/10">
          <Image
            src={team.logoUrl || 'https://placehold.co/100x100.png'}
            alt={`${team.name} logo`}
            width={64} 
            height={64}
            className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 2xl:w-24 2xl:h-24 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full border-2 border-background shadow-lg bg-background"
            data-ai-hint={team.dataAiHint || "team logo"}
          />
          <h3 
            className={cn(
              "text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-foreground mb-1.5 sm:mb-2",
              isActive && "text-glow-team-accent"
            )}
          >
            {team.name}
          </h3>
          <Button variant="default" asChild size="sm" className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm 2xl:text-base 2xl:px-5 2xl:py-5 h-8 sm:h-9 md:h-10">
            <Link href={`/teams/${team.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};


export default function AdvancedTeamCarousel({ teams }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  const totalSlides = teams.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const startAutoplay = useCallback(() => {
    if (!isPlaying || totalSlides <= 1) return;
    clearInterval(autoplayIntervalRef.current);
    autoplayIntervalRef.current = setInterval(() => {
      if (!isInteracting) {
        handleNext();
      }
    }, 5000);
  }, [isPlaying, totalSlides, handleNext, isInteracting]);

  const stopAutoplay = () => {
    clearInterval(autoplayIntervalRef.current);
  };

  const handleInteractionStart = () => {
    setIsInteracting(true);
    stopAutoplay();
    clearTimeout(interactionTimeoutRef.current);
  };

  const handleInteractionEnd = () => {
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
      if (isPlaying) {
        startAutoplay();
      }
    }, 3000); 
  };

  useEffect(() => {
    if (isPlaying && !isInteracting) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isPlaying, isInteracting, currentIndex, startAutoplay]);


  if (!teams || teams.length === 0) {
    return <p className="text-center text-muted-foreground text-sm sm:text-base">No teams to display.</p>;
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 2xl:py-12">
      <div 
        className="relative h-[45vh] min-h-[350px] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] 2xl:h-[70vh] 3xl:h-[75vh] w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl overflow-hidden"
        onMouseEnter={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onTouchEnd={handleInteractionEnd}
      >
        {teams.map((team, index) => (
          <div
            key={team.id}
            className={cn(
              "absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out flex items-center justify-center",
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 -z-10',
              // Adjust transforms for peeking cards if desired for visual effect
              // index === (currentIndex - 1 + totalSlides) % totalSlides ? 'transform -translate-x-full scale-75 opacity-50' : '',
              // index === (currentIndex + 1) % totalSlides ? 'transform translate-x-full scale-75 opacity-50' : ''
            )}
            style={{
              transform: index === currentIndex 
                ? 'translateX(0%) scale(1)' 
                : index < currentIndex 
                ? `translateX(-${50 + (currentIndex - index -1) * 10}%) scale(0.8)` // Example peeking logic
                : `translateX(${50 + (index - currentIndex -1) * 10}%) scale(0.8)`  // Example peeking logic
            }}
          >
            <div className={cn(
              "w-[85%] sm:w-[80%] md:w-[70%] lg:w-[65%] xl:w-[60%] 2xl:w-[60%] 3xl:w-[55%] h-[85%] sm:h-[90%]",
              index !== currentIndex && "pointer-events-none" 
            )}>
              <TeamCarouselCard team={team} isActive={index === currentIndex} />
            </div>
          </div>
        ))}
      </div>

      {totalSlides > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => { handlePrev(); handleInteractionStart(); handleInteractionEnd(); }}
            className="absolute left-1 sm:left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 bg-background/70 hover:bg-background/90 backdrop-blur-sm text-foreground"
            aria-label="Previous team"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 md:h-6 2xl:h-7" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => { handleNext(); handleInteractionStart(); handleInteractionEnd(); }}
            className="absolute right-1 sm:right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 bg-background/70 hover:bg-background/90 backdrop-blur-sm text-foreground"
            aria-label="Next team"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 md:h-6 2xl:h-7" />
          </Button>

          <div className="absolute bottom-2 sm:bottom-4 2xl:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 md:gap-3 p-1.5 sm:p-2 bg-background/60 dark:bg-popover/60 backdrop-blur-md rounded-full shadow-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { setIsPlaying(!isPlaying); handleInteractionStart(); handleInteractionEnd(); }}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 rounded-full text-foreground hover:bg-foreground/10"
              aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            >
              {isPlaying ? <Pause className="h-3 w-3 sm:h-4 md:h-5" /> : <Play className="h-3 w-3 sm:h-4 md:h-5" />}
            </Button>
            {teams.map((_, index) => (
              <button
                key={index}
                onClick={() => { goToSlide(index); handleInteractionStart(); handleInteractionEnd(); }}
                aria-label={`Go to team ${index + 1}`}
                className={cn(
                  "w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 2xl:w-3 2xl:h-3 rounded-full transition-all duration-300 ease-in-out",
                  currentIndex === index ? "bg-primary scale-125" : "bg-muted-foreground/50 hover:bg-muted-foreground/80"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
