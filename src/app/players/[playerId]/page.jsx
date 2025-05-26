
import { mockPlayers } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Star, Flag, Zap } from "lucide-react"; 
import ParallaxHero from "@/components/common/parallax-hero";
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const player = mockPlayers.find(p => p.id === params.playerId);
  if (!player) {
    return {
      title: 'Player Not Found | CricNow',
      description: 'The requested player profile could not be found.',
    };
  }

  return {
    title: `${player.name} - Cricket Player Profile & Stats`,
    description: `View detailed cricket profile, career statistics, batting and bowling style for ${player.name}, the ${player.nationality} ${player.role}.`,
    keywords: [player.name, player.nationality, player.role, 'cricket player', 'stats', 'profile'],
    openGraph: {
      title: `${player.name} - CricNow Player Profile`,
      description: `Detailed stats and profile for ${player.name}.`,
      url: `https://yourdomain.com/players/${player.id}`, // Replace
      type: 'profile',
      profile: {
        firstName: player.name.split(' ')[0],
        lastName: player.name.split(' ').slice(1).join(' '),
      },
      images: [
        {
          url: player.photoUrl || 'https://yourdomain.com/og-default-player.png', // Replace with a default
          width: 400,
          height: 400,
          alt: player.name,
        },
      ],
    },
    twitter: {
      title: `${player.name} - Cricket Profile | CricNow`,
      description: `Explore ${player.name}'s career stats and bio.`,
      images: [player.photoUrl || 'https://yourdomain.com/twitter-default-player.png'], // Replace
    },
    alternates: {
      canonical: `https://yourdomain.com/players/${player.id}`, // Replace
    },
  };
}

export default function PlayerProfilePage({ params }) { 
  const player = mockPlayers.find(p => p.id === params.playerId);

  if (!player) {
    notFound(); 
  }

  return (
    <div className="space-y-8 md:space-y-12">
       <ParallaxHero 
         imageUrl={player.photoUrl || "https://placehold.co/1600x400.png"} 
         data-ai-hint="player action cricket" 
         minHeight="350px" 
         overlayOpacity={0.5}
         className="mx-[-1rem] md:mx-[-1.5rem] lg:mx-[-2rem]"
       >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32 mb-4 border-4 border-background shadow-xl">
            <AvatarImage src={player.photoUrl} alt={`${player.name} portrait`} />
            <AvatarFallback className="text-3xl sm:text-4xl">{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-background">{player.name}</h1>
          <p className="text-lg sm:text-xl text-accent font-medium">{player.role}</p>
        </div>
      </ParallaxHero>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8 md:space-y-12">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">Player Overview</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <Badge variant="secondary" className="py-1 px-2 sm:px-3"><Flag className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />{player.nationality}</Badge>
              {player.battingStyle && <Badge variant="outline" className="py-1 px-2 sm:px-3">Batting: {player.battingStyle}</Badge>}
              {player.bowlingStyle && <Badge variant="outline" className="py-1 px-2 sm:px-3">Bowling: {player.bowlingStyle}</Badge>}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {player.bio && <p className="text-muted-foreground mb-6 text-sm sm:text-base">{player.bio}</p>}
            
            <Separator className="my-6" />

            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center"><BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary"/>Career Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatItem label="Matches" value={player.stats.matches.toString()} />
              <StatItem label="Runs Scored" value={player.stats.runs.toString()} />
              <StatItem label="Average" value={player.stats.average.toFixed(2)} />
              {player.stats.strikeRate && <StatItem label="Strike Rate" value={player.stats.strikeRate.toFixed(2)} icon={<Zap className="w-4 h-4 text-yellow-500"/>} />}
              {player.stats.wickets !== undefined && <StatItem label="Wickets" value={player.stats.wickets.toString()} />}
              {player.stats.economyRate && <StatItem label="Economy Rate" value={player.stats.economyRate.toFixed(2)} />}
              {player.stats.highestScore && <StatItem label="Highest Score" value={player.stats.highestScore} icon={<Star className="w-4 h-4 text-amber-500"/>} />}
              {player.stats.bestBowling && <StatItem label="Best Bowling" value={player.stats.bestBowling} icon={<Star className="w-4 h-4 text-amber-500"/>} />}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatItem({ label, value, icon }) { 
  return (
    <div className="bg-card p-3 sm:p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs sm:text-sm text-muted-foreground mb-1 flex items-center">
        {icon && <span className="mr-1.5">{icon}</span>}
        {label}
      </p>
      <p className="text-xl sm:text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}
