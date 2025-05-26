
import TeamCard from "@/components/teams/team-card";
import { mockTeams } from "@/lib/mock-data.js";
import ParallaxHero from "@/components/common/parallax-hero";

export const metadata = {
  title: 'Cricket Teams - National & International Profiles',
  description: 'Explore detailed profiles of national and international cricket teams on CricNow. Find squad information, logos, and more.',
  keywords: ['cricket teams', 'national cricket teams', 'international cricket teams', 'team profiles', 'squads'],
  openGraph: {
    title: 'CricNow Cricket Teams',
    description: 'Discover profiles of cricket teams from around the world.',
    url: 'https://yourdomain.com/teams', // Replace
    images: [
      {
        url: 'https://yourdomain.com/og-teams.png', // Replace
        width: 1200,
        height: 630,
        alt: 'CricNow Cricket Teams Page',
      },
    ],
  },
  twitter: {
    title: 'CricNow Cricket Teams - Explore Team Profiles',
    description: 'Find information on your favorite cricket teams.',
    images: ['https://yourdomain.com/twitter-teams.png'], // Replace
  },
  alternates: {
    canonical: 'https://yourdomain.com/teams', // Replace
  },
};

export default function TeamsPage() {
  return (
    <div className="space-y-8 md:space-y-12">
      <ParallaxHero 
        imageUrl="https://placehold.co/1600x400.png" 
        data-ai-hint="cricket team huddle" 
        minHeight="300px" 
        overlayOpacity={0.4}
        className="mx-[-1rem] md:mx-[-1.5rem] lg:mx-[-2rem]"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-background">Cricket Teams</h1>
          <p className="text-base sm:text-lg text-background/90 mt-2">Explore national and international cricket teams.</p>
        </div>
      </ParallaxHero>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {mockTeams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockTeams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No teams available at the moment.</p>
        )}
      </div>
    </div>
  );
}
