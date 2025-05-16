
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
        <div className="relative h-32 bg-muted flex items-center justify-center">
          <Image 
            src={team.logoUrl} 
            alt={`${team.name} Logo`} 
            width={80} 
            height={80} 
            className="rounded-full border-4 border-background shadow-md"
            data-ai-hint="team logo emblem"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <CardTitle className="text-2xl mb-1">{team.name}</CardTitle>
        <CardDescription className="mb-4 text-sm">National Cricket Team</CardDescription> {/* Placeholder description */}
        
        <div className="flex items-center justify-center text-muted-foreground text-sm mb-4">
            <ShieldCheck className="w-4 h-4 mr-1 text-primary"/> Official Team
        </div>

        <Button asChild variant="outline" className="w-full group">
          <Link href={`/teams/${team.id}`}>
            View Profile <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
