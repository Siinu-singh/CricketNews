
import ParallaxHero from "@/components/common/parallax-hero";
import { mockTeams } from "@/lib/mock-data.js";
import AdvancedTeamCarousel from "@/components/teams/advanced-team-carousel";
import TeamGridCard from "@/components/teams/team-grid-card"; 
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";

export const metadata = {
  title: 'Cricket Teams - National & International Profiles | CricketNews',
  description: 'Explore detailed profiles of national and international cricket teams on CricketNews. Find squad information, logos, and more.',
  keywords: ['cricket teams', 'national cricket teams', 'international cricket teams', 'team profiles', 'squads', 'cricketnews'],
  openGraph: {
    title: 'CricketNews Cricket Teams',
    description: 'Discover profiles of cricket teams from around the world on CricketNews.',
    url: 'https://yourdomain.com/teams', 
    images: [
      {
        url: 'https://yourdomain.com/og-teams.png', 
        width: 1200,
        height: 630,
        alt: 'CricketNews Cricket Teams Page',
      },
    ],
  },
  twitter: {
    title: 'CricketNews Cricket Teams - Explore Team Profiles',
    description: 'Find information on your favorite cricket teams on CricketNews.',
    images: ['https://yourdomain.com/twitter-teams.png'], 
  },
  alternates: {
    canonical: 'https://yourdomain.com/teams', 
  },
};

export default function TeamsPage() {
  const teamsForCarousel = mockTeams.slice(0, 7); 

  return (
    <div className="space-y-6 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
      <ParallaxHero 
        imageUrl="https://images.unsplash.com/photo-1515224526905-55c36d00a764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwdGVhbSUyMGh1ZGRsZXxlbnwwfHx8fDE3NTAwMTMwODh8MA&ixlib=rb-4.1.0&q=80&w=1600" 
        data-ai-hint="cricket team huddle action" 
        minHeight="50vh"
        className="sm:min-h-[55vh] md:min-h-[60vh]" 
        overlayOpacity={0.45}
      >
        <div className="container flex items-center justify-center md:justify-start">
          <div 
            className="inline-block p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-2xl text-center md:text-left bg-black/30 backdrop-blur-md"
            style={{
              backgroundImage: `url('https://placehold.co/600x300.png')`, // This is for the inner box, not the main hero
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            data-ai-hint="subtle pattern texture" 
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-background">Cricket Teams</h1>
            <p className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl text-background/90 mt-1.5 sm:mt-2 2xl:mt-3">Explore national and international cricket teams.</p>
          </div>
        </div>
      </ParallaxHero>
      
      <div className="container pb-6 sm:pb-8 md:pb-12 2xl:pb-16 space-y-10 md:space-y-14 2xl:space-y-20">
        {teamsForCarousel.length > 0 ? (
          <AdvancedTeamCarousel teams={teamsForCarousel} />
        ) : (
          <p className="text-center text-muted-foreground py-6 sm:py-8 text-sm sm:text-base 2xl:text-lg 3xl:text-xl">No teams available for carousel at the moment.</p>
        )}

        <Separator className="my-6 sm:my-8 md:my-12 2xl:my-16 bg-border/70" />

        <section id="all-teams">
          <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-10 2xl:mb-12 flex items-center justify-center">
            <Shield className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 md:h-7 2xl:h-9 3xl:h-10 text-primary"/>
            All Teams
          </h2>
          {mockTeams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 2xl:gap-8">
              {mockTeams.map((team, index) => (
                <TeamGridCard key={team.id} team={team} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-6 sm:py-8 text-sm sm:text-base 2xl:text-lg 3xl:text-xl">No teams available to display.</p>
          )}
        </section>
      </div>
    </div>
  );
}
