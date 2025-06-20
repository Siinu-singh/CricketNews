
// import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://yourdomain.com/'),
  title: {
    default: 'CricketNews - Live Scores, Matches, Teams & News',
    template: '%s | CricketNews',
  },
  description: 'Your ultimate destination for live cricket scores, match schedules, team information, player profiles, and AI-powered news summaries on CricketNews.',
  keywords: ['cricket', 'live scores', 'cricket news', 'matches', 'teams', 'players', 'cricketnews'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'CricketNews - Live Scores, Matches, Teams & News',
    description: 'Your ultimate destination for live cricket scores, match schedules, team information, player profiles, and AI-powered news summaries on CricketNews.',
    url: 'https://yourdomain.com/',
    siteName: 'CricketNews',
    images: [
      {
        url: 'https://yourdomain.com/og-cricketnews.png',
        width: 1200,
        height: 630,
        alt: 'CricketNews - Cricket Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CricketNews - Live Scores, Matches, Teams & News',
    description: 'Your ultimate destination for live cricket scores, match schedules, team information, player profiles, and AI-powered news summaries on CricketNews.',
    // site: '@cricketnews',
    images: ['https://yourdomain.com/twitter-cricketnews.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
