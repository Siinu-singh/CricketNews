
"use client";

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook, Twitter, Youtube, ArrowUpRight, Send } from 'lucide-react'; 
import { useToast } from '@/hooks/use-toast.js';

const CricketLogo = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M7.5 20a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 5.52c-.28 0-.5.22-.5.5v11.5c0 .28.22.5.5.5s.5-.22.5-.5V6.02c0-.28-.22-.5-.5-.5zm3.5-1.02c-.28 0-.5.22-.5.5v12.5c0 .28.22.5.5.5s.5-.22.5-.5V5c0-.28-.22-.5-.5-.5zm-7 0c-.28 0-.5.22-.5.5v12.5c0 .28.22.5.5.5s.5-.22.5-.5V5c0-.28-.22-.5-.5-.5zm-.75-1.5h8.5c.41 0 .75.34.75.75s-.34.75-.75.75h-8.5c-.41 0-.75-.34-.75-.75S7.34 3 7.75 3zM16.75 21.25l-4.72-9.45c-.16-.31.02-.69.36-.76l.07-.01c.19-.04.38.03.5.19l4.72 9.45c.16.31-.02.69-.36-.76l-.07.01c-.19-.04-.38-.03-.5-.19zM15.75 10.25c-.2-.4-.06-.89.32-1.12l.07-.04.08-.03 1.5-.5c.4-.13.83.14.92.54l.01.07.01.06.5 2c.13.4-.14.83-.54.92l-.07.01-.06.01-1.5.5c-.4.13-.83-.14-.92-.54l-.01-.07-.01-.06-.5-2z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const siteName = 'CricketNews';
  const { toast } = useToast();

  const sitemapLinks = [
    { href: '/', label: 'Home' },
    { href: '/matches', label: 'Matches' },
    { href: '/rankings', label: 'Rankings' },
    { href: '/news-summary', label: 'News Summary' },
    { href: '/teams', label: 'Teams' },
    { href: '/search', label: 'Search' },
  ];

  const socialLinks = [
    { href: '#', label: 'Instagram', icon: Instagram },
    { href: '#', label: 'Twitter', icon: Twitter },
    { href: '#', label: 'Youtube', icon: Youtube },
    { href: '#', label: 'Facebook', icon: Facebook },
  ];

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    console.log('Newsletter subscribed with email:', email);
    toast({
      title: "Subscribed!",
      description: `Thank you for subscribing. We'll keep you updated.`, 
      variant: "default",
    });
    event.target.reset();
  };

  return (
    <footer className="bg-muted/30 text-foreground py-8 sm:py-12 md:py-16 2xl:py-20 3xl:py-24 border-t border-border/40">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-x-6 lg:gap-x-8 xl:gap-x-12 gap-y-10 md:gap-y-12 md:items-start">
          
          <div className="md:col-span-7 lg:col-span-8 space-y-6 md:space-y-8 2xl:space-y-10"> 
            <div className="flex items-start gap-3 sm:gap-4 2xl:gap-5">
              <Link href="/" aria-label={`${siteName} Home`} className="shrink-0 mt-0.5 sm:mt-1">
                <CricketLogo className="h-7 w-7 sm:h-8 md:h-10 2xl:h-12 3xl:h-14 text-primary" />
              </Link>
              <div className="max-w-md lg:max-w-lg 2xl:max-w-xl 3xl:max-w-2xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold mb-1 sm:mb-1.5 2xl:mb-2">
                  Join our <span className="text-primary">newsletter</span> for tips, advice, match schedules, and exclusive offers!
                </h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl 2xl:mb-5">
                  Stay updated with the latest cricket buzz.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-md lg:max-w-lg 2xl:max-w-xl">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="flex-grow bg-background text-sm sm:text-base 2xl:text-lg h-10 sm:h-11 md:h-12 2xl:h-14 3xl:h-16 px-3 sm:px-4 2xl:px-5 rounded-full"
                    aria-label="Email for newsletter"
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="default" 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 rounded-full px-5 sm:px-6 2xl:px-8 py-2.5 sm:py-3 h-10 sm:h-11 md:h-12 2xl:h-14 3xl:h-16 flex items-center text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl"
                  >
                    Subscribe
                    <Send className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 2xl:h-6 2xl:w-6" /> 
                  </Button>
                </form>
                <p className="text-xs 2xl:text-sm text-muted-foreground mt-1.5 sm:mt-2 2xl:mt-3">
                  By signing up to receive emails from {siteName}, you agree to our{' '}
                  <Link href="/privacy-policy" className="underline hover:text-primary text-primary">Privacy Policy</Link>.
                  We treat your info responsibly. Unsubscribe anytime.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm md:text-base 2xl:text-lg font-semibold mb-0.5 sm:mb-1">Contact Us:</p>
              <a href={`mailto:hello@${siteName.toLowerCase().replace(/\s+/g, '')}.com`} className="text-primary hover:underline text-xs sm:text-sm md:text-base 2xl:text-lg">
                hello@{siteName.toLowerCase().replace(/\s+/g, '')}.com
              </a>
            </div>

            <div className="flex space-x-2 sm:space-x-3 2xl:space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <Button 
                    variant="default" 
                    size="icon" 
                    className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 2xl:w-16 2xl:h-16 3xl:w-18 3xl:h-18"
                  >
                    <social.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 2xl:h-8 2xl:w-8 3xl:h-9 3xl:w-9" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          
          <div className="md:col-span-5 lg:col-span-4"> 
            <h4 className="text-xs sm:text-sm 2xl:text-base font-semibold uppercase text-muted-foreground mb-3 sm:mb-4 2xl:mb-5 tracking-wider">Sitemap</h4>
            <ul className="space-y-1.5 sm:space-y-2 2xl:space-y-3">
              {sitemapLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-primary hover:text-primary/80 transition-colors duration-150 flex justify-between items-center group text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl py-0.5 sm:py-1 2xl:py-1.5">
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 2xl:h-5 2xl:w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        
        <div className="mt-10 sm:mt-12 md:mt-16 2xl:mt-20 pt-6 sm:pt-8 2xl:pt-10 border-t border-border/40 text-center">
          <p className="text-xs sm:text-sm md:text-base 2xl:text-base text-muted-foreground">
            &copy; {currentYear} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
