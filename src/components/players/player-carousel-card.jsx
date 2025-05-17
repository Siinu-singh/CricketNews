
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import { Separator } from '@/components/ui/separator';

export default function PlayerCarouselCard({ player, style, className }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div // This div receives style from the carousel (transform, opacity, zIndex)
      className={cn(
        `relative w-[280px] h-[420px] sm:w-[240px] sm:h-[360px] md:w-[280px] md:h-[420px] transition-all duration-500 ease-out`,
        className
      )}
      style={style}
    >
      <div // This inner div handles the flip animation
        className={cn(
          'relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]',
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        )}
      >
        {/* Front Face */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl shadow-2xl overflow-hidden group">
          <Image
            src={player.photoUrl}
            alt={player.name}
            layout="fill"
            objectFit="cover"
            className="z-0 group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={player.dataAiHint || "player portrait"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20">
            <h3 className="text-xl md:text-2xl font-bold text-white shadow-black/50 ">{player.name}</h3>
            <p className="text-xs md:text-sm text-gray-200">{player.role}</p>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-card text-card-foreground p-4 rounded-xl shadow-2xl flex flex-col">
          <div className="flex-grow overflow-y-auto space-y-1 text-sm pr-2"> {/* Added pr-2 for scrollbar spacing */}
            <h4 className="text-lg font-semibold text-primary mb-1">{player.name}</h4>
            <p><span className="font-medium text-muted-foreground">Role:</span> {player.role}</p>
            <p><span className="font-medium text-muted-foreground">Team:</span> {player.nationality}</p>
            {player.battingStyle && <p><span className="font-medium text-muted-foreground">Batting:</span> {player.battingStyle}</p>}
            {player.bowlingStyle && <p><span className="font-medium text-muted-foreground">Bowling:</span> {player.bowlingStyle}</p>}
            
            {player.bio && (
              <>
                <Separator className="my-2 bg-border" />
                <h5 className="font-semibold text-muted-foreground pt-1">Bio:</h5>
                <p className="text-xs leading-snug line-clamp-4">{player.bio}</p>
              </>
            )}
            
            <Separator className="my-2 bg-border" />
            <h5 className="font-semibold text-muted-foreground pt-1">Key Stats:</h5>
            {player.stats && (
              <>
                <p><span className="font-medium">Matches:</span> {player.stats.matches}</p>
                {player.stats.runs !== undefined && <p><span className="font-medium">Runs:</span> {player.stats.runs}</p>}
                {player.stats.wickets !== undefined && <p><span className="font-medium">Wickets:</span> {player.stats.wickets}</p>}
                 {player.stats.average !== undefined && <p><span className="font-medium">Avg:</span> {typeof player.stats.average === 'number' ? player.stats.average.toFixed(2) : player.stats.average}</p>}
                {player.stats.strikeRate !== undefined && <p><span className="font-medium">SR:</span> {typeof player.stats.strikeRate === 'number' ? player.stats.strikeRate.toFixed(2) : player.stats.strikeRate}</p>}
              </>
            )}
          </div>
          <Button variant="outline" size="sm" asChild className="mt-3 w-full shrink-0">
            <Link href={`/players/${player.id}`}>View Full Profile</Link>
          </Button>
        </div>
      </div>

      {/* Flip Button - positioned relative to the outer styled div */}
      <Button
        variant="ghost"
        size="icon"
        aria-label={isFlipped ? `Hide details for ${player.name}` : `Show details for ${player.name}`}
        className="absolute top-3 right-3 md:top-4 md:right-4 bg-black/30 hover:bg-black/50 text-white rounded-full z-30 backdrop-blur-sm w-10 h-10 md:w-12 md:h-12 transition-colors"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {isFlipped ? <X className="h-5 w-5 md:h-6 md:w-6" /> : <Plus className="h-5 w-5 md:h-6 md:w-6" />}
      </Button>
    </div>
  );
}
