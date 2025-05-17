
"use client";

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Instagram, Facebook, Twitter, Youtube, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.js';

// Re-define CricketLogo here as it's not exported from header.jsx
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
  const siteName = 'CricNow';
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
    // In a real app, you'd send this to a server/API
    console.log('Newsletter subscribed with email:', email);
    toast({
      title: "Subscribed!",
      description: `Thank you for subscribing with ${email}. We'll keep you updated.`,
      variant: "default",
    });
    event.target.reset();
  };

  return (
    <footer className="bg-muted/30 text-foreground py-12 md:py-16 border-t border-border/40">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-12 lg:gap-x-12 md:items-start">
          {/* Left Column */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            <div className="flex items-start gap-4">
              <Link href="/" aria-label={`${siteName} Home`} className="shrink-0 mt-1">
                <CricketLogo className="h-10 w-10 text-primary" />
              </Link>
              <div className="max-w-lg">
                <h3 className="text-3xl md:text-4xl font-bold mb-1">
                  Join our <span className="text-primary">newsletter</span> for tips, advice, match schedules, and exclusive offers!
                </h3>
                <p className="text-muted-foreground mb-4 text-base">
                  Stay updated with the latest cricket buzz.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="flex-grow bg-background text-base h-12 px-4 rounded-full"
                    aria-label="Email for newsletter"
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="default" 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 rounded-full px-6 py-3 h-12 flex items-center"
                  >
                    Subscribe
                    <Mail className="ml-2 h-5 w-5" /> 
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2">
                  By signing up to receive emails from {siteName}, you agree to our{' '}
                  <Link href="/privacy-policy" className="underline hover:text-primary text-primary">Privacy Policy</Link>.
                  We treat your info responsibly. Unsubscribe anytime.
                </p>
              </div>
            </div>

            <div>
              <p className="text-base font-semibold mb-1">Contact Us:</p>
              <a href={`mailto:hello@${siteName.toLowerCase()}.com`} className="text-primary hover:underline text-base">
                hello@{siteName.toLowerCase()}.com
              </a>
            </div>

            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <Button 
                    variant="default" 
                    size="icon" 
                    className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-full w-14 h-14"
                  >
                    <social.icon className="h-8 w-8" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column (Sitemap) */}
          <div className="md:col-span-5 lg:col-span-4">
            <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-4 tracking-wider">Sitemap</h4>
            <ul className="space-y-3">
              {sitemapLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-primary hover:text-primary transition-colors duration-150 flex justify-between items-center group text-base py-1">
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="mt-16 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
