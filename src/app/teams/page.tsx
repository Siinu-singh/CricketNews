
import TeamCard from "@/components/teams/team-card";
import { mockTeams } from "@/lib/mock-data";
import ParallaxHero from "@/components/common/parallax-hero";

export default function TeamsPage() {
  return (
    <div className="space-y-8">
      <ParallaxHero 
        imageUrl="https://placehold.co/1600x400.png" 
        data-ai-hint="cricket team huddle" 
        minHeight="300px" 
        overlayOpacity={0.4}
      >
        <h1 className="text-4xl font-bold text-background">Cricket Teams</h1>
        <p className="text-lg text-background/90 mt-2">Explore national and international cricket teams.</p>
      </ParallaxHero>
      
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
  );
}
