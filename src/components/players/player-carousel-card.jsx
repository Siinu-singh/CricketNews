
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
    <div 
      className={cn(
        `relative w-[220px] h-[330px] sm:w-[240px] sm:h-[360px] md:w-[280px] md:h-[420px] lg:w-[300px] lg:h-[450px] 2xl:w-[320px] 2xl:h-[480px] 3xl:w-[350px] 3xl:h-[525px] transition-all duration-500 ease-out`,
        className
      )}
      style={style}
    >
      <div 
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
            fill
            sizes="(max-width: 640px) 220px, (max-width: 768px) 240px, (max-width: 1024px) 280px, (max-width: 1280px) 300px, (max-width: 1535px) 320px, 350px"
            className="object-cover z-0 group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={player.dataAiHint || "player portrait"}
            priority={true} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 2xl:p-7 3xl:p-8 z-20">
            <h3 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-white shadow-black/50 ">{player.name}</h3>
            <p className="text-xs sm:text-xs md:text-sm 2xl:text-base 3xl:text-lg text-gray-200">{player.role}</p>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-card text-card-foreground p-3 sm:p-4 2xl:p-5 3xl:p-6 rounded-xl shadow-2xl flex flex-col">
          <div className="flex-grow overflow-y-auto space-y-1 sm:space-y-1.5 2xl:space-y-1.5 text-xs sm:text-sm 2xl:text-base 3xl:text-lg pr-1.5 sm:pr-2"> 
            <h4 className="text-base sm:text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-primary mb-1 sm:mb-1.5 2xl:mb-1.5">{player.name}</h4>
            <p><span className="font-medium text-muted-foreground">Role:</span> {player.role}</p>
            <p><span className="font-medium text-muted-foreground">Team:</span> {player.nationality}</p>
            {player.battingStyle && <p><span className="font-medium text-muted-foreground">Batting:</span> {player.battingStyle}</p>}
            {player.bowlingStyle && <p><span className="font-medium text-muted-foreground">Bowling:</span> {player.bowlingStyle}</p>}
            
            {player.bio && (
              <>
                <Separator className="my-1.5 sm:my-2 2xl:my-3 bg-border" />
                <h5 className="font-semibold text-muted-foreground pt-1 sm:pt-1.5 2xl:pt-1.5">Bio:</h5>
                <p className="text-xs 2xl:text-sm 3xl:text-base leading-snug line-clamp-3 sm:line-clamp-4">{player.bio}</p>
              </>
            )}
            
            <Separator className="my-1.5 sm:my-2 2xl:my-3 bg-border" />
            <h5 className="font-semibold text-muted-foreground pt-1 sm:pt-1.5 2xl:pt-1.5">Key Stats:</h5>
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
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="mt-2 sm:mt-3 2xl:mt-4 w-full shrink-0 transition-transform duration-150 ease-in-out hover:scale-105 text-xs sm:text-sm 2xl:text-base 2xl:py-5 3xl:text-lg 3xl:py-6 h-8 sm:h-9 md:h-10"
          >
            <Link href={`/players/${player.id}`}>View Full Profile</Link>
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        aria-label={isFlipped ? `Hide details for ${player.name}` : `Show details for ${player.name}`}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-black/30 hover:bg-black/50 text-white rounded-full z-30 backdrop-blur-sm w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 transition-colors"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {isFlipped ? <X className="h-4 w-4 sm:h-5 md:h-6 2xl:h-7 3xl:h-8" /> : <Plus className="h-4 w-4 sm:h-5 md:h-6 2xl:h-7 3xl:h-8" />}
      </Button>
    </div>
  );
}
