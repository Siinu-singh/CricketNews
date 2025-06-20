
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/matches/match-card";
import mockMatches from '@/data/matches.json';
import ParallaxHero from "@/components/common/parallax-hero";

export const metadata = {
  title: 'Match Center - Live, Upcoming & Recent Cricket Matches | CricketNews',
  description: 'Track all cricket action at CricketNews\'s Match Center. View live scores, schedules for upcoming matches, and results of recent games across various tournaments.',
  keywords: ['cricket matches', 'live cricket scores', 'upcoming matches', 'recent matches', 'match schedule', 'cricketnews'],
  openGraph: {
    title: 'CricketNews Match Center',
    description: 'Explore live, upcoming, and recent cricket matches on CricketNews.',
    url: 'https://yourdomain.com/matches', 
    images: [
      {
        url: 'https://yourdomain.com/og-matches.png', 
        width: 1200,
        height: 630,
        alt: 'CricketNews Match Center',
      },
    ],
  },
  twitter: {
    title: 'CricketNews Match Center - All Cricket Action',
    description: 'Follow live scores, upcoming schedules, and recent results on CricketNews.',
    images: ['https://yourdomain.com/twitter-matches.png'], 
  },
  alternates: {
    canonical: 'https://yourdomain.com/matches', 
  },
};

export default function MatchesPage() {
  const upcomingMatches = mockMatches.filter(match => match.status === 'Upcoming');
  const liveMatches = mockMatches.filter(match => match.status === 'Live');
  const recentMatches = mockMatches.filter(match => match.status === 'Recent');

  const renderMatches = (matches, emptyMessage) => {
    if (matches.length === 0) {
      return <p className="text-center text-muted-foreground py-6 sm:py-8 2xl:py-10 text-sm sm:text-base 2xl:text-lg 3xl:text-xl">{emptyMessage}</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 sm:gap-6 2xl:gap-8 pt-4 sm:pt-6 2xl:pt-8">
        {matches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
      <ParallaxHero 
        imageUrl="https://img.freepik.com/premium-photo/vibrant-energetic-double-exposure-wallpaper-featuring-dynamic-movements-cricketthe-rhythmic-dance-colombian-cumbiaand-ample-copy-space-text-overlay_924727-48713.jpg?ga=GA1.1.1241576049.1745840677&semt=ais_hybrid&w=740" 
        data-ai-hint="cricket action abstract" 
        minHeight="60vh"
        overlayOpacity={0.4}
      >
        <div className="container">
          <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-background">Match Center</h1>
          <p className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl text-background/90 mt-1.5 sm:mt-2 2xl:mt-3">Track all cricket action: upcoming, live, and recent matches.</p>
        </div>
      </ParallaxHero>
      
      <div className="container">
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 sm:gap-3 md:gap-4 bg-transparent py-2 sm:py-3 2xl:py-4 px-0 mb-3 sm:mb-4 2xl:mb-6">
            <TabsTrigger 
              value="live" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl 2xl:py-3 font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-transparent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:border-primary hover:bg-accent/20 hover:text-accent-foreground"
            >
              Live
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl 2xl:py-3 font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-transparent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:border-primary hover:bg-accent/20 hover:text-accent-foreground"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger 
              value="recent" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl 2xl:py-3 font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-transparent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:border-primary hover:bg-accent/20 hover:text-accent-foreground"
            >
              Recent
            </TabsTrigger>
          </TabsList>
          <TabsContent value="live" id="live">
            {renderMatches(liveMatches, "No live matches at the moment. Check back soon!")}
          </TabsContent>
          <TabsContent value="upcoming" id="upcoming">
            {renderMatches(upcomingMatches, "No upcoming matches scheduled yet.")}
          </TabsContent>
          <TabsContent value="recent" id="recent">
            {renderMatches(recentMatches, "No recent match data available.")}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

    