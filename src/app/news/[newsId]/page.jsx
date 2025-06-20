
import mockNewsHeadlines from '@/data/news.json';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ParallaxHero from "@/components/common/parallax-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Tag, Edit3, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }) {
  const newsItem = mockNewsHeadlines.find(item => item.id === params.newsId);

  if (!newsItem) {
    return {
      title: 'News Article Not Found | CricketNews',
      description: 'The requested news article could not be found.',
    };
  }

  return {
    title: `${newsItem.title} | CricketNews`,
    description: newsItem.excerpt,
    keywords: [...(newsItem.category ? [newsItem.category] : []), 'cricket news', newsItem.title.split(' ').slice(0,3).join(' '), 'cricketnews'],
    openGraph: {
      title: `${newsItem.title} | CricketNews`,
      description: newsItem.excerpt,
      url: `https://yourdomain.com/news/${newsItem.id}`,
      type: 'article',
      article: {
        publishedTime: newsItem.date, // Assuming date is in ISO format or similar
        authors: [newsItem.source || 'CricketNews'],
        tags: newsItem.category ? [newsItem.category] : [],
      },
      images: [
        {
          url: newsItem.imageUrl || 'https://yourdomain.com/og-default-news.png',
          width: 1200,
          height: 630,
          alt: newsItem.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${newsItem.title} | CricketNews`,
      description: newsItem.excerpt,
      images: [newsItem.imageUrl || 'https://yourdomain.com/twitter-default-news.png'],
    },
    alternates: {
      canonical: `https://yourdomain.com/news/${newsItem.id}`,
    },
  };
}

export default function NewsArticlePage({ params }) {
  const newsItem = mockNewsHeadlines.find(item => item.id === params.newsId);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="space-y-6 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
      <ParallaxHero
        imageUrl={newsItem.imageUrl || "https://placehold.co/1600x600.png"}
        data-ai-hint={newsItem.dataAiHint || "news article banner"}
        minHeight="50vh"
        className="sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[450px] 2xl:min-h-[500px] 3xl:min-h-[550px]"
        overlayOpacity={0.4}
      >
        <div className="container text-center">
          {newsItem.category && (
            <Badge variant="secondary" className="mb-2 sm:mb-3 2xl:mb-4 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl py-1 px-2 sm:px-3 md:px-4 2xl:py-1.5 2xl:px-5 bg-background/80 text-foreground backdrop-blur-sm">
              <Tag className="h-3 w-3 sm:h-4 2xl:h-5 mr-1 sm:mr-1.5 2xl:mr-2" />
              {newsItem.category}
            </Badge>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-extrabold text-background leading-tight">
            {newsItem.title}
          </h1>
          <div className="mt-2 sm:mt-3 2xl:mt-4 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 2xl:gap-x-6 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl text-background/80">
            {newsItem.date && (
              <div className="flex items-center">
                <CalendarDays className="h-3.5 w-3.5 sm:h-4 md:h-5 2xl:h-6 mr-1 sm:mr-1.5 2xl:mr-2" />
                <span>{newsItem.date}</span>
              </div>
            )}
            {newsItem.source && (
              <div className="flex items-center">
                <Edit3 className="h-3.5 w-3.5 sm:h-4 md:h-5 2xl:h-6 mr-1 sm:mr-1.5 2xl:mr-2" />
                <span>Source: {newsItem.source}</span>
              </div>
            )}
          </div>
        </div>
      </ParallaxHero>

      <div className="container py-6 sm:py-8 2xl:py-12">
        <Card className="shadow-xl">
          <CardContent className="p-4 sm:p-6 md:p-8 2xl:p-10 3xl:p-12">
            <article className="prose prose-sm sm:prose-base md:prose-lg 2xl:prose-xl 3xl:prose-2xl dark:prose-invert max-w-none">
              {newsItem.fullContent ? (
                newsItem.fullContent.split('\\n\\n').map((paragraph, index) => (
                  <p key={index}>{paragraph.replace(/\\n/g, '\n')}</p>
                ))
              ) : (
                <p>{newsItem.excerpt}</p>
              )}
            </article>
            
            <div className="mt-6 sm:mt-8 2xl:mt-12 text-center">
                <Button asChild variant="outline">
                    <Link href="/news-summary">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Back to News Headlines
                    </Link>
                </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    