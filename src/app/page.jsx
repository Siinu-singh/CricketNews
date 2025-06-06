
import Link from 'next/link';
import ParallaxHero from '@/components/common/parallax-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, LayoutList, Shield, BotMessageSquare, Zap, Users, MessageCircleQuestion, MailCheck, Quote, Star, Bell, Globe, Shuffle, Users2, Languages, Smartphone, MousePointerClick } from 'lucide-react';
import { mockMatches, mockPlayers, mockTestimonials } from '@/lib/mock-data.js';
import Image from 'next/image';
import PlayersCarousel from '@/components/players/players-carousel';
import AnimatedStatsSection from '@/components/common/animated-stats-section';
import ContactForm from '@/components/forms/contact-form';
import NewsletterSubscribeForm from '@/components/forms/newsletter-subscribe-form';
import ScrollingTestimonials from '@/components/testimonials/scrolling-testimonials';

export const metadata = {
  title: 'IndiaMatch - Your Digital Home for Cricket',
  description: 'IndiaMatch is your all-access pass to the world of cricket, delivering lightning-fast live scores, ball-by-ball commentary, expert insights, and instant alerts. Built for passionate cricket fans.',
  keywords: ['cricket', 'live scores', 'IndiaMatch', 'cricket news', 'match commentary', 'cricket platform'],
  openGraph: {
    title: 'IndiaMatch - Your Digital Home for Cricket',
    description: 'Explore live scores, player stats, team details, and AI news summaries on IndiaMatch.',
    url: 'https://yourdomain.com/', // Replace with your actual domain
    images: [
      {
        url: 'https://yourdomain.com/og-homepage.png', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'IndiaMatch Homepage Overview',
      },
    ],
  },
  twitter: {
    title: 'IndiaMatch - Your Cricket Hub',
    description: 'Stay updated with all things cricket on the IndiaMatch homepage.',
    images: ['https://yourdomain.com/twitter-homepage.png'], // Replace
  },
  alternates: {
    canonical: 'https://yourdomain.com/', // Replace
  },
};


