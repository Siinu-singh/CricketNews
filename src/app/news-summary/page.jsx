
import NewsSummaryForm from "@/components/news/news-summary-form";
import ParallaxHero from "@/components/common/parallax-hero";
import { BotMessageSquare, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <p className="text-lg text-background/90 mt-2 max-w-2xl">
            Get concise bullet-point summaries of lengthy cricket news articles using advanced AI.
          </p>
        </div>
      </ParallaxHero>

      {/* Wrapper for content below hero to apply consistent padding */}
      <div className="container mx-auto px-8 space-y-8">
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
      </div>
    </div>
  );
}
