
import NewsSummaryForm from "@/components/news/news-summary-form";
import ParallaxHero from "@/components/common/parallax-hero";
import { BotMessageSquare, Info, ListChecks, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockNewsHeadlines } from '@/lib/mock-data.js';
import NewsHeadlineCard from "@/components/news/news-headline-card";

export default function NewsSummaryPage() {
  return (
    <div className="space-y-8">
      <ParallaxHero 
        imageUrl="https://placehold.co/1600x400.png" 
        data-ai-hint="artificial intelligence abstract" 
        minHeight="300px" 
        overlayOpacity={0.5}
      >
        <div className="flex items-center justify-center flex-col">
          <BotMessageSquare className="h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl font-bold text-background">AI News Summarizer</h1>
          <p className="text-lg text-background/90 mt-2 max-w-2xl text-center">
            Get concise bullet-point summaries of lengthy cricket news articles using advanced AI.
          </p>
        </div>
      </ParallaxHero>

      {/* Wrapper for content below hero to apply consistent padding */}
      <div className="container mx-auto px-8 space-y-12"> {/* Increased space-y */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Info className="h-6 w-6 mr-3 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
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
              <CardTitle className="flex items-center justify-center text-3xl font-bold">
                <Newspaper className="h-8 w-8 mr-3 text-primary" />
                Latest Cricket Headlines
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-1">
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
