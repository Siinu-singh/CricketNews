"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetClose } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: '/matches', label: 'Matches' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/news-summary', label: 'News' },
  { href: '/teams', label: 'Teams' },
  { href: '/search', label: 'Search' },
];

// Custom SVG Cricket Logo
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


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between relative px-4 sm:px-6 lg:px-8">
        {/* Live Score Button - Aligned Left */}
        <div className="flex-shrink-0">
          <Button
            asChild
            variant="destructive"
            className="rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center"
          >
            <Link href="/matches#live">
              <span className="inline-block w-2 h-2 bg-accent rounded-full mr-1.5 animate-pulse"></span>
              Live Score
            </Link>
          </Button>
        </div>

        {/* Desktop Centered Navigation */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 bg-card text-card-foreground py-2 px-4 rounded-full border shadow-sm">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/" className="flex items-center justify-center" aria-label="CricNow Home">
                  <CricketLogo className="h-6 w-6 text-primary" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>CricNow Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-1">
            {navLinks.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                asChild
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                <Link href={item.href}>
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Toggler - Aligned Right */}
        <div className="md:hidden flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="text-card-foreground bg-card/80 hover:bg-card rounded-full shadow-sm p-2"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[280px] p-0 bg-card text-card-foreground border-r shadow-xl flex flex-col">
           <SheetHeader className="p-4 border-b flex flex-row items-center justify-between shrink-0">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <CricketLogo className="h-7 w-7 text-primary" />
              <span className="font-bold text-lg text-foreground">CricNow</span>
            </Link>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <nav className="flex flex-col p-4 space-y-2 overflow-y-auto flex-grow">
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
        </SheetContent>
      </Sheet>
    </header>
  );
}
