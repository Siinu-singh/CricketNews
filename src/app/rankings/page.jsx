
import ParallaxHero from "@/components/common/parallax-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Users, Shield, BarChartHorizontalBig, TrendingUp } from "lucide-react";
import rankingsData from '@/data/rankings.json';

export const metadata = {
  title: 'Cricket Rankings - Official ICC Player & Team Standings | CricketNews',
  description: 'Stay updated with the latest official ICC cricket rankings for players and teams across Test, ODI, and T20I formats on CricketNews.',
  keywords: ['icc rankings', 'cricket player rankings', 'cricket team rankings', 'test rankings', 'odi rankings', 't20i rankings', 'cricketnews'],
  openGraph: {
    title: 'CricketNews Cricket Rankings',
    description: 'Official ICC player and team standings on CricketNews.',
    url: 'https://yourdomain.com/rankings', 
    images: [
      {
        url: 'https://yourdomain.com/og-rankings.png', 
        width: 1200,
        height: 630,
        alt: 'CricketNews ICC Rankings',
      },
    ],
  },
  twitter: {
    title: 'CricketNews Cricket Rankings - Latest Standings',
    description: 'Check the latest official ICC player and team rankings on CricketNews.',
    images: ['https://yourdomain.com/twitter-rankings.png'], 
  },
  alternates: {
    canonical: 'https://yourdomain.com/rankings', 
  },
};

const { playerRankings: mockPlayerRankings, teamRankings: mockTeamRankings } = rankingsData;

export default function RankingsPage() {
  return (
    <div className="space-y-6 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
      <ParallaxHero 
        imageUrl="https://placehold.co/1600x400.png" 
        data-ai-hint="trophy winners podium" 
        minHeight="60vh"
        overlayOpacity={0.4}
      >
        <div className="container text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-background">Official ICC Rankings</h1>
          <p className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl text-background/90 mt-1.5 sm:mt-2 2xl:mt-3">Stay updated with the latest player and team standings.</p>
        </div>
      </ParallaxHero>

      <div className="container space-y-8 md:space-y-10 2xl:space-y-14 3xl:space-y-16">
        <section id="player-rankings">
          <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold mb-4 sm:mb-6 2xl:mb-8 flex items-center">
            <User className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 md:h-7 2xl:h-9 3xl:h-10 text-primary"/>Player Rankings
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8">
            <RankingCard title="Top Test Batsmen" data={mockPlayerRankings.testBatsmen} icon={<BarChartHorizontalBig className="h-5 w-5 sm:h-6 2xl:h-7 text-accent"/>} />
            <RankingCard title="Top ODI Bowlers" data={mockPlayerRankings.odiBowlers} icon={<TrendingUp className="h-5 w-5 sm:h-6 2xl:h-7 text-accent"/>} />
            <RankingCard title="Top T20I All-rounders" data={mockPlayerRankings.t20iAllRounders} icon={<User className="h-5 w-5 sm:h-6 2xl:h-7 text-accent"/>} />
          </div>
        </section>

        <section id="team-rankings" className="mt-8 md:mt-10 2xl:mt-14 3xl:mt-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold mb-4 sm:mb-6 2xl:mb-8 flex items-center">
            <Users className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 md:h-7 2xl:h-9 3xl:h-10 text-primary"/>Team Rankings
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8">
            <RankingCard title="Top Test Teams" data={mockTeamRankings.test} isTeamRanking icon={<Shield className="h-5 w-5 sm:h-6 2xl:h-7 text-accent"/>} />
            <RankingCard title="Top ODI Teams" data={mockTeamRankings.odi} isTeamRanking icon={<Shield className="h-5 w-5 sm:h-6 2xl:h-7 text-accent"/>} />
            <RankingCard title="Top T20I Teams" data={mockTeamRankings.t20i} isTeamRanking icon={<Shield className="h-5 w-5 sm:h-6 2xl:h-7 text-accent"/>} />
          </div>
        </section>
      </div>
    </div>
  );
}

function RankingCard({ title, data, isTeamRanking = false, icon }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-3 sm:p-4 md:p-5 2xl:p-6">
        <CardTitle className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl flex items-center">
          {icon && <span className="mr-1.5 sm:mr-2 2xl:mr-3">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 md:px-5 2xl:px-6 pb-3 sm:pb-4 md:pb-5 2xl:pb-6">
        <div className="overflow-x-auto">
          <Table className="text-xs sm:text-sm md:text-base 2xl:text-base 3xl:text-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px] sm:w-[50px] 2xl:w-[60px] px-2 sm:px-3 md:px-4">Rank</TableHead>
                <TableHead className="px-2 sm:px-3 md:px-4">{isTeamRanking ? "Team" : "Player"}</TableHead>
                {!isTeamRanking && <TableHead className="px-2 sm:px-3 md:px-4">Team</TableHead>}
                <TableHead className="text-right px-2 sm:px-3 md:px-4">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.rank}>
                  <TableCell className="font-medium px-2 sm:px-3 md:px-4">{item.rank}</TableCell>
                  <TableCell className="px-2 sm:px-3 md:px-4">{item.name}</TableCell>
                  {!isTeamRanking && <TableCell className="px-2 sm:px-3 md:px-4">{item.team}</TableCell>}
                  <TableCell className="text-right px-2 sm:px-3 md:px-4">{item.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

    