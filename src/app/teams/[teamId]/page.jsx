
import mockTeams from "@/data/teams.json";
import mockPlayers from "@/data/players.json";
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
      title: 'Team Not Found | CricketNews',
      description: 'The requested team profile could not be found.',
    };
  }

  return {
    title: `${team.name} - Cricket Team Profile & Squad | CricketNews`,
    description: `View detailed profile, squad information, and more for the ${team.name} cricket team on CricketNews.`,
    keywords: [team.name, team.shortName, 'cricket team', 'squad', 'team profile', 'cricketnews'],
    openGraph: {
      title: `${team.name} - CricketNews Team Profile`,
      description: `Explore the ${team.name} cricket team, including squad details on CricketNews.`,
      url: `https://yourdomain.com/teams/${team.id}`, 
      images: [
        {
          url: team.logoUrl || 'https://yourdomain.com/og-default-team.png', 
          width: 400,
          height: 400,
          alt: `${team.name} Logo`,
        },
      ],
    },
    twitter: {
      title: `${team.name} - Cricket Team Profile | CricketNews`,
      description: `Detailed information about the ${team.name} cricket team on CricketNews.`,
      images: [team.logoUrl || 'https://yourdomain.com/twitter-default-team.png'], 
    },
    alternates: {
      canonical: `https://yourdomain.com/teams/${team.id}`, 
    },
  };
}

export default function TeamDetailPage({ params }) { 
  const team = mockTeams.find(t => t.id === params.teamId);

  if (!team) {
    notFound(); 
  }

  const teamPlayerIds = team.players;
  let playersToList;

  if (teamPlayerIds && teamPlayerIds.length > 0) {
    playersToList = mockPlayers.filter(p => teamPlayerIds.includes(p.id));
  } else {
    // Fallback for teams without explicit players in teams.json
    playersToList = mockPlayers.slice(0, 5);
  }

  return (
    <div className="space-y-6 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
      <ParallaxHero 
        imageUrl={team.bannerImageUrl || "https://placehold.co/1600x400.png"} 
        data-ai-hint={team.bannerDataAiHint || "team banner flag"} 
        minHeight="40vh" 
        className="sm:min-h-[45vh] md:min-h-[50vh] 2xl:min-h-[350px] 3xl:min-h-[400px]"
        overlayOpacity={0.6}
      >
        <div className="container flex flex-col items-center text-center">
          <Image src={team.logoUrl} alt={`${team.name} Logo`} width={80} height={80} className="object-contain w-20 h-20 sm:w-24 md:w-28 2xl:w-36 3xl:w-40 rounded-full border-2 sm:border-4 2xl:border-[6px] border-background shadow-xl mb-3 sm:mb-4 2xl:mb-6" data-ai-hint="team logo emblem"/>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-extrabold text-background">{team.name}</h1>
          {team.shortName && <p className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl text-accent font-medium">({team.shortName})</p>}
        </div>
      </ParallaxHero>

      <div className="container py-6 sm:py-8 2xl:py-12 space-y-6 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
        <Card className="shadow-lg">
          <CardHeader className="p-3 sm:p-4 md:p-6 2xl:p-8">
            <CardTitle className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl">Team Information</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-3 sm:gap-4 2xl:gap-6 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl text-muted-foreground px-3 sm:px-4 md:px-6 2xl:px-8 pb-3 sm:pb-4 md:pb-6 2xl:pb-8">
            {team.coach && <p><strong className="text-foreground">Coach:</strong> {team.coach}</p>}
            {team.homeGround && <p><MapPinIcon className="inline-block mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 md:h-5 2xl:h-6 text-primary"/> <strong className="text-foreground">Home Ground:</strong> {team.homeGround}</p>}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="p-3 sm:p-4 md:p-6 2xl:p-8">
            <CardTitle className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl flex items-center">
              <Users className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 md:h-7 2xl:h-8 3xl:h-9 text-primary"/>Squad
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 md:px-6 2xl:px-8 pb-3 sm:pb-4 md:pb-6 2xl:pb-8">
            {playersToList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 sm:gap-6 2xl:gap-8">
                {playersToList.map((player) => ( 
                  <Card key={player.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4 sm:pt-6 2xl:pt-8 flex flex-col items-center text-center p-3 sm:p-4">
                      <Avatar className="w-14 h-14 sm:w-16 md:w-20 2xl:w-24 3xl:w-28 mb-2 sm:mb-3 2xl:mb-4 border-2 2xl:border-4 border-primary">
                        <AvatarImage src={player.photoUrl} alt={`${player.name} - ${player.role}`} />
                        <AvatarFallback className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl">{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl font-semibold">{player.name}</h3>
                      <p className="text-xs sm:text-sm md:text-base 2xl:text-base 3xl:text-lg text-muted-foreground">{player.role}</p>
                      <Button variant="outline" size="sm" asChild className="mt-1.5 sm:mt-2 2xl:mt-3 group">
                        <Link href={`/players/${player.id}`}>
                          View Profile <ArrowRight className="ml-1 h-3 w-3 sm:h-3.5 md:h-4 2xl:h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm sm:text-base 2xl:text-lg 3xl:text-xl">Player information is not available for this team yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    