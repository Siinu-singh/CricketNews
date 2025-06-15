
// import type { Team } from '@/types'; // Type import removed
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';

// interface TeamCardProps { // Interface removed
//   team: Team;
// }

export default function TeamCard({ team }) { // Type annotation removed
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-32 2xl:h-40 3xl:h-48 bg-muted flex items-center justify-center">
          <Image 
            src={team.logoUrl} 
            alt={`${team.name} Logo`} 
            width={80} 
            height={80} 
            className="object-contain rounded-full border-4 border-background shadow-md w-20 h-20 2xl:w-24 2xl:h-24 3xl:w-28 3xl:h-28"
            data-ai-hint="team logo emblem"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 2xl:p-8 text-center">
        <CardTitle className="text-2xl 2xl:text-3xl 3xl:text-4xl mb-1 2xl:mb-2">{team.name}</CardTitle>
        <CardDescription className="mb-4 text-sm 2xl:text-base 3xl:text-lg">National Cricket Team</CardDescription> {/* Placeholder description */}
        
        <div className="flex items-center justify-center text-muted-foreground text-sm 2xl:text-base 3xl:text-lg mb-4 2xl:mb-6">
            <ShieldCheck className="w-4 h-4 2xl:w-5 2xl:w-5 mr-1 text-primary"/> Official Team
        </div>

        <Button asChild variant="outline" className="w-full group text-base 2xl:text-lg 3xl:text-xl 2xl:py-6 2xl:h-auto">
          <Link href={`/teams/${team.id}`}>
            View Profile <ArrowRight className="ml-2 h-4 w-4 2xl:h-5 2xl:w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
