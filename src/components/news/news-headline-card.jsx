
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Tag, ExternalLink } from 'lucide-react';
import Link from 'next/link'; 

export default function NewsHeadlineCard({ newsItem }) {
  if (!newsItem) return null;

  return (
    <Card className="group w-full overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full border border-border/60 hover:border-primary/50 bg-card/80 backdrop-blur-sm hover:bg-card">
      <CardHeader className="p-0 relative">
        <Link href={`/news/${newsItem.id}`} className="block aspect-[16/9] relative overflow-hidden rounded-t-xl" aria-label={`Read more about ${newsItem.title}`}>
          <Image
            src={newsItem.imageUrl || 'https://placehold.co/600x400.png'}
            alt={newsItem.title || 'Cricket news image'}
            fill 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            data-ai-hint={newsItem.dataAiHint || 'cricket news'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </Link>
        {newsItem.category && (
            <Badge variant="secondary" className="absolute top-2 right-2 sm:top-3 sm:right-3 text-xs 2xl:text-sm 3xl:text-base py-1 px-2 sm:px-2.5 2xl:py-1.5 2xl:px-3 bg-primary/80 text-primary-foreground backdrop-blur-sm border border-primary-foreground/30">
                <Tag className="h-3 w-3 2xl:h-3.5 mr-1 sm:mr-1.5" />
                {newsItem.category}
            </Badge>
        )}
      </CardHeader>
      
      <CardContent className="p-3 sm:p-4 md:p-5 2xl:p-6 flex-grow flex flex-col space-y-2 sm:space-y-3 2xl:space-y-4">
        <CardTitle className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl font-semibold leading-tight group-hover:text-primary transition-colors">
          <Link href={`/news/${newsItem.id}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded-sm">
            {newsItem.title}
          </Link>
        </CardTitle>
        
        <CardDescription className="text-xs sm:text-sm md:text-base 2xl:text-base 3xl:text-lg text-muted-foreground line-clamp-2 sm:line-clamp-3 flex-grow">
          {newsItem.excerpt}
        </CardDescription>
        
        <div className="flex items-center text-xs 2xl:text-sm 3xl:text-base text-muted-foreground pt-1.5 sm:pt-2 space-x-2 sm:space-x-3">
          {newsItem.date && (
            <div className="flex items-center">
              <CalendarDays className="h-3 w-3 sm:h-3.5 2xl:h-4 mr-1 sm:mr-1.5 text-primary/70" />
              <span>{newsItem.date}</span>
            </div>
          )}
          {newsItem.source && (
            <span className="truncate hidden sm:inline">| {newsItem.source}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 md:p-5 2xl:p-6 border-t border-border/60">
        <Link 
            href={`/news/${newsItem.id}`} 
            className="inline-flex items-center justify-center w-full text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-medium text-primary hover:text-primary/80 focus:outline-none focus:ring-1 focus:ring-ring rounded-md py-1.5 sm:py-2 2xl:py-2.5 px-2 sm:px-3 transition-colors group-hover:bg-primary/10"
        >
          Read More
          <ExternalLink className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 2xl:h-5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
