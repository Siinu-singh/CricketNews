
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function TeamGridCard({ team, index }) {
  if (!team) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index || 0) * 0.05 }}
      whileHover={{ scale: 1.03 }}
      className="h-full"
    >
      <Card className={cn(
        "group w-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full",
        "border border-border/40 bg-card/60 dark:bg-neutral-800/60 backdrop-blur-md hover:border-primary/60"
      )}>
        <CardHeader className="p-5 md:p-6 flex flex-col items-center justify-center bg-muted/40 relative">
          <div className={cn(
            "w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-background",
            "ring-2 ring-primary/30 group-hover:ring-4 group-hover:ring-primary group-hover:shadow-[0_0_18px_-3px_hsl(var(--primary))]", 
            "transition-all duration-300 shadow-md"
          )}>
            <Image
              src={team.logoUrl || 'https://placehold.co/200x200.png'}
              alt={`${team.name} Logo`}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 80px, 96px"
              data-ai-hint={team.dataAiHint || "team logo"}
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-4 md:p-5 pt-3 flex-grow flex flex-col items-center text-center space-y-2">
          <CardTitle className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {team.name}
          </CardTitle>
          
          {team.shortName && (
            <div className="flex items-center text-xs md:text-sm text-muted-foreground gap-1.5">
              {team.flagUrl && (
                <Image 
                  src={team.flagUrl} 
                  alt={`${team.name} flag`} 
                  width={20} 
                  height={12} // Approximate aspect ratio for flags 
                  className="object-contain rounded-sm"
                  data-ai-hint={team.flagDataAiHint || "country flag"}
                />
              )}
              <span>{team.shortName}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 md:p-5 mt-auto">
          <Button 
            variant="outline" 
            asChild 
            className={cn(
              "w-full text-sm md:text-base rounded-xl group", // Added group class here
              "border-border/70 text-foreground", 
              "hover:bg-accent hover:text-accent-foreground", 
              "transition-all duration-300 ease-in-out transform hover:scale-105"
            )}
          >
            <Link href={`/teams/${team.id}`}>
              View Profile
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

