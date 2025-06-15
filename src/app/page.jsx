
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
  title: 'CricketNews - Your Digital Home for Cricket',
  description: 'CricketNews is your all-access pass to the world of cricket, delivering lightning-fast live scores, ball-by-ball commentary, expert insights, and instant alerts. Built for passionate cricket fans.',
  keywords: ['cricket', 'live scores', 'CricketNews', 'cricket news', 'match commentary', 'cricket platform'],
  openGraph: {
    title: 'CricketNews - Your Digital Home for Cricket',
    description: 'Explore live scores, player stats, team details, and AI news summaries on CricketNews.',
    url: 'https://yourdomain.com/',
    images: [
      {
        url: 'https://yourdomain.com/og-homepage.png',
        width: 1200,
        height: 630,
        alt: 'CricketNews Homepage Overview',
      },
    ],
  },
  twitter: {
    title: 'CricketNews - Your Cricket Hub',
    description: 'Stay updated with all things cricket on the CricketNews homepage.',
    images: ['https://yourdomain.com/twitter-homepage.png'],
  },
  alternates: {
    canonical: 'https://yourdomain.com/',
  },
};


export default function HomePage() {
  const liveMatch = mockMatches.find(match => match.status === 'Live') || mockMatches[0];

  const appStats = [
    { targetDisplayValue: 75, suffix: '+', label: "Tournaments Covered", duration: 1800 },
    { targetDisplayValue: 1.2, suffix: 'K+', label: "Registered Fans", duration: 2200 },
    { targetDisplayValue: 5, suffix: 'M+', label: "Matches Followed", duration: 2600 },
  ];

  const cricketNewsFeatures = [
    { icon: Zap, text: "Live Scores & Commentary: Real-time updates with lightning speed." },
    { icon: LayoutList, text: "Match Center: Stats, player profiles, pitch reports, and post-match analysis." },
    { icon: Users2, text: "Personalized Feeds: Follow your favorite teams, players, and leagues." },
    { icon: Bell, text: "Smart Notifications: Only the alerts you care about — nothing more, nothing less." },
    { icon: Languages, text: "Multilingual Support: Content in English, Hindi, and more regional languages coming soon." },
    { icon: Smartphone, text: "Web + App Integration: Switch devices without missing a single ball." },
    { icon: MousePointerClick, text: "Interactive Polls & Fan Predictions: Your opinion matters — see how your views stack up." },
  ];

  return (
    <div className="space-y-10 md:space-y-14 lg:space-y-16 2xl:space-y-20 3xl:space-y-24"> {/* Main page wrapper */}
      <ParallaxHero
        imageUrl="https://img.freepik.com/free-photo/cricket-equipment-digital-art_23-2151761280.jpg?ga=GA1.1.1241576049.1745840677&semt=ais_hybrid&w=740"
        data-ai-hint="cricket digital art"
        minHeight="75vh" 
        className="sm:min-h-[80vh] 2xl:min-h-[85vh] 3xl:min-h-[90vh]"
        overlayOpacity={0.65}
      >
        <div className="w-full container mx-auto flex flex-col justify-center items-center text-center lg:text-left min-h-[75vh] sm:min-h-[80vh] 2xl:min-h-[85vh] 3xl:min-h-[90vh] pt-20 sm:pt-24 md:pt-28 lg:pt-32 2xl:pt-40 3xl:pt-48 pb-10 sm:pb-12 md:pb-14 2xl:pb-20 3xl:pb-24">
          <div className="flex items-center w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 2xl:gap-12 w-full items-center">
              <div className="text-center lg:text-left">
                <div className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-background/80 flex items-center justify-center lg:justify-start mb-2 sm:mb-3 2xl:mb-4 animate-fade-in-down [animation-delay:0s]">
                  <Star className="text-accent mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 2xl:h-5 2xl:w-5" />
                  <span>Your Premier Cricket Companion</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-extrabold tracking-tight text-background mb-4 sm:mb-6 2xl:mb-8 leading-tight animate-fade-in-down [animation-delay:0.2s]">
                  Welcome to CricketNews<br />
                  <span className="text-accent">Your Digital Home for Cricket.</span>
                </h1>
              </div>

              <div className="text-center lg:text-left lg:pl-4 xl:pl-8 2xl:pl-16">
                <p className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl text-background/90 mb-6 sm:mb-8 2xl:mb-10 max-w-sm md:max-w-md 2xl:max-w-lg 3xl:max-w-xl mx-auto lg:mx-0 animate-fade-in-up [animation-delay:0.4s]">
                  Cricket isn’t just a sport in India — it’s a heartbeat, a daily ritual, a shared emotion that connects millions.
                </p>
                <Button size="lg" asChild className="rounded-full px-6 sm:px-8 md:px-10 2xl:px-12 3xl:px-14 py-2.5 sm:py-3 2xl:py-3.5 3xl:py-4 text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl font-semibold group shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up [animation-delay:0.6s]">
                  <Link href="/matches">
                    Explore Matches
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ParallaxHero>

      <div className="container space-y-10 md:space-y-14 lg:space-y-16 2xl:space-y-20 3xl:space-y-24">
        <section id="live-scores" aria-labelledby="live-scores-heading">
          <h2 id="live-scores-heading" className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-center mb-6 md:mb-8 2xl:mb-10">
            <Zap className="inline-block h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 2xl:h-9 2xl:w-9 3xl:h-10 3xl:w-10 mr-2 2xl:mr-3 text-primary" /> Live Action
          </h2>
          {liveMatch && (
            <Card className="max-w-lg md:max-w-xl lg:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-1.5 sm:pb-2 2xl:pb-3">
                <CardTitle className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl flex items-center justify-between">
                  <span>{liveMatch.team1} vs {liveMatch.team2}</span>
                  <span className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-medium text-primary bg-primary/10 px-1.5 py-0.5 sm:px-2 sm:py-1 2xl:px-3 2xl:py-1.5 rounded-md">{liveMatch.status}</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">{liveMatch.tournament} - {liveMatch.venue}</CardDescription>
              </CardHeader>
              <CardContent className="text-center px-3 sm:px-4 md:px-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 2xl:gap-6 items-center my-3 sm:my-4 2xl:my-6">
                  <div className="text-left">
                    {liveMatch.team1Logo && <Image src={liveMatch.team1Logo} alt={`${liveMatch.team1} logo`} width={32} height={32} className="mx-auto mb-1.5 sm:mb-2 2xl:mb-3 rounded-full w-8 h-8 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 object-contain" data-ai-hint="team logo" />}
                    <p className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl font-semibold">{liveMatch.team1}</p>
                    <p className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-primary">{liveMatch.team1Score || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    {liveMatch.team2Logo && <Image src={liveMatch.team2Logo} alt={`${liveMatch.team2} logo`} width={32} height={32} className="mx-auto mb-1.5 sm:mb-2 2xl:mb-3 rounded-full w-8 h-8 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 object-contain" data-ai-hint="team logo" />}
                    <p className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl font-semibold">{liveMatch.team2}</p>
                    <p className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-primary">{liveMatch.team2Score || 'N/A'}</p>
                  </div>
                </div>
                {liveMatch.overs && <p className="text-muted-foreground text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">Overs: {liveMatch.overs}</p>}
                <Button variant="outline" asChild className="mt-3 sm:mt-4 2xl:mt-6 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl px-3 py-1.5 sm:px-4 sm:py-2 2xl:px-6 2xl:py-5">
                  <Link href={`/matches#${liveMatch.id}`}>
                    View Match Details <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 2xl:h-5 2xl:w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
          {!liveMatch && (
              <p className="text-center text-muted-foreground text-sm sm:text-base 2xl:text-lg 3xl:text-xl">No live matches currently. Check upcoming matches!</p>
          )}
        </section>

        <section id="about-cricketnews" aria-labelledby="about-cricketnews-heading" className="py-6 sm:py-8 2xl:py-12 space-y-6 sm:space-y-8 2xl:space-y-10">
          <h2 id="about-cricketnews-heading" className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-center text-primary mb-4 sm:mb-6 2xl:mb-8">
            Discover CricketNews
          </h2>
          <Card className="shadow-lg">
            <CardContent className="pt-4 sm:pt-6 2xl:pt-8 text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl leading-relaxed space-y-3 sm:space-y-4 2xl:space-y-6 text-foreground/90 px-3 sm:px-4 md:px-6">
              <p>
                At CricketNews, we exist to keep that passion alive and thriving in the digital world. Whether you’re watching a nail-biting T20 finish on your commute or checking score updates between meetings, we make sure the game stays with you, no matter where life takes you.
              </p>
              <p>
                CricketNews is more than just a platform — it’s your all-access pass to the world of cricket, built for a generation that lives online, demands real-time access, and craves deeper connections with the game.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 2xl:gap-10 items-start">
            <Card className="shadow-md">
              <CardHeader className="pb-2 sm:pb-3 2xl:pb-4 px-3 sm:px-4 md:px-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl text-primary">Always On, Always Cricket</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground/80 space-y-2.5 sm:space-y-3 2xl:space-y-4 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl px-3 sm:px-4 md:px-6">
                <p>
                  We know today’s fans don’t want to wait for updates. That’s why CricketNews delivers lightning-fast live scores, ball-by-ball commentary, expert insights, and instant alerts — all optimized for web and mobile. Whether it’s a weekend ODI, a test match in England, or a high-stakes IPL clash, we’ve got you covered.
                </p>
                <p>
                  Our platform is designed for seamless, responsive performance. From lag-free video highlights to AI-curated match predictions, we ensure the experience is rich, intuitive, and perfectly suited to your device of choice.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-2 sm:pb-3 2xl:pb-4 px-3 sm:px-4 md:px-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl text-primary">Built by Passionate Fans, For Passionate Fans</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground/80 space-y-2.5 sm:space-y-3 2xl:space-y-4 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl px-3 sm:px-4 md:px-6">
                <p>
                  Behind CricketNews is a team of cricket-obsessed professionals — editors, developers, designers, and data analysts — who live and breathe the sport. We’re not just building another scores app. We’re creating an experience. Every feature is thoughtfully designed with one thing in mind: how can we make cricket better, more engaging, and more accessible for you?
                </p>
                <p>
                  Expect regular product upgrades, smarter notifications, cleaner interfaces, and community features that allow fans to interact, debate, and celebrate the sport together.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div> {/* End of first container block */}
      
      {/* Star Players Section - Now Full Width for Background Effect */}
      <section id="star-players" aria-labelledby="star-players-heading" className="relative pt-8 sm:pt-12 2xl:pt-20 pb-6 sm:pb-8 2xl:pb-12 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none select-none" aria-hidden="true">
          <h2 className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[14rem] xl:text-[18rem] 2xl:text-[22rem] 3xl:text-[26rem] font-extrabold text-foreground/5 dark:text-foreground/10 opacity-50 leading-none tracking-tighter whitespace-nowrap">
            PLAYERS
          </h2>
        </div>
        <div className="container"> {/* Container for the content within star-players */}
          <div className="relative z-10">
            <h2 id="star-players-heading" className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-center mb-1.5 sm:mb-2 2xl:mb-3 flex items-center justify-center">
              <Users className="inline-block h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 2xl:h-9 2xl:w-9 3xl:h-10 3xl:w-10 mr-2.5 sm:mr-3 2xl:mr-4 text-primary" /> Meet Our Star Players
            </h2>
            <p className="text-center text-muted-foreground mb-6 sm:mb-8 2xl:mb-12 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">Get to know some of the iconic players in the world of cricket.</p>
            <PlayersCarousel players={mockPlayers} />
          </div>
        </div>
      </section>

      {/* Container for sections that were previously after star-players in the same container */}
      <div className="container space-y-10 md:space-y-14 lg:space-y-16 2xl:space-y-20 3xl:space-y-24">
        <AnimatedStatsSection stats={appStats} backgroundText="OUR REACH" />

        <section id="cricketnews-features" aria-labelledby="cricketnews-features-heading">
          <h2 id="cricketnews-features-heading" className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-center mb-6 md:mb-8 2xl:mb-10">Explore CricketNews Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8">
            {[
              { title: 'Matches', description: 'Stay updated with upcoming, live, and recent match details.', href: '/matches', icon: LayoutList },
              { title: 'Teams', description: 'Discover comprehensive team profiles and player information.', href: '/teams', icon: Shield },
              { title: 'AI News Summary', description: 'Get quick insights from cricket news articles, summarized by AI.', href: '/news-summary', icon: BotMessageSquare },
            ].map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2 sm:pb-3 2xl:pb-4 px-3 sm:px-4 md:px-6">
                  <CardTitle className="flex items-center text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl">
                    <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 2xl:h-7 2xl:w-7 mr-2 sm:mr-3 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 sm:px-4 md:px-6">
                  <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">{feature.description}</p>
                  <Button variant="link" asChild className="p-0 h-auto text-primary text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">
                    <Link href={feature.href}>
                      Learn More <ArrowRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4 2xl:h-5 2xl:w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div> 

      <section id="newsletter" aria-labelledby="newsletter-heading" className="py-10 sm:py-12 md:py-16 2xl:py-20 3xl:py-24 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 2xl:gap-16 items-center">
            <div className="text-center md:text-left animate-fade-in-left [animation-delay:0.2s]">
              <MailCheck className="h-10 w-10 sm:h-12 md:h-16 2xl:h-20 3xl:h-24 text-primary mx-auto md:mx-0 mb-3 sm:mb-4 2xl:mb-6" />
              <h2 id="newsletter-heading" className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold mb-2 sm:mb-3 2xl:mb-4">
                Stay Ahead of the Game!
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl mb-4 sm:mb-6 2xl:mb-8 max-w-sm md:max-w-md 2xl:max-w-lg 3xl:max-w-xl mx-auto md:mx-0">
                Subscribe to our newsletter for the latest cricket news, match updates, and exclusive content delivered straight to your inbox.
              </p>
            </div>
            <div className="flex justify-center animate-fade-in-right [animation-delay:0.4s]">
              <NewsletterSubscribeForm />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" aria-labelledby="testimonials-heading" className="py-10 sm:py-12 md:py-16 lg:py-20 2xl:py-28 3xl:py-32 bg-background">
        <div className="container text-center">
          <Quote className="h-8 w-8 sm:h-10 md:h-12 2xl:h-14 3xl:h-16 text-primary mx-auto mb-3 sm:mb-4 2xl:mb-6" />
          <h2 id="testimonials-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold mb-3 sm:mb-4 2xl:mb-5 text-foreground">
            What Our Fans Say
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl mb-8 sm:mb-10 2xl:mb-14 max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto">
            Hear from cricket enthusiasts who love using CricketNews to stay connected to the game.
          </p>
        </div>
        <ScrollingTestimonials testimonials={mockTestimonials} />
      </section>

      <div className="container space-y-10 md:space-y-14 lg:space-y-16 2xl:space-y-20 3xl:space-y-24 py-10 sm:py-12 md:py-16 2xl:py-20 3xl:py-24">
        <section id="cricketnews-key-features" aria-labelledby="cricketnews-key-features-heading">
          <Card className="shadow-lg">
            <CardHeader className="pb-2 sm:pb-3 2xl:pb-4 px-3 sm:px-4 md:px-6">
              <CardTitle id="cricketnews-key-features-heading" className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl text-center text-primary">Features That Set Us Apart</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 md:px-6 2xl:pt-2">
              <ul className="space-y-2.5 sm:space-y-3 2xl:space-y-5">
                {cricketNewsFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start p-2.5 sm:p-3 2xl:p-4 bg-muted/50 rounded-lg">
                    <feature.icon className="h-4 w-4 sm:h-5 sm:w-6 2xl:h-7 2xl:w-7 mr-2.5 sm:mr-3 sm:mr-4 text-accent flex-shrink-0 mt-0.5 sm:mt-1" />
                    <span className="text-foreground/90 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Card className="shadow-md">
            <CardHeader className="pb-2 sm:pb-3 2xl:pb-4 px-3 sm:px-4 md:px-6">
              <CardTitle className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl text-primary">Cricket Anytime, Anywhere</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 space-y-2.5 sm:space-y-3 2xl:space-y-4 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl px-3 sm:px-4 md:px-6">
              <p>
                Gone are the days of checking scores on television or waiting for news updates. With CricketNews, cricket follows you. Whether you’re stuck in traffic, on a train, or at the office, the match is just a tap away.
              </p>
              <p>
                And it’s not just about watching — it’s about being a part of the game. Chat live during matches, participate in fantasy leagues, share your hot takes, and explore deep-dive analytics with one tap.
              </p>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 2xl:gap-10 items-start">
            <Card className="shadow-md">
              <CardHeader className="pb-2 sm:pb-3 2xl:pb-4 px-3 sm:px-4 md:px-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl text-primary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground/80 space-y-2.5 sm:space-y-3 2xl:space-y-4 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl px-3 sm:px-4 md:px-6">
                <p>
                  We’re building CricketNews for the long haul — as a leading platform for cricket lovers in India and beyond. The internet has changed how we consume content. It’s time it changed how we experience cricket too.
                </p>
                <p>
                  We envision a world where fans can interact with the sport in real-time, across platforms, and build connections that go beyond borders. Our goal? To become the most trusted and loved digital destination for cricket.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader className="pb-2 sm:pb-3 2xl:pb-4 px-3 sm:px-4 md:px-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl text-primary">Join the CricketNews Movement</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground/80 space-y-2.5 sm:space-y-3 2xl:space-y-4 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl px-3 sm:px-4 md:px-6">
                <p>
                  We’re just getting started. With each match, update, and upgrade, we’re evolving — and so is the game. Join the CricketNews community today and be part of the next generation of cricket fandom.
                </p>
                <p className="font-semibold text-primary">
                  Stay connected. Stay passionate. Stay in the game — with CricketNews.
                </p>
              </CardContent>
            </Card>
        </div>
      </div>
      
      <section id="contact-us" aria-labelledby="contact-us-heading" className="py-10 sm:py-12 md:py-16 2xl:py-20 3xl:py-24 bg-muted/50">
        <div className="container">
          <h2 id="contact-us-heading" className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-center mb-3 sm:mb-4 2xl:mb-5 flex items-center justify-center">
            <MessageCircleQuestion className="inline-block h-6 w-6 sm:h-7 md:h-8 2xl:h-9 3xl:h-10 mr-2 sm:mr-3 text-primary" /> Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-6 sm:mb-8 2xl:mb-12 max-w-sm md:max-w-lg lg:max-w-xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">
            We'd love to hear from you! Whether you have a question, feedback, or a partnership inquiry, please reach out.
          </p>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 2xl:gap-16 items-center">
            <div className="flex justify-center md:justify-end">
              <Image
                src="https://images.unsplash.com/photo-1542596594-649edbc13630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjcmlja2V0JTIwYmF0bWFucyUyMHdpdGglMjBwb3NlfGVufDB8fHx8MTc0OTU0MjU5NXww&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="AI Generated 3D Batsman in confident pose"
                width={450}
                height={600}
                className="rounded-lg shadow-2xl object-cover max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md 2xl:max-w-xl 3xl:max-w-2xl w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] 2xl:h-[700px] 3xl:h-[800px]"
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


