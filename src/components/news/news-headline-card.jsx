
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Tag, ExternalLink } from 'lucide-react';
import Link from 'next/link'; // Assuming news items might link externally or to internal detail pages

export default function NewsHeadlineCard({ newsItem }) {
  if (!newsItem) return null;

  return (
    <Card className="group w-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full border border-border/60 hover:border-primary/50">
      <CardHeader className="p-0 relative">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={newsItem.imageUrl || 'https://placehold.co/600x400.png'}
            alt={newsItem.title || 'Cricket news image'}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
            data-ai-hint={newsItem.dataAiHint || 'cricket news'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        {newsItem.category && (
            <Badge variant="secondary" className="absolute top-3 right-3 text-xs py-1 px-2.5 bg-primary/80 text-primary-foreground backdrop-blur-sm">
                <Tag className="h-3 w-3 mr-1.5" />
                {newsItem.category}
            </Badge>
        )}
      </CardHeader>
      
      <CardContent className="p-5 flex-grow flex flex-col space-y-3">
        <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
          {/* In a real app, this Link would go to the article detail page */}
          <Link href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded-sm">
            {newsItem.title}
          </Link>
        </CardTitle>
        
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 flex-grow">
          {newsItem.excerpt}
        </CardDescription>
        
        <div className="flex items-center text-xs text-muted-foreground pt-2 space-x-3">
          {newsItem.date && (
            <div className="flex items-center">
              <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
              <span>{newsItem.date}</span>
            </div>
          )}
          {newsItem.source && (
            <span className="truncate">| {newsItem.source}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 border-t border-border/60">
         {/* In a real app, this Link would go to the article detail page or external source */}
        <Link 
            href="#" 
            className="inline-flex items-center justify-center w-full text-sm font-medium text-primary hover:text-primary/80 focus:outline-none focus:ring-1 focus:ring-ring rounded-md py-2 px-3 transition-colors group-hover:bg-primary/10"
        >
          Read More
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