export default function HomePage() {
  const liveMatch = mockMatches.find(match => match.status === 'Live') || mockMatches[0];

  const appStats = [
    { targetDisplayValue: 75, suffix: '+', label: "Tournaments Covered", duration: 1800 },
    { targetDisplayValue: 1.2, suffix: 'K+', label: "Registered Fans", duration: 2200 },
    { targetDisplayValue: 5, suffix: 'M+', label: "Matches Followed", duration: 2600 },
  ];

  const indiaMatchFeatures = [
    { icon: Zap, text: "Live Scores & Commentary: Real-time updates with lightning speed." },
    { icon: LayoutList, text: "Match Center: Stats, player profiles, pitch reports, and post-match analysis." },
    { icon: Users2, text: "Personalized Feeds: Follow your favorite teams, players, and leagues." },
    { icon: Bell, text: "Smart Notifications: Only the alerts you care about — nothing more, nothing less." },
    { icon: Languages, text: "Multilingual Support: Content in English, Hindi, and more regional languages coming soon." },
    { icon: Smartphone, text: "Web + App Integration: Switch devices without missing a single ball." },
    { icon: MousePointerClick, text: "Interactive Polls & Fan Predictions: Your opinion matters — see how your views stack up." },
  ];

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20"> {/* Main page wrapper */}
      <ParallaxHero
        imageUrl="https://img.freepik.com/free-photo/cricket-equipment-digital-art_23-2151761280.jpg?ga=GA1.1.1241576049.1745840677&semt=ais_hybrid&w=740"
        data-ai-hint="cricket digital art"
        minHeight="80vh"
        overlayOpacity={0.65}
      >
        {/* Hero content is constrained by this inner container */}
        <div className="w-full container mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center items-center text-center lg:text-left min-h-[80vh] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14 md:pb-16">
          <div className="flex items-center w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
              {/* Left Content Block */}
              <div className="text-center lg:text-left">
                <div className="text-sm text-background/80 flex items-center justify-center lg:justify-start mb-3 animate-fade-in-down [animation-delay:0s]">
                  <Star className="text-accent mr-1.5 h-4 w-4" />
                  <span>Your Premier Cricket Companion</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-background mb-6 leading-tight animate-fade-in-down [animation-delay:0.2s]">
                  Welcome to IndiaMatch<br />
                  <span className="text-accent">Your Digital Home for Cricket.</span>
                </h1>
              </div>

              {/* Right Content Block (Description & Button) */}
              <div className="text-center lg:text-left lg:pl-6 xl:pl-12">
                <p className="text-lg sm:text-xl text-background/90 mb-8 max-w-md mx-auto lg:mx-0 animate-fade-in-up [animation-delay:0.4s]">
                  Cricket isn’t just a sport in India — it’s a heartbeat, a daily ritual, a shared emotion that connects millions.
                </p>
                <Button size="lg" asChild className="rounded-full px-8 sm:px-10 py-3 text-base sm:text-lg font-semibold group shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up [animation-delay:0.6s]">
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

      {/* Wrapper for constrained content for most sections */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 space-y-12 md:space-y-16 lg:space-y-20">
        <section id="live-scores" aria-labelledby="live-scores-heading">
          <h2 id="live-scores-heading" className="text-2xl sm:text-3xl font-bold text-center mb-8">
            <Zap className="inline-block h-7 w-7 sm:h-8 sm:w-8 mr-2 text-primary" /> Live Action
          </h2>
          {liveMatch && (
            <Card className="max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl sm:text-2xl flex items-center justify-between">
                  <span>{liveMatch.team1} vs {liveMatch.team2}</span>
                  <span className="text-xs sm:text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">{liveMatch.status}</span>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">{liveMatch.tournament} - {liveMatch.venue}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-2 gap-4 items-center my-4">
                  <div className="text-left">
                    {liveMatch.team1Logo && <Image src={liveMatch.team1Logo} alt={`${liveMatch.team1} logo`} width={40} height={40} className="mx-auto mb-2 rounded-full" data-ai-hint="team logo" />}
                    <p className="text-lg sm:text-xl font-semibold">{liveMatch.team1}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">{liveMatch.team1Score || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    {liveMatch.team2Logo && <Image src={liveMatch.team2Logo} alt={`${liveMatch.team2} logo`} width={40} height={40} className="mx-auto mb-2 rounded-full" data-ai-hint="team logo" />}
                    <p className="text-lg sm:text-xl font-semibold">{liveMatch.team2}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">{liveMatch.team2Score || 'N/A'}</p>
                  </div>
                </div>
                {liveMatch.overs && <p className="text-muted-foreground text-sm sm:text-base">Overs: {liveMatch.overs}</p>}
                <Button variant="outline" asChild className="mt-4 text-sm sm:text-base">
                  <Link href={`/matches#${liveMatch.id}`}>
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

        {/* IndiaMatch Introduction Section */}
        <section id="about-indiamatch" aria-labelledby="about-indiamatch-heading" className="py-8 space-y-8">
          <h2 id="about-indiamatch-heading" className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">
            Discover IndiaMatch
          </h2>
          <Card className="shadow-lg">
            <CardContent className="pt-6 text-base sm:text-lg leading-relaxed space-y-4 text-foreground/90">
              <p>
                At IndiaMatch, we exist to keep that passion alive and thriving in the digital world. Whether you’re watching a nail-biting T20 finish on your commute or checking score updates between meetings, we make sure the game stays with you, no matter where life takes you.
              </p>
              <p>
                IndiaMatch is more than just a platform — it’s your all-access pass to the world of cricket, built for a generation that lives online, demands real-time access, and craves deeper connections with the game.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-primary">Always On, Always Cricket</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground/80 space-y-3 text-sm sm:text-base">
                <p>
                  We know today’s fans don’t want to wait for updates. That’s why IndiaMatch delivers lightning-fast live scores, ball-by-ball commentary, expert insights, and instant alerts — all optimized for web and mobile. Whether it’s a weekend ODI, a test match in England, or a high-stakes IPL clash, we’ve got you covered.
                </p>
                <p>
                  Our platform is designed for seamless, responsive performance. From lag-free video highlights to AI-curated match predictions, we ensure the experience is rich, intuitive, and perfectly suited to your device of choice.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-primary">Built by Passionate Fans, For Passionate Fans</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground/80 space-y-3 text-sm sm:text-base">
                <p>
                  Behind IndiaMatch is a team of cricket-obsessed professionals — editors, developers, designers, and data analysts — who live and breathe the sport. We’re not just building another scores app. We’re creating an experience. Every feature is thoughtfully designed with one thing in mind: how can we make cricket better, more engaging, and more accessible for you?
                </p>
                <p>
                  Expect regular product upgrades, smarter notifications, cleaner interfaces, and community features that allow fans to interact, debate, and celebrate the sport together.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section id="star-players" aria-labelledby="star-players-heading" className="relative pt-12 sm:pt-16 pb-8 overflow-hidden">
          <h2 id="star-players-heading" className="text-2xl sm:text-3xl font-bold text-center mb-2 flex items-center justify-center">
            <Users className="inline-block h-7 w-7 sm:h-8 sm:w-8 mr-3 text-primary" /> Meet Our Star Players
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-10 text-sm sm:text-base">Get to know some of the iconic players in the world of cricket.</p>
          <PlayersCarousel players={mockPlayers} />
        </section>

        <AnimatedStatsSection stats={appStats} backgroundText="OUR REACH" />

        <section id="features" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-center mb-8">Explore CricNow Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Matches', description: 'Stay updated with upcoming, live, and recent match details.', href: '/matches', icon: LayoutList },
              { title: 'Teams', description: 'Discover comprehensive team profiles and player information.', href: '/teams', icon: Shield },
              { title: 'AI News Summary', description: 'Get quick insights from cricket news articles, summarized by AI.', href: '/news-summary', icon: BotMessageSquare },
            ].map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">{feature.description}</p>
                  <Button variant="link" asChild className="p-0 h-auto text-primary text-sm sm:text-base">
                    <Link href={feature.href}>
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div> {/* End of main constrained content wrapper */}

      {/* Sections with full-width backgrounds */}
      <section id="newsletter" aria-labelledby="newsletter-heading" className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in-left [animation-delay:0.2s]">
              <MailCheck className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto md:mx-0 mb-4" />
              <h2 id="newsletter-heading" className="text-2xl sm:text-3xl font-bold mb-3">
                Stay Ahead of the Game!
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-6 max-w-md mx-auto md:mx-0">
                Subscribe to our newsletter for the latest cricket news, match updates, and exclusive content delivered straight to your inbox.
              </p>
            </div>
            <div className="flex justify-center animate-fade-in-right [animation-delay:0.4s]">
              <NewsletterSubscribeForm />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" aria-labelledby="testimonials-heading" className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Quote className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
          <h2 id="testimonials-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
            What Our Fans Say
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto">
            Hear from cricket enthusiasts who love using CricNow to stay connected to the game.
          </p>
        </div>
        <ScrollingTestimonials testimonials={mockTestimonials} /> {/* This component handles its own width for scrolling effect */}
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 space-y-12 md:space-y-16 lg:space-y-20 py-12 md:py-16">
        <section id="india-match-key-features" aria-labelledby="india-match-key-features-heading">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle id="india-match-key-features-heading" className="text-xl sm:text-2xl text-center text-primary">Features That Set Us Apart</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 sm:space-y-4">
                {indiaMatchFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start p-3 bg-muted/50 rounded-lg">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground/90 text-sm sm:text-base">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-primary">Cricket Anytime, Anywhere</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 space-y-3 text-sm sm:text-base">
              <p>
                Gone are the days of checking scores on television or waiting for news updates. With IndiaMatch, cricket follows you. Whether you’re stuck in traffic, on a train, or at the office, the match is just a tap away.
              </p>
              <p>
                And it’s not just about watching — it’s about being a part of the game. Chat live during matches, participate in fantasy leagues, share your hot takes, and explore deep-dive analytics with one tap.
              </p>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-primary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground/80 space-y-3 text-sm sm:text-base">
                <p>
                  We’re building IndiaMatch for the long haul — as a leading platform for cricket lovers in India and beyond. The internet has changed how we consume content. It’s time it changed how we experience cricket too.
                </p>
                <p>
                  We envision a world where fans can interact with the sport in real-time, across platforms, and build connections that go beyond borders. Our goal? To become the most trusted and loved digital destination for cricket.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-primary">Join the IndiaMatch Movement</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground/80 space-y-3 text-sm sm:text-base">
                <p>
                  We’re just getting started. With each match, update, and upgrade, we’re evolving — and so is the game. Join the IndiaMatch community today and be part of the next generation of cricket fandom.
                </p>
                <p className="font-semibold text-primary">
                  Stay connected. Stay passionate. Stay in the game — with IndiaMatch.
                </p>
              </CardContent>
            </Card>
        </div>
      </div>
      
      <section id="contact-us" aria-labelledby="contact-us-heading" className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 id="contact-us-heading" className="text-2xl sm:text-3xl font-bold text-center mb-4 flex items-center justify-center">
            <MessageCircleQuestion className="inline-block h-7 w-7 sm:h-8 sm:w-8 mr-3 text-primary" /> Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base">
            We'd love to hear from you! Whether you have a question, feedback, or a partnership inquiry, please reach out.
          </p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center md:justify-end">
              <Image
                src="https://placehold.co/600x800.png" 
                alt="AI Generated 3D Batsman in confident pose"
                width={450}
                height={600}
                className="rounded-lg shadow-2xl object-cover max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none"
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
