
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
      title: 'Player Not Found | CricketNews',
      description: 'The requested player profile could not be found.',
    };
  }

  return {
    title: `${player.name} - Cricket Player Profile & Stats | CricketNews`,
    description: `View detailed cricket profile, career statistics, batting and bowling style for ${player.name}, the ${player.nationality} ${player.role} on CricketNews.`,
    keywords: [player.name, player.nationality, player.role, 'cricket player', 'stats', 'profile', 'cricketnews'],
    openGraph: {
      title: `${player.name} - CricketNews Player Profile`,
      description: `Detailed stats and profile for ${player.name} on CricketNews.`,
      url: `https://yourdomain.com/players/${player.id}`, 
      type: 'profile',
      profile: {
        firstName: player.name.split(' ')[0],
        lastName: player.name.split(' ').slice(1).join(' '),
      },
      images: [
        {
          url: player.photoUrl || 'https://yourdomain.com/og-default-player.png', 
          width: 400,
          height: 400,
          alt: player.name,
        },
      ],
    },
    twitter: {
      title: `${player.name} - Cricket Profile | CricketNews`,
      description: `Explore ${player.name}'s career stats and bio on CricketNews.`,
      images: [player.photoUrl || 'https://yourdomain.com/twitter-default-player.png'], 
    },
    alternates: {
      canonical: `https://yourdomain.com/players/${player.id}`, 
    },
  };
}

export default function PlayerProfilePage({ params }) { 
  const player = mockPlayers.find(p => p.id === params.playerId);

  if (!player) {
    notFound(); 
  }

  return (
    <div className="space-y-6 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
       <ParallaxHero 
         imageUrl={player.photoUrl || "https://placehold.co/1600x400.png"} 
         data-ai-hint="player action cricket" 
         minHeight="40vh"
         className="sm:min-h-[45vh] md:min-h-[50vh] 2xl:min-h-[350px] 3xl:min-h-[400px]"
         overlayOpacity={0.5}
       >
        <div className="container flex flex-col items-center text-center">
          <Avatar className="w-20 h-20 sm:w-24 md:w-32 2xl:w-36 3xl:w-40 mb-3 sm:mb-4 2xl:mb-6 border-2 sm:border-4 2xl:border-[6px] border-background shadow-xl">
            <AvatarImage src={player.photoUrl} alt={`${player.name} portrait`} />
            <AvatarFallback className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl">{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-extrabold text-background">{player.name}</h1>
          <p className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl text-accent font-medium">{player.role}</p>
        </div>
      </ParallaxHero>

      <div className="container py-6 sm:py-8 2xl:py-12 space-y-6 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
        <Card className="shadow-xl">
          <CardHeader className="p-3 sm:p-4 md:p-6 2xl:p-8">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl">Player Overview</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 2xl:gap-5 text-xs sm:text-sm md:text-base 2xl:text-base 3xl:text-lg pt-1 sm:pt-1.5">
              <Badge variant="secondary" className="py-0.5 px-1.5 sm:py-1 sm:px-2 md:px-3 2xl:py-1.5 2xl:px-4 text-xs sm:text-sm 2xl:text-base 3xl:text-lg"><Flag className="w-3 h-3 sm:w-3.5 md:w-4 2xl:w-5 mr-1 sm:mr-1.5 2xl:mr-2" />{player.nationality}</Badge>
              {player.battingStyle && <Badge variant="outline" className="py-0.5 px-1.5 sm:py-1 sm:px-2 md:px-3 2xl:py-1.5 2xl:px-4 text-xs sm:text-sm 2xl:text-base 3xl:text-lg">Batting: {player.battingStyle}</Badge>}
              {player.bowlingStyle && <Badge variant="outline" className="py-0.5 px-1.5 sm:py-1 sm:px-2 md:px-3 2xl:py-1.5 2xl:px-4 text-xs sm:text-sm 2xl:text-base 3xl:text-lg">Bowling: {player.bowlingStyle}</Badge>}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 md:px-6 2xl:px-8 pb-3 sm:pb-4 md:pb-6 2xl:pb-8">
            {player.bio && <p className="text-muted-foreground mb-4 sm:mb-6 2xl:mb-8 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">{player.bio}</p>}
            
            <Separator className="my-4 sm:my-6 2xl:my-8" />

            <h2 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl font-semibold mb-3 sm:mb-4 2xl:mb-6 flex items-center">
              <BarChart3 className="w-4 h-4 sm:w-5 md:w-6 2xl:w-7 3xl:h-8 mr-1.5 sm:mr-2 2xl:mr-3 text-primary"/>Career Statistics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 2xl:gap-8">
              <StatItem label="Matches" value={player.stats.matches.toString()} />
              <StatItem label="Runs Scored" value={player.stats.runs.toString()} />
              <StatItem label="Average" value={player.stats.average.toFixed(2)} />
              {player.stats.strikeRate && <StatItem label="Strike Rate" value={player.stats.strikeRate.toFixed(2)} icon={<Zap className="w-3.5 h-3.5 sm:w-4 2xl:w-5 text-yellow-500"/>} />}
              {player.stats.wickets !== undefined && <StatItem label="Wickets" value={player.stats.wickets.toString()} />}
              {player.stats.economyRate && <StatItem label="Economy Rate" value={player.stats.economyRate.toFixed(2)} />}
              {player.stats.highestScore && <StatItem label="Highest Score" value={player.stats.highestScore} icon={<Star className="w-3.5 h-3.5 sm:w-4 2xl:w-5 text-amber-500"/>} />}
              {player.stats.bestBowling && <StatItem label="Best Bowling" value={player.stats.bestBowling} icon={<Star className="w-3.5 h-3.5 sm:w-4 2xl:w-5 text-amber-500"/>} />}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatItem({ label, value, icon }) { 
  return (
    <div className="bg-card p-2.5 sm:p-3 md:p-4 2xl:p-5 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs sm:text-sm md:text-base 2xl:text-base 3xl:text-lg text-muted-foreground mb-0.5 sm:mb-1 flex items-center">
        {icon && <span className="mr-1 sm:mr-1.5 2xl:mr-2">{icon}</span>}
        {label}
      </p>
      <p className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-primary">{value}</p>
    </div>
  );
}
