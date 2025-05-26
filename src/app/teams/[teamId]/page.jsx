
import { mockTeams, mockPlayers } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from "next/image";
import { Users, MapPinIcon, ArrowRight } from "lucide-react";
import ParallaxHero from "@/components/common/parallax-hero";
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const team = mockTeams.find(t => t.id === params.teamId);
  if (!team) {
    return {
      title: 'Team Not Found | CricNow',
      description: 'The requested team profile could not be found.',
    };
  }

  return {
    title: `${team.name} - Cricket Team Profile & Squad`,
    description: `View detailed profile, squad information, and more for the ${team.name} cricket team on CricNow.`,
    keywords: [team.name, team.shortName, 'cricket team', 'squad', 'team profile'],
    openGraph: {
      title: `${team.name} - CricNow Team Profile`,
      description: `Explore the ${team.name} cricket team, including squad details.`,
      url: `https://yourdomain.com/teams/${team.id}`, // Replace
      images: [
        {
          url: team.logoUrl || 'https://yourdomain.com/og-default-team.png', // Replace with a default
          width: 400,
          height: 400,
          alt: `${team.name} Logo`,
        },
      ],
    },
    twitter: {
      title: `${team.name} - Cricket Team Profile | CricNow`,
      description: `Detailed information about the ${team.name} cricket team.`,
      images: [team.logoUrl || 'https://yourdomain.com/twitter-default-team.png'], // Replace
    },
    alternates: {
      canonical: `https://yourdomain.com/teams/${team.id}`, // Replace
    },
  };
}

export default function TeamDetailPage({ params }) { 
  const team = mockTeams.find(t => t.id === params.teamId);

  if (!team) {
    notFound(); 
  }

  const playersToList = team.players.length > 0 ? team.players : mockPlayers.slice(0, 5).map(p => ({...p, teamId: team.id})); // Show more players for demo

  return (
    <div className="space-y-8 md:space-y-12">
      <ParallaxHero 
        imageUrl={team.bannerImageUrl || "https://placehold.co/1600x400.png"} 
        data-ai-hint={team.bannerDataAiHint || "team banner flag"} 
        minHeight="350px" 
        overlayOpacity={0.6}
        className="mx-[-1rem] md:mx-[-1.5rem] lg:mx-[-2rem]"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center">
          <Image src={team.logoUrl} alt={`${team.name} Logo`} width={100} height={100} className="sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-background shadow-xl mb-4" data-ai-hint="team logo emblem"/>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-background text-center">{team.name}</h1>
          {team.shortName && <p className="text-lg sm:text-xl text-accent font-medium">({team.shortName})</p>}
        </div>
      </ParallaxHero>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8 md:space-y-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Team Information</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4 text-sm sm:text-base text-muted-foreground">
            {team.coach && <p><strong className="text-foreground">Coach:</strong> {team.coach}</p>}
            {team.homeGround && <p><MapPinIcon className="inline-block mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"/> <strong className="text-foreground">Home Ground:</strong> {team.homeGround}</p>}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl flex items-center"><Users className="mr-3 h-6 w-6 sm:h-7 sm:w-7 text-primary"/>Squad</CardTitle>
          </CardHeader>
          <CardContent>
            {playersToList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {playersToList.map((player) => ( 
                  <Card key={player.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mb-3 border-2 border-primary">
                        <AvatarImage src={player.photoUrl} alt={`${player.name} - ${player.role}`} />
                        <AvatarFallback className="text-lg sm:text-xl">{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-base sm:text-lg font-semibold">{player.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{player.role}</p>
                      <Button variant="link" asChild className="mt-2 text-primary text-xs sm:text-sm">
                        <Link href={`/players/${player.id}`}>
                          View Profile <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
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
    </div>
  );
}
