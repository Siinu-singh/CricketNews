
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/matches/match-card";
import { mockMatches } from "@/lib/mock-data";
import ParallaxHero from "@/components/common/parallax-hero";

export default function MatchesPage() {
  const upcomingMatches = mockMatches.filter(match => match.status === 'Upcoming');
  const liveMatches = mockMatches.filter(match => match.status === 'Live');
  const recentMatches = mockMatches.filter(match => match.status === 'Recent');

  const renderMatches = (matches, emptyMessage) => {
    if (matches.length === 0) {
      return <p className="text-center text-muted-foreground py-8">{emptyMessage}</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 px-4">
        {matches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <ParallaxHero 
        imageUrl="https://img.freepik.com/premium-photo/vibrant-energetic-double-exposure-wallpaper-featuring-dynamic-movements-cricketthe-rhythmic-dance-colombian-cumbiaand-ample-copy-space-text-overlay_924727-48713.jpg?ga=GA1.1.1241576049.1745840677&semt=ais_hybrid&w=740" 
        data-ai-hint="cricket action abstract" 
        minHeight="300px" 
        overlayOpacity={0.4}
      >
        <h1 className="text-4xl font-bold text-background">Match Center</h1>
        <p className="text-lg text-background/90 mt-2">Track all cricket action: upcoming, live, and recent matches.</p>
      </ParallaxHero>
      
      <Tabs defaultValue="live" className="w-full">
        <TabsList className="sticky top-16 z-30 grid w-full grid-cols-3 bg-background shadow-md py-2 mb-4 rounded-lg border">
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
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
  );
}

