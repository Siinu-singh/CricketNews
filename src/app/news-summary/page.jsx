
import NewsSummaryForm from "@/components/news/news-summary-form";
import ParallaxHero from "@/components/common/parallax-hero";
import { BotMessageSquare, Info, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockNewsHeadlines } from '@/lib/mock-data.js';
import NewsHeadlineCard from "@/components/news/news-headline-card";

export const metadata = {
  title: 'AI Cricket News Summarizer & Headlines',
  description: 'Get quick, AI-powered summaries of cricket news articles. Paste article text to get key bullet points. Also, browse latest cricket headlines on CricNow.',
  keywords: ['ai news summary', 'cricket news summarizer', 'news headlines', 'cricket updates', 'sports ai'],
  openGraph: {
    title: 'CricNow AI News Summarizer & Headlines',
    description: 'Summarize cricket articles with AI and read the latest headlines.',
    url: 'https://yourdomain.com/news-summary', // Replace
    images: [
      {
        url: 'https://yourdomain.com/og-news-summary.png', // Replace
        width: 1200,
        height: 630,
        alt: 'CricNow AI News Summarizer',
      },
    ],
  },
  twitter: {
    title: 'CricNow AI News Summarizer & Headlines',
    description: 'AI-powered cricket news summaries and latest headlines.',
    images: ['https://yourdomain.com/twitter-news-summary.png'], // Replace
  },
  alternates: {
    canonical: 'https://yourdomain.com/news-summary', // Replace
  },
};

export default function NewsSummaryPage() {
  return (
    <div className="space-y-8 md:space-y-12">
      <ParallaxHero 
        imageUrl="https://placehold.co/1600x400.png" 
        data-ai-hint="artificial intelligence abstract" 
        minHeight="300px" 
        overlayOpacity={0.5}
        className="mx-[-1rem] md:mx-[-1.5rem] lg:mx-[-2rem]"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-center flex-col">
          <BotMessageSquare className="h-12 w-12 sm:h-16 sm:w-16 text-accent mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-background">AI News Summarizer</h1>
          <p className="text-base sm:text-lg text-background/90 mt-2 max-w-2xl text-center">
            Get concise bullet-point summaries of lengthy cricket news articles using advanced AI.
          </p>
        </div>
      </ParallaxHero>

      {/* Wrapper for content below hero to apply consistent padding */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 space-y-10 md:space-y-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl sm:text-2xl">
              <Info className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm sm:text-base">
              Our AI-powered news summarizer intelligently processes the content of cricket articles,
              identifying key information, significant events, and main conclusions. It then condenses
              this into easy-to-read bullet points, saving you time while keeping you informed.
              Simply paste the article text into the form below and let our AI do the rest!
            </p>
          </CardContent>
        </Card>
        
        <div className="max-w-3xl mx-auto">
          <NewsSummaryForm />
        </div>

        <div className="space-y-8">
          <Card className="shadow-lg border-none bg-transparent">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center text-2xl sm:text-3xl font-bold">
                <Newspaper className="h-7 w-7 sm:h-8 sm:w-8 mr-3 text-primary" />
                Latest Cricket Headlines
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-muted-foreground mt-1">
                Explore recent news from the world of cricket. Click any card to read more (simulated).
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockNewsHeadlines.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {mockNewsHeadlines.map((headline) => (
                    <NewsHeadlineCard key={headline.id} newsItem={headline} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No news headlines available at the moment.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
