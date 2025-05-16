
// import type { Match } from '@/types'; // Type import removed
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Zap, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// interface MatchCardProps { // Interface removed
//   match: Match;
// }

export default function MatchCard({ match }) { // Type annotation removed
  const getStatusIcon = () => {
    switch (match.status) {
      case 'Live':
        return <Zap className="h-5 w-5 text-red-500" />;
      case 'Upcoming':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Recent':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl md:text-2xl mb-1">{match.team1} vs {match.team2}</CardTitle>
            {match.tournament && <CardDescription className="text-sm">{match.tournament}</CardDescription>}
          </div>
          <div className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">
            {getStatusIcon()}
            <span>{match.status}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 items-center">
          <div className="flex items-center gap-2">
            {match.team1Logo && <Image src={match.team1Logo} alt={match.team1} width={24} height={24} className="rounded-full" data-ai-hint="team logo" />}
            <span className="font-semibold">{match.team1}:</span>
            <span className="text-primary font-bold">{match.team1Score || (match.status !== 'Upcoming' ? 'N/A' : '-')}</span>
          </div>
          <div className="flex items-center gap-2">
            {match.team2Logo && <Image src={match.team2Logo} alt={match.team2} width={24} height={24} className="rounded-full" data-ai-hint="team logo" />}
            <span className="font-semibold">{match.team2}:</span>
            <span className="text-primary font-bold">{match.team2Score || (match.status !== 'Upcoming' ? 'N/A' : '-')}</span>
          </div>
        </div>
         {match.overs && match.status === 'Live' && (
          <p className="text-sm text-muted-foreground">Overs: {match.overs}</p>
        )}
        <div className="text-sm text-muted-foreground space-y-1">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>{match.date}{match.time && `, ${match.time}`}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{match.venue}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          {/* This link is illustrative. Actual match detail pages would need dynamic routing. */}
          <Link href={`/matches#${match.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
