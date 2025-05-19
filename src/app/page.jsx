
import Link from 'next/link';
import ParallaxHero from '@/components/common/parallax-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, LayoutList, Shield, BotMessageSquare, Zap, Users, MessageCircleQuestion, MailCheck, Quote } from 'lucide-react';
import { mockMatches, mockPlayers, mockTestimonials } from '@/lib/mock-data.js';
import Image from 'next/image';
import PlayersCarousel from '@/components/players/players-carousel';
import AnimatedStatsSection from '@/components/common/animated-stats-section';
import ContactForm from '@/components/forms/contact-form';
import NewsletterSubscribeForm from '@/components/forms/newsletter-subscribe-form';
import ScrollingTestimonials from '@/components/testimonials/scrolling-testimonials';


export default function HomePage() {
  const liveMatch = mockMatches.find(match => match.status === 'Live') || mockMatches[0];

  const appStats = [
    { targetDisplayValue: 75, suffix: '+', label: "Tournaments Covered", duration: 1800 },
    { targetDisplayValue: 1.2, suffix: 'K+', label: "Registered Fans", duration: 2200 },
    { targetDisplayValue: 5, suffix: 'M+', label: "Matches Followed", duration: 2600 },
  ];

  return (
    <div className="space-y-12">
      <ParallaxHero
        imageUrl="https://img.freepik.com/free-photo/cricket-equipment-digital-art_23-2151761280.jpg?ga=GA1.1.1241576049.1745840677&semt=ais_hybrid&w=740"
        data-ai-hint="cricket digital art"
        minHeight="80vh"
        overlayOpacity={0.65}
      >
        <div className="w-full container mx-auto px-8 h-full relative">
          
          <div className="flex items-center h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">

              {/* Left Content Block */}
              <div className="text-center lg:text-left">
                <div className="text-sm text-background/80 flex items-center justify-center lg:justify-start mb-3 animate-fade-in-down [animation-delay:0s]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-accent mr-1.5"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                  <span>Your Premier Cricket Companion</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-background mb-6 leading-tight animate-fade-in-down [animation-delay:0.2s]">
                  Live Scores.<br />
                  Latest News.<br />
                  <span className="text-accent">Your CricNow.</span>
                </h1>
              </div>

              {/* Right Content Block (Description & Button) */}
              <div className="text-center lg:text-left lg:pl-6 xl:pl-12">
                <p className="text-lg sm:text-xl text-background/90 mb-8 max-w-md mx-auto lg:mx-0 animate-fade-in-up [animation-delay:0.4s]">
                  Your ultimate destination for live cricket scores, match schedules, team insights, and AI-powered news summaries.
                </p>
                <Button size="lg" asChild className="rounded-full px-10 py-3 text-lg font-semibold group shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up [animation-delay:0.6s]">
                  <Link href="/matches">
                    Explore Matches
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ParallaxHero>

      {/* Wrapper for constrained content */}
      <div className="container mx-auto px-8 space-y-12">
        <section id="live-scores" aria-labelledby="live-scores-heading">
          <h2 id="live-scores-heading" className="text-3xl font-bold text-center mb-8">
            <Zap className="inline-block h-8 w-8 mr-2 text-primary" /> Live Action
          </h2>
          {liveMatch && (
            <Card className="max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl flex items-center justify-between">
                  <span>{liveMatch.team1} vs {liveMatch.team2}</span>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">{liveMatch.status}</span>
                </CardTitle>
                <CardDescription>{liveMatch.tournament} - {liveMatch.venue}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-2 gap-4 items-center my-4">
                  <div className="text-left">
                    {liveMatch.team1Logo && <Image src={liveMatch.team1Logo} alt={`${liveMatch.team1} logo`} width={40} height={40} className="mx-auto mb-2 rounded-full" data-ai-hint="team logo" />}
                    <p className="text-xl font-semibold">{liveMatch.team1}</p>
                    <p className="text-3xl font-bold text-primary">{liveMatch.team1Score || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    {liveMatch.team2Logo && <Image src={liveMatch.team2Logo} alt={`${liveMatch.team2} logo`} width={40} height={40} className="mx-auto mb-2 rounded-full" data-ai-hint="team logo" />}
                    <p className="text-xl font-semibold">{liveMatch.team2}</p>
                    <p className="text-3xl font-bold text-primary">{liveMatch.team2Score || 'N/A'}</p>
                  </div>
                </div>
                {liveMatch.overs && <p className="text-muted-foreground">Overs: {liveMatch.overs}</p>}
                <Button variant="outline" asChild className="mt-4">
                  <Link href={`/matches#${liveMatch.status.toLowerCase()}`}>
                    View Match Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
          {!liveMatch && (
              <p className="text-center text-muted-foreground">No live matches currently. Check upcoming matches!</p>
          )}
        </section>

        <section id="star-players" aria-labelledby="star-players-heading" className="relative pt-16 pb-8 overflow-hidden">
          <h3 id="star-players-heading" className="text-3xl font-bold text-center mb-2 flex items-center justify-center">
            <Users className="inline-block h-8 w-8 mr-3 text-primary" /> Meet Our Star Players
          </h3>
          <p className="text-center text-muted-foreground mb-10">Get to know some of the iconic players in the world of cricket.</p>
          <PlayersCarousel players={mockPlayers} />
        </section>

        <AnimatedStatsSection stats={appStats} backgroundText="OUR REACH" />

        <section id="features" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-3xl font-bold text-center mb-8">Explore CricNow</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Matches', description: 'Stay updated with upcoming, live, and recent match details.', href: '/matches', icon: LayoutList },
              { title: 'Teams', description: 'Discover comprehensive team profiles and player information.', href: '/teams', icon: Shield },
              { title: 'AI News Summary', description: 'Get quick insights from cricket news articles, summarized by AI.', href: '/news-summary', icon: BotMessageSquare },
            ].map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <feature.icon className="h-6 w-6 mr-3 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="link" asChild className="p-0 h-auto text-primary">
                    <Link href={feature.href}>
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div> {/* End of constrained content wrapper */}

      {/* Sections with full-width backgrounds */}
      <section id="newsletter" aria-labelledby="newsletter-heading" className="py-16 bg-secondary/30 rounded-lg">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in-left [animation-delay:0.2s]">
              <MailCheck className="h-16 w-16 text-primary mx-auto md:mx-0 mb-4" />
              <h2 id="newsletter-heading" className="text-3xl font-bold mb-3">
                Stay Ahead of the Game!
              </h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto md:mx-0">
                Subscribe to our newsletter for the latest cricket news, match updates, and exclusive content delivered straight to your inbox.
              </p>
            </div>
            <div className="flex justify-center animate-fade-in-right [animation-delay:0.4s]">
              <NewsletterSubscribeForm />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" aria-labelledby="testimonials-heading" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-8 text-center">
          <Quote className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            What Our Fans Say
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Hear from cricket enthusiasts who love using CricNow to stay connected to the game.
          </p>
        </div>
        <ScrollingTestimonials testimonials={mockTestimonials} />
      </section>


      <section id="contact-us" aria-labelledby="contact-us-heading" className="py-12 md:py-16 bg-muted/50 rounded-lg">
        <div className="container mx-auto px-8">
          <h2 id="contact-us-heading" className="text-3xl font-bold text-center mb-4 flex items-center justify-center">
            <MessageCircleQuestion className="inline-block h-8 w-8 mr-3 text-primary" /> Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question, feedback, or a partnership inquiry, please reach out.
          </p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center md:justify-end">
              <Image
                src="https://placehold.co/600x800.png" 
                alt="AI Generated 3D Batsman"
                width={450}
                height={600}
                className="rounded-lg shadow-2xl object-cover"
                data-ai-hint="batsman confident"
              />
            </div>
            <div className="flex justify-center md:justify-start">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

