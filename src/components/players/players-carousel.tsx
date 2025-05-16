
"use client";

import { useState, useEffect } from 'react';
import type { Player } from '@/types';
import PlayerCarouselCard from './player-carousel-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayersCarouselProps {
  players: Player[];
}

export default function PlayersCarousel({ players }: PlayersCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !players || players.length === 0) {
    return (
      <div className="flex items-center justify-center h-[450px]">
        <p className="text-muted-foreground">No players to display.</p>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? players.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === players.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getCardStyle = (index: number) => {
    const offset = index - currentIndex;
    const total = players.length;

    let adjustedOffset = offset;
    if (total > 1) { // Avoid division by zero or useless work for 1 item
        // This handles wrapping around (e.g. if current is 0, last card is -1 for prev, or first card is +1 for next if current is last)
        if (Math.abs(offset) > total / 2) {
            adjustedOffset = (offset > 0) ? offset - total : offset + total;
        }
    }
    
    let transform = 'translateX(0%) scale(0.6) rotateY(0deg)'; // A far-away default for cards not explicitly styled
    let opacity = 0;
    let zIndex = 0;
    let display = 'none'; // Default to hidden

    if (total === 1) {
        // Only the active card is shown
        if (adjustedOffset === 0) {
            transform = 'translateX(0%) scale(1)'; opacity = 1; zIndex = 20; display = 'block';
        }
    } else if (total === 2) {
        // Active and one other card in a specific side-by-side layout
        if (adjustedOffset === 0) { // Active
            transform = 'translateX(-25%) scale(0.9)'; opacity = 1; zIndex = 20; display = 'block';
        } else { // The other card (adjustedOffset will be 1 or -1 for the other item)
            transform = 'translateX(25%) scale(0.9)'; opacity = 0.8; zIndex = 10; display = 'block';
        }
    } else { // General case for 3 or more players
        switch (adjustedOffset) {
            case 0: // Active card
                transform = 'translateX(0%) scale(1)';
                opacity = 1;
                zIndex = 20;
                display = 'block';
                break;
            case 1: // Immediate Next card
                transform = 'translateX(60%) scale(0.85) rotateY(-30deg)';
                opacity = 0.7;
                zIndex = 10;
                display = 'block';
                break;
            case -1: // Immediate Previous card
                transform = 'translateX(-60%) scale(0.85) rotateY(30deg)';
                opacity = 0.7;
                zIndex = 10;
                display = 'block';
                break;
            case 2: // Second Next card
                if (total >= 4) { // Only show if there are at least 4 players (to have a card at position 2)
                    transform = 'translateX(100%) scale(0.70) rotateY(-45deg)';
                    opacity = 0.4;
                    zIndex = 5;
                    display = 'block';
                }
                break;
            case -2: // Second Previous card
                if (total >= 4) { // Only show if there are at least 4 players
                    transform = 'translateX(-100%) scale(0.70) rotateY(45deg)';
                    opacity = 0.4;
                    zIndex = 5;
                    display = 'block';
                }
                break;
            default:
                // Cards further than +/-2 remain hidden (initial values of display='none', opacity=0, zIndex=0 are kept)
                // Set transform for potential smooth future transitions if they were to become visible
                if (adjustedOffset < -2) {
                    transform = `translateX(-150%) scale(0.6) rotateY(60deg)`;
                } else { // adjustedOffset > 2
                    transform = `translateX(150%) scale(0.6) rotateY(-60deg)`;
                }
                // Opacity, zIndex, and display remain at their default hidden values
                break;
        }
    }
    
    return { transform, opacity, zIndex, display };
  };


  return (
    <div className="relative w-full flex flex-col items-center justify-center py-8 md:py-12">
      <div className="relative h-[450px] sm:h-[390px] md:h-[450px] w-full max-w-4xl flex items-center justify-center perspective-[1500px] overflow-hidden">
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
        <div className="mt-8 flex gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="rounded-full w-12 h-12 bg-card/70 hover:bg-card/90 backdrop-blur-sm border-border text-foreground shadow-md"
            aria-label="Previous player"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="rounded-full w-12 h-12 bg-card/70 hover:bg-card/90 backdrop-blur-sm border-border text-foreground shadow-md"
            aria-label="Next player"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
}

