
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Info, Flame, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function MatchCard({ match }) {
  const getStatusBadge = () => {
    switch (match.status) {
      case 'Live':
        return (
          <Badge variant="destructive" className="gap-1 sm:gap-1.5 items-center text-xs sm:text-sm 2xl:text-base 3xl:text-lg px-1.5 py-0.5 sm:px-2.5 2xl:px-3 2xl:py-1.5">
            <Flame className="h-3 w-3 sm:h-4 2xl:h-5 animate-pulse" />
            Live
          </Badge>
        );
      case 'Upcoming':
        return (
          <Badge variant="secondary" className="gap-1 sm:gap-1.5 items-center text-xs sm:text-sm 2xl:text-base 3xl:text-lg px-1.5 py-0.5 sm:px-2.5 2xl:px-3 2xl:py-1.5 bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/50">
            <Clock className="h-3 w-3 sm:h-4 2xl:h-5" />
            Upcoming
          </Badge>
        );
      case 'Recent':
        return (
          <Badge variant="outline" className="gap-1 sm:gap-1.5 items-center text-xs sm:text-sm 2xl:text-base 3xl:text-lg px-1.5 py-0.5 sm:px-2.5 2xl:px-3 2xl:py-1.5 bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50">
            <CheckCircle2 className="h-3 w-3 sm:h-4 2xl:h-5" />
            Recent
          </Badge>
        );
      default:
        return <Badge variant="default" className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg px-1.5 py-0.5 sm:px-2.5 2xl:px-3 2xl:py-1.5">{match.status}</Badge>;
    }
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-border/60 overflow-hidden rounded-xl">
      <CardHeader className="p-3 sm:p-4 2xl:p-5 bg-muted/50 border-b border-border/60">
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-xs 2xl:text-sm 3xl:text-base font-semibold text-primary uppercase tracking-wider truncate pr-2">
            {match.tournament || 'Cricket Match'}
          </p>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-4 2xl:p-5 flex-grow space-y-3 sm:space-y-4 2xl:space-y-5">
        <div className="flex items-center justify-around space-x-1.5 sm:space-x-2 2xl:space-x-3">
          <div className="flex flex-col items-center text-center w-2/5">
            <Image 
              src={match.team1Logo || 'https://placehold.co/80x80.png'} 
              alt={`${match.team1} logo`} 
              width={48} 
              height={48} 
              className="rounded-full mb-1.5 sm:mb-2 object-contain h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 2xl:h-20 2xl:w-20 3xl:h-24 3xl:w-24"
              data-ai-hint="team logo" 
            />
            <h3 className="text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl font-semibold truncate w-full">{match.team1}</h3>
            {match.team1Score && <p className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-primary">{match.team1Score}</p>}
          </div>

          <p className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl font-light text-muted-foreground">vs</p>

          <div className="flex flex-col items-center text-center w-2/5">
            <Image 
              src={match.team2Logo || 'https://placehold.co/80x80.png'} 
              alt={`${match.team2} logo`} 
              width={48} 
              height={48} 
              className="rounded-full mb-1.5 sm:mb-2 object-contain h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 2xl:h-20 2xl:w-20 3xl:h-24 3xl:w-24"
              data-ai-hint="team logo"
            />
            <h3 className="text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl font-semibold truncate w-full">{match.team2}</h3>
            {match.team2Score && <p className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-primary">{match.team2Score}</p>}
          </div>
        </div>

        {match.overs && match.status === 'Live' && (
          <div className="text-center">
            <Badge variant="outline" className="text-xs 2xl:text-sm 3xl:text-base px-2 py-0.5 sm:px-2.5 2xl:py-1">Overs: {match.overs}</Badge>
          </div>
        )}

        {match.matchSummary && (
          <div className="p-2 sm:p-3 2xl:p-4 bg-accent/10 rounded-md text-center">
            <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-medium text-accent-foreground">{match.matchSummary}</p>
          </div>
        )}

        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-xs 2xl:text-sm 3xl:text-base text-muted-foreground pt-1.5 sm:pt-2 2xl:pt-3">
          <div className="flex items-center">
            <CalendarDays className="h-3 w-3 sm:h-3.5 2xl:h-4 mr-1.5 sm:mr-2 text-primary/80" />
            <span>{match.date}{match.time && `, ${match.time}`}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 sm:h-3.5 2xl:h-4 mr-1.5 sm:mr-2 text-primary/80" />
            <span className="truncate">{match.venue}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 2xl:p-5 border-t border-border/60">
        <Button variant="default" className="w-full group text-xs sm:text-sm 2xl:text-base 3xl:text-lg h-9 sm:h-10 2xl:h-12 px-3 sm:px-4 2xl:px-6" asChild>
          <Link href={`/matches#${match.id}`}>
            View Details
            <Info className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 2xl:h-5 transition-transform group-hover:scale-110" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
