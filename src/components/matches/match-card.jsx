
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Tv, Users, BarChart2, Info, Flame, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function MatchCard({ match }) {
  const getStatusBadge = () => {
    switch (match.status) {
      case 'Live':
        return (
          <Badge variant="destructive" className="gap-1.5 items-center text-sm">
            <Flame className="h-4 w-4 animate-pulse" />
            Live
          </Badge>
        );
      case 'Upcoming':
        return (
          <Badge variant="secondary" className="gap-1.5 items-center text-sm bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/50">
            <Clock className="h-4 w-4" />
            Upcoming
          </Badge>
        );
      case 'Recent':
        return (
          <Badge variant="outline" className="gap-1.5 items-center text-sm bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50">
            <CheckCircle2 className="h-4 w-4" />
            Recent
          </Badge>
        );
      default:
        return <Badge variant="default">{match.status}</Badge>;
    }
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-border/60 overflow-hidden rounded-xl">
      <CardHeader className="p-4 bg-muted/50 border-b border-border/60">
        <div className="flex justify-between items-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider truncate pr-2">
            {match.tournament || 'Cricket Match'}
          </p>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow space-y-4">
        <div className="flex items-center justify-around space-x-2">
          {/* Team 1 */}
          <div className="flex flex-col items-center text-center w-2/5">
            <Image 
              src={match.team1Logo || 'https://placehold.co/80x80.png'} 
              alt={`${match.team1} logo`} 
              width={60} 
              height={60} 
              className="rounded-full mb-2 object-contain h-14 w-14 sm:h-16 sm:w-16"
              data-ai-hint="team logo" 
            />
            <h3 className="text-sm sm:text-base font-semibold truncate w-full">{match.team1}</h3>
            {match.team1Score && <p className="text-lg sm:text-xl font-bold text-primary">{match.team1Score}</p>}
          </div>

          <p className="text-2xl font-light text-muted-foreground">vs</p>

          {/* Team 2 */}
          <div className="flex flex-col items-center text-center w-2/5">
            <Image 
              src={match.team2Logo || 'https://placehold.co/80x80.png'} 
              alt={`${match.team2} logo`} 
              width={60} 
              height={60} 
              className="rounded-full mb-2 object-contain h-14 w-14 sm:h-16 sm:w-16"
              data-ai-hint="team logo"
            />
            <h3 className="text-sm sm:text-base font-semibold truncate w-full">{match.team2}</h3>
            {match.team2Score && <p className="text-lg sm:text-xl font-bold text-primary">{match.team2Score}</p>}
          </div>
        </div>

        {match.overs && match.status === 'Live' && (
          <div className="text-center">
            <Badge variant="outline" className="text-xs">Overs: {match.overs}</Badge>
          </div>
        )}

        {match.matchSummary && (
          <div className="p-3 bg-accent/10 rounded-md text-center">
            <p className="text-sm font-medium text-accent-foreground">{match.matchSummary}</p>
          </div>
        )}

        <div className="space-y-2 text-xs text-muted-foreground pt-2">
          <div className="flex items-center">
            <CalendarDays className="h-3.5 w-3.5 mr-2 text-primary/80" />
            <span>{match.date}{match.time && `, ${match.time}`}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-2 text-primary/80" />
            <span className="truncate">{match.venue}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t border-border/60">
        <Button variant="default" className="w-full group text-sm" asChild>
          <Link href={`/matches#${match.id}`}>
            View Details
            <Info className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
