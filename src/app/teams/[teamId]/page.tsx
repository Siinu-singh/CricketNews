import { mockTeams, mockPlayers } from "@/lib/mock-data";
import type { Team, Player } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from "next/image";
import { Users, Shield, MapPinIcon, UserCircle, ArrowRight } from "lucide-react";
import ParallaxHero from "@/components/common/parallax-hero";

interface TeamDetailPageProps {
  params: { teamId: string };
}

export default function TeamDetailPage({ params }: TeamDetailPageProps) {
  const team = mockTeams.find(t => t.id === params.teamId);

  if (!team) {
    return <div className="text-center py-10">Team not found.</div>;
  }

  // For demo, if team.players is empty, populate with some mock players
  const playersToList = team.players.length > 0 ? team.players : mockPlayers.slice(0, 2).map(p => ({...p, teamId: team.id}));


  return (
    <div className="space-y-8">
      <ParallaxHero imageUrl={team.logoUrl || "https://placehold.co/1600x400.png"} data-ai-hint="team banner flag" minHeight="350px" overlayOpacity={0.6}>
        <div className="flex flex-col items-center">
          <Image src={team.logoUrl} alt={`${team.name} Logo`} width={120} height={120} className="rounded-full border-4 border-background shadow-xl mb-4" data-ai-hint="team logo emblem"/>
          <h1 className="text-5xl font-extrabold text-background">{team.name}</h1>
          {team.shortName && <p className="text-xl text-accent font-medium">({team.shortName})</p>}
        </div>
      </ParallaxHero>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Team Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-muted-foreground">
          {team.coach && <p><strong className="text-foreground">Coach:</strong> {team.coach}</p>}
          {team.homeGround && <p><MapPinIcon className="inline-block mr-2 h-5 w-5 text-primary"/> <strong className="text-foreground">Home Ground:</strong> {team.homeGround}</p>}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center"><Users className="mr-3 h-7 w-7 text-primary"/>Squad</CardTitle>
        </CardHeader>
        <CardContent>
          {playersToList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {playersToList.map((player: Player) => (
                <Card key={player.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-3 border-2 border-primary">
                      <AvatarImage src={player.photoUrl} alt={player.name} data-ai-hint="player portrait"/>
                      <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{player.name}</h3>
                    <p className="text-sm text-muted-foreground">{player.role}</p>
                    <Button variant="link" asChild className="mt-2 text-primary">
                      <Link href={`/players/${player.id}`}>
                        View Profile <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Player information is not available for this team yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  return mockTeams.map(team => ({
    teamId: team.id,
  }));
}
