
"use client";

import { useState, useEffect, useCallback } from 'react';
import PlayerCarouselCard from './player-carousel-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SWIPE_THRESHOLD = 50; // Minimum pixels for a swipe to be registered

export default function PlayersCarousel({ players }) {
  const initialIndex = players && players.length > 0 ? Math.floor(players.length / 2) : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // It's generally good practice to ensure currentIndex is valid if players array changes
  useEffect(() => {
    if (players && players.length > 0) {
      setCurrentIndex(current => Math.min(Math.max(0, current), players.length - 1));
    } else {
      setCurrentIndex(0);
    }
  }, [players]);

  const goToPrevious = useCallback(() => {
    if (!players || players.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? players.length - 1 : prevIndex - 1
    );
  }, [players?.length]);

  const goToNext = useCallback(() => {
    if (!players || players.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === players.length - 1 ? 0 : prevIndex + 1
    );
  }, [players?.length]);


  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null); // Reset touchEndX on new touch start
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) {
      return;
    }
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > SWIPE_THRESHOLD;
    const isRightSwipe = distance < -SWIPE_THRESHOLD;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    // Reset touch coordinates
    setTouchStartX(null);
    setTouchEndX(null);
  };


  if (!players || players.length === 0) {
    return (
      <div className="flex items-center justify-center h-[360px] sm:h-[450px] 2xl:h-[520px] 3xl:h-[600px]">
        <p className="text-muted-foreground text-sm sm:text-base 2xl:text-lg 3xl:text-xl">No players to display.</p>
      </div>
    );
  }

  const getCardStyle = (index) => {
    const offset = index - currentIndex;
    const total = players.length;

    let adjustedOffset = offset;
    if (total > 1) {
        if (Math.abs(offset) > total / 2) {
            adjustedOffset = (offset > 0) ? offset - total : offset + total;
        }
    }
    
    const baseTranslateXActive = '0%';
    const baseTranslateXAdjacent = '50%';
    const baseTranslateXFurther = '80%';
    const baseTranslateXOffscreen = '120%';

    const adjacentTranslateX = baseTranslateXAdjacent;
    const furtherTranslateX = baseTranslateXFurther;
    const offscreenTranslateX = baseTranslateXOffscreen;


    let transform = `translateX(${offscreenTranslateX}) scale(0.6) rotateY(-60deg)`;
    let opacity = 0;
    let zIndex = 0;
    let display = 'none';

    if (adjustedOffset > 0) {
         transform = `translateX(${offscreenTranslateX}) scale(0.6) rotateY(-60deg)`;
    } else if (adjustedOffset < 0) {
         transform = `translateX(-${offscreenTranslateX}) scale(0.6) rotateY(60deg)`;
    }


    if (total === 1) {
        if (adjustedOffset === 0) {
            transform = `translateX(${baseTranslateXActive}) scale(1)`; opacity = 1; zIndex = 20; display = 'block';
        }
    } else if (total === 2) {
        if (adjustedOffset === 0) {
            transform = `translateX(-20%) scale(0.9)`; opacity = 1; zIndex = 20; display = 'block';
        } else {
            transform = `translateX(20%) scale(0.9)`; opacity = 0.8; zIndex = 10; display = 'block';
        }
    } else {
        switch (adjustedOffset) {
            case 0:
                transform = `translateX(${baseTranslateXActive}) scale(1)`;
                opacity = 1;
                zIndex = 20;
                display = 'block';
                break;
            case 1:
                transform = `translateX(${adjacentTranslateX}) scale(0.85) rotateY(-25deg)`;
                opacity = 0.7;
                zIndex = 10;
                display = 'block';
                break;
            case -1:
                transform = `translateX(-${adjacentTranslateX}) scale(0.85) rotateY(25deg)`;
                opacity = 0.7;
                zIndex = 10;
                display = 'block';
                break;
            case 2:
                if (total >= 4) {
                    transform = `translateX(${furtherTranslateX}) scale(0.70) rotateY(-40deg)`;
                    opacity = 0.4;
                    zIndex = 5;
                    display = 'block';
                }
                break;
            case -2:
                if (total >= 4) {
                    transform = `translateX(-${furtherTranslateX}) scale(0.70) rotateY(40deg)`;
                    opacity = 0.4;
                    zIndex = 5;
                    display = 'block';
                }
                break;
        }
    }
    
    return { transform, opacity, zIndex, display };
  };


  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 sm:py-8 md:py-12 2xl:py-16">
      <div
        className="relative h-[360px] sm:h-[390px] md:h-[450px] lg:h-[480px] 2xl:h-[560px] 3xl:h-[630px] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl flex items-center justify-center perspective-[1000px] sm:perspective-[1200px] md:perspective-[1500px] 2xl:perspective-[2000px] overflow-hidden px-2"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {players.map((player, index) => (
          <div
            key={player.id}
            className="absolute transition-all duration-500 ease-out"
            style={getCardStyle(index)}
          >
            <PlayerCarouselCard player={player} />
          </div>
        ))}
      </div>

      {players.length > 1 && (
        <div className="hidden md:flex mt-6 sm:mt-8 2xl:mt-12 3xl:mt-16 gap-3 sm:gap-4 2xl:gap-6">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 bg-card/70 hover:bg-card/90 backdrop-blur-sm border-border text-foreground shadow-md"
            aria-label="Previous player"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 2xl:h-7 3xl:h-8" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 bg-card/70 hover:bg-card/90 backdrop-blur-sm border-border text-foreground shadow-md"
            aria-label="Next player"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 2xl:h-7 3xl:h-8" />
          </Button>
        </div>
      )}
    </div>
  );
}
