
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <path d="M7.5 20a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 5.52c-.28 0-.5.22-.5.5v11.5c0 .28.22.5.5.5s.5-.22.5-.5V6.02c0-.28-.22-.5-.5-.5zm3.5-1.02c-.28 0-.5.22-.5.5v12.5c0 .28.22.5.5.5s.5-.22.5-.5V5c0-.28-.22-.5-.5-.5zm-7 0c-.28 0-.5.22-.5.5v12.5c0 .28.22.5.5.5s.5-.22.5-.5V5c0-.28-.22-.5-.5-.5zm-.75-1.5h8.5c.41 0 .75.34.75.75s-.34.75-.75.75h-8.5c-.41 0-.75-.34-.75-.75S7.34 3 7.75 3zM16.75 21.25l-4.72-9.45c-.16-.31.02-.69.36-.76l.07-.01c.19-.04.38.03.5.19l4.72 9.45c.16.31-.02.69-.36.76l-.07.01c-.19.04-.38-.03-.5-.19zM15.75 10.25c-.2-.4-.06-.89.32-1.12l.07-.04.08-.03 1.5-.5c.4-.13.83.14.92.54l.01.07.01.06.5 2c.13.4-.14.83-.54.92l-.07.01-.06.01-1.5.5c-.4.13-.83-.14-.92-.54l-.01-.07-.01-.06-.5-2z"/>
  </svg>
);


export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent text-white">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-center relative px-4 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-6 sm:pl-8 lg:pl-10"> {/* Adjusted padding to move button more right */}
          <Button
            asChild
            variant="destructive"
            className="rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center" // Added flex items-center
          >
            <Link href="/matches#live">
              <span className="inline-block w-2 h-2 bg-accent rounded-full mr-1.5 animate-pulse"></span> {/* Yellow dot added */}
              Live Score
            </Link>
          </Button>
        </div>

        <nav className="flex items-center gap-4 bg-card text-card-foreground py-2 px-4 rounded-full border shadow-sm">
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
      </div>
    </header>
  );
}
