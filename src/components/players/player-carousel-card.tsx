import type { Player } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface PlayerCarouselCardProps {
  player: Player;
  style?: React.CSSProperties;
  className?: string;
}

export default function PlayerCarouselCard({ player, style, className }: PlayerCarouselCardProps) {
  return (
    <Card 
      className={`relative w-[280px] h-[420px] sm:w-[240px] sm:h-[360px] md:w-[280px] md:h-[420px] overflow-hidden rounded-xl shadow-2xl group ${className}`}
      style={style}
    >
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

      <Link href={`/players/${player.id}`} passHref legacyBehavior>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label={`View profile of ${player.name}`}
          className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/20 hover:bg-white/40 text-white rounded-full z-20 backdrop-blur-sm w-10 h-10 md:w-12 md:h-12"
        >
          <Plus className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </Link>
    </Card>
  );
}
