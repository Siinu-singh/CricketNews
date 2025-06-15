
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"; 
import { Menu } from "lucide-react"; 
import { cn } from '@/lib/utils';
import { ThemeToggleButton } from './theme-toggle-button';

const navLinks = [
  { href: '/', label: 'Home', tooltipText: 'Go to Homepage' },
  { href: '/matches', label: 'Matches', tooltipText: 'View live & upcoming matches' },
  { href: '/rankings',label: 'Rankings', tooltipText: 'Check player & team rankings' },
  { href: '/news-summary', label: 'News', tooltipText: 'AI-powered news summaries' },
  { href: '/teams', label: 'Teams', tooltipText: 'Explore cricket teams' },
  { href: '/search', label: 'Search', tooltipText: 'Search CricketNews' },
];

const CricketLogo = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M7.5 20a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 5.52c-.28 0-.5.22-.5.5v11.5c0 .28.22.5.5.5s.5-.22.5-.5V6.02c0-.28-.22-.5-.5-.5zm3.5-1.02c-.28 0-.5.22-.5.5v12.5c0 .28.22.5.5.5s.5-.22.5-.5V5c0-.28-.22-.5-.5-.5zm-7 0c-.28 0-.5.22-.5.5v12.5c0 .28.22.5.5.5s.5-.22.5-.5V5c0-.28-.22-.5-.5-.5zm-.75-1.5h8.5c.41 0 .75.34.75.75s-.34.75-.75.75h-8.5c-.41 0-.75-.34-.75-.75S7.34 3 7.75 3zM16.75 21.25l-4.72-9.45c-.16-.31.02-.69.36-.76l.07-.01c.19-.04.38.03.5.19l4.72 9.45c.16.31-.02.69.36-.76l-.07.01c-.19-.04-.38-.03-.5-.19zM15.75 10.25c-.2-.4-.06-.89.32-1.12l.07-.04.08-.03 1.5-.5c.4-.13.83.14.92.54l.01.07.01.06.5 2c.13.4-.14.83-.54.92l-.07.01-.06.01-1.5.5c-.4.13-.83-.14-.92-.54l-.01-.07-.01-.06-.5-2z"/>
  </svg>
);

const SiteNameStyled = ({ passedClassName = "" }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseClasses = "font-extrabold";
  const mobileSizeOverride = "text-xl sm:text-2xl"; 
  const desktopSizeOverride = "md:text-xl 2xl:text-2xl 3xl:text-3xl";
  
  // For mobile, use a larger specific size, then for desktop use the responsive one.
  const finalBaseClasses = cn(baseClasses, "text-2xl sm:text-3xl", desktopSizeOverride, passedClassName);


  if (!mounted) {
    return (
      <span className={cn(finalBaseClasses, "text-foreground")}>
        CricketNews
      </span>
    );
  }

  return (
    <span
      className={cn(
        finalBaseClasses,
        "bg-clip-text text-transparent",
        "bg-gradient-to-r from-primary via-accent to-secondary"
      )}
    >
      CricketNews
    </span>
  );
};


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background shadow-md md:bg-transparent md:shadow-none">
      <div className="container mx-auto flex h-16 md:h-18 2xl:h-20 3xl:h-24 max-w-screen-2xl 3xl:max-w-screen-3xl items-center justify-between relative px-4 sm:px-6 lg:px-8 2xl:px-10 3xl:px-12">
        
        <div className="flex-shrink-0 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="text-foreground hover:bg-muted rounded-full p-1.5 sm:p-2"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
          <Link href="/" className="flex items-center gap-2" aria-label="CricketNews Home Mobile">
            <CricketLogo className="h-8 w-8 sm:h-9 text-primary" />
            <SiteNameStyled passedClassName="text-2xl sm:text-3xl" />
          </Link>
        </div>
        
        <TooltipProvider delayDuration={100}>
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2 lg:gap-3 2xl:gap-4 text-card-foreground py-2 2xl:py-2.5 px-3 lg:px-4 2xl:px-5 rounded-full border shadow-sm bg-gradient-to-br from-card via-card/90 to-muted/30 dark:from-popover dark:via-popover/90 dark:to-popover/80">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/" className="flex items-center justify-center gap-2 lg:gap-2.5" aria-label="CricketNews Home Desktop">
                  <CricketLogo className="h-6 w-6 lg:h-7 lg:w-7 2xl:h-8 2xl:w-8 3xl:h-9 3xl:h-9 text-primary" />
                  <SiteNameStyled />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center">
                <p>CricketNews Home</p>
              </TooltipContent>
            </Tooltip>
            
            <div className="flex items-center gap-0.5 lg:gap-1 2xl:gap-2">
              {navLinks.map((item) => (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm" 
                      asChild
                      className="px-2.5 py-1.5 text-xs sm:text-sm md:px-3 md:py-1.5 lg:px-3.5 lg:py-2 2xl:px-4 2xl:py-2.5 2xl:text-base 3xl:text-lg font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    >
                      <Link href={item.href}>
                        {item.label}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="center">
                    <p>{item.tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <Button
              asChild
              variant="destructive"
              className="rounded-full px-3 py-1.5 text-xs sm:text-sm md:px-4 md:py-2 lg:px-4 lg:py-2 2xl:px-5 2xl:py-2.5 2xl:text-base 3xl:text-lg font-semibold shadow-md hover:shadow-lg transition-shadow flex items-center"
            >
              <Link href="/matches#live">
                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 2xl:w-2.5 2xl:h-2.5 bg-accent rounded-full mr-1 sm:mr-1.5 2xl:mr-2 animate-pulse"></span>
                Live Score
              </Link>
            </Button>
            <ThemeToggleButton /> 
          </nav>
        </TooltipProvider>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <div className="md:hidden"> 
            <Button
              asChild
              variant="destructive"
              size="sm" 
              className="rounded-full px-2.5 py-1 text-xs font-semibold shadow-md flex items-center"
            >
              <Link href="/matches#live">
                <span className="inline-block w-1.5 h-1.5 bg-accent rounded-full mr-1 animate-pulse"></span>
                Live
              </Link>
            </Button>
          </div>
          <div className="md:hidden">
            {/* Theme toggle button for mobile header bar removed here */}
          </div>
        </div>
        
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 bg-card text-card-foreground border-r shadow-xl flex flex-col">
           <SheetHeader className="p-4 border-b flex flex-row items-center justify-between shrink-0">
            <SheetTitle asChild>
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <CricketLogo className="h-8 w-8 sm:h-9 text-primary" />
                <SiteNameStyled passedClassName="text-2xl sm:text-3xl" />
              </Link>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col p-4 space-y-2 overflow-y-auto flex-grow">
            <Button
              variant="destructive"
              asChild
              className="w-full justify-start px-3 py-2 text-base font-semibold shadow-md hover:shadow-lg transition-shadow flex items-center rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/matches#live">
                <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
                Live Score
              </Link>
            </Button>
            {navLinks.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                asChild
                className="w-full justify-start px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href={item.href}>
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="p-4 border-t shrink-0"> {/* This div is now the last child of SheetContent */}
              <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-muted-foreground">Theme</span>
                  <ThemeToggleButton />
              </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

