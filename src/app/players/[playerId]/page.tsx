import { mockPlayers } from "@/lib/mock-data";
import type { Player } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Star, Flag, Zap } from "lucide-react"; // Zap for strike rate, Star for bests
import ParallaxHero from "@/components/common/parallax-hero";

interface PlayerProfilePageProps {
  params: { playerId: string };
}

export default function PlayerProfilePage({ params }: PlayerProfilePageProps) {
  const player = mockPlayers.find(p => p.id === params.playerId);

  if (!player) {
    return <div className="text-center py-10">Player not found.</div>;
  }

  return (
    <div className="space-y-8">
       <ParallaxHero imageUrl={player.photoUrl || "https://placehold.co/1600x400.png"} data-ai-hint="player action cricket" minHeight="350px" overlayOpacity={0.5}>
        <div className="flex flex-col items-center">
          <Avatar className="w-32 h-32 mb-4 border-4 border-background shadow-xl">
            <AvatarImage src={player.photoUrl} alt={player.name} data-ai-hint="player portrait" />
            <AvatarFallback className="text-4xl">{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h1 className="text-5xl font-extrabold text-background">{player.name}</h1>
          <p className="text-xl text-accent font-medium">{player.role}</p>
        </div>
      </ParallaxHero>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Player Overview</CardTitle>
          <CardDescription className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm py-1 px-3"><Flag className="w-4 h-4 mr-1.5" />{player.nationality}</Badge>
            {player.battingStyle && <Badge variant="outline" className="text-sm py-1 px-3">Batting: {player.battingStyle}</Badge>}
            {player.bowlingStyle && <Badge variant="outline" className="text-sm py-1 px-3">Bowling: {player.bowlingStyle}</Badge>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {player.bio && <p className="text-muted-foreground mb-6">{player.bio}</p>}
          
          <Separator className="my-6" />

          <h3 className="text-2xl font-semibold mb-4 flex items-center"><BarChart3 className="w-6 h-6 mr-2 text-primary"/>Career Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  );
}

function StatItem({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm text-muted-foreground mb-1 flex items-center">
        {icon && <span className="mr-1.5">{icon}</span>}
        {label}
      </p>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}


export async function generateStaticParams() {
  return mockPlayers.map(player => ({
    playerId: player.id,
  }));
}
