
import NewsSummaryForm from "@/components/news/news-summary-form";
import ParallaxHero from "@/components/common/parallax-hero";
import { BotMessageSquare, Info, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockNewsHeadlines } from '@/lib/mock-data.js';
import NewsHeadlineCard from "@/components/news/news-headline-card";
import AbstractBackground from '@/components/common/AbstractBackground';

// Metadata can be exported from Server Components
export const metadata = {
  title: 'AI Cricket News Summarizer & Headlines | CricketNews',
  description: 'Get concise AI-powered summaries of cricket news articles and browse the latest headlines on CricketNews.',
  keywords: ['ai news summary', 'cricket headlines', 'news summarizer', 'latest cricket news', 'cricketnews'],
   openGraph: {
    title: 'CricketNews AI News Summarizer',
    description: 'Summarize cricket articles with AI and read the latest headlines.',
    url: 'https://yourdomain.com/news-summary',
    images: [
      {
        url: 'https://yourdomain.com/og-news-summary.png', 
        width: 1200,
        height: 630,
        alt: 'CricketNews AI News Summarizer',
      },
    ],
  },
  twitter: {
    title: 'AI News Summarizer & Headlines | CricketNews',
    description: 'Get quick cricket news summaries and browse headlines on CricketNews.',
    images: ['https://yourdomain.com/twitter-news-summary.png'],
  },
   alternates: {
    canonical: 'https://yourdomain.com/news-summary',
  },
};

export default function NewsSummaryPage() {
  // All headlines are rendered directly; client-side pagination is removed.
  const allNewsItems = mockNewsHeadlines;

  return (
    <div className="space-y-6 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
      <ParallaxHero 
        imageUrl="https://placehold.co/1600x400.png" 
        data-ai-hint="artificial intelligence abstract" 
        minHeight="40vh" 
        className="sm:min-h-[45vh] md:min-h-[50vh] 2xl:min-h-[350px] 3xl:min-h-[400px]"
        overlayOpacity={0.5}
      >
        <div className="container flex items-center justify-center flex-col text-center">
          <BotMessageSquare className="h-10 w-10 sm:h-12 md:h-16 2xl:h-20 3xl:h-24 text-accent mb-3 sm:mb-4 2xl:mb-6" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-background">AI News Summarizer</h1>
          <p className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl text-background/90 mt-1.5 sm:mt-2 2xl:mt-3 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-3xl 3xl:max-w-4xl">
            Get concise bullet-point summaries of lengthy cricket news articles using advanced AI.
          </p>
        </div>
      </ParallaxHero>

      <div className="container space-y-8 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
        <Card className="shadow-lg">
          <CardHeader className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 2xl:p-8">
            <CardTitle className="flex items-center text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl">
              <Info className="h-4 w-4 sm:h-5 md:h-6 2xl:h-7 3xl:h-8 mr-2 sm:mr-3 2xl:mr-4 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-4 sm:px-4 sm:pb-5 md:px-6 lg:px-8 2xl:px-8 2xl:pb-8">
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">
              Our AI-powered news summarizer intelligently processes the content of cricket articles,
              identifying key information, significant events, and main conclusions. It then condenses
              this into easy-to-read bullet points, saving you time while keeping you informed.
              Simply paste the article text into the form below and let our AI do the rest!
            </p>
          </CardContent>
        </Card>
        
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-4xl 3xl:max-w-5xl mx-auto">
          <NewsSummaryForm />
        </div>

        <div className="space-y-6 sm:space-y-8 2xl:space-y-10">
          <Card className="border-border/30 bg-card/50 relative overflow-hidden">
            <AbstractBackground />
            <CardHeader className="text-center px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 2xl:pb-8 relative z-10">
              <CardTitle className="flex items-center justify-center text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold">
                <Newspaper className="h-6 w-6 sm:h-7 md:h-8 2xl:h-9 3xl:h-10 mr-2 sm:mr-3 text-primary" />
                Latest Cricket Headlines
              </CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl text-muted-foreground mt-1 sm:mt-1.5 2xl:mt-2">
                Explore recent news from the world of cricket. Click any card to read more.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 px-3 pb-4 sm:px-4 sm:pb-5 md:px-6 lg:px-8 2xl:p-6">
              {allNewsItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 2xl:gap-10">
                  {allNewsItems.map((headline, index) => (
                    <div key={headline.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.08}s` }}>
                      <NewsHeadlineCard newsItem={headline} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground text-sm sm:text-base 2xl:text-lg 3xl:text-xl">No news headlines available at the moment.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
