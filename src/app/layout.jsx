
// import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

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
    default: 'CricNow - Live Scores, Matches, Teams & News',
    template: '%s | CricNow',
  },
  description: 'Your ultimate destination for live cricket scores, match schedules, team information, player profiles, and AI-powered news summaries.',
  keywords: ['cricket', 'live scores', 'cricket news', 'matches', 'teams', 'players', 'cricnow'],
  openGraph: {
    title: 'CricNow - Live Scores, Matches, Teams & News',
    description: 'Your ultimate destination for live cricket scores, match schedules, team information, player profiles, and AI-powered news summaries.',
    url: 'https://yourdomain.com/',
    siteName: 'CricNow',
    images: [
      {
        url: 'https://yourdomain.com/og-cricnow.png',
        width: 1200,
        height: 630,
        alt: 'CricNow - Cricket Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CricNow - Live Scores, Matches, Teams & News',
    description: 'Your ultimate destination for live cricket scores, match schedules, team information, player profiles, and AI-powered news summaries.',
    // site: '@cricnow',
    images: ['https://yourdomain.com/twitter-cricnow.png'],
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow pt-16"> {/* Changed: Removed container, mx-auto, px-8 */}
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
