
import ParallaxHero from "@/components/common/parallax-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Users, Shield, BarChartHorizontalBig, TrendingUp } from "lucide-react";

export const metadata = {
  title: 'Cricket Rankings - Official ICC Player & Team Standings',
  description: 'Stay updated with the latest official ICC cricket rankings for players and teams across Test, ODI, and T20I formats on CricNow.',
  keywords: ['icc rankings', 'cricket player rankings', 'cricket team rankings', 'test rankings', 'odi rankings', 't20i rankings'],
  openGraph: {
    title: 'CricNow Cricket Rankings',
    description: 'Official ICC player and team standings.',
    url: 'https://yourdomain.com/rankings', // Replace
    images: [
      {
        url: 'https://yourdomain.com/og-rankings.png', // Replace
        width: 1200,
        height: 630,
        alt: 'CricNow ICC Rankings',
      },
    ],
  },
  twitter: {
    title: 'CricNow Cricket Rankings - Latest Standings',
    description: 'Check the latest official ICC player and team rankings.',
    images: ['https://yourdomain.com/twitter-rankings.png'], // Replace
  },
  alternates: {
    canonical: 'https://yourdomain.com/rankings', // Replace
  },
};

const mockPlayerRankings = {
  testBatsmen: [
    { rank: 1, name: "Kane Williamson", team: "NZ", points: 919 },
    { rank: 2, name: "Joe Root", team: "ENG", points: 897 },
    { rank: 3, name: "Steve Smith", team: "AUS", points: 877 },
    { rank: 4, name: "Marnus Labuschagne", team: "AUS", points: 870 },
    { rank: 5, name: "Babar Azam", team: "PAK", points: 860 },
  ],
  odiBowlers: [
    { rank: 1, name: "Trent Boult", team: "NZ", points: 737 },
    { rank: 2, name: "Josh Hazlewood", team: "AUS", points: 709 },
    { rank: 3, name: "Jasprit Bumrah", team: "IND", points: 704 },
    { rank: 4, name: "Shaheen Afridi", team: "PAK", points: 690 },
    { rank: 5, name: "Mitchell Starc", team: "AUS", points: 685 },
  ],
  t20iAllRounders: [
    { rank: 1, name: "Shakib Al Hasan", team: "BAN", points: 380 },
    { rank: 2, name: "Mohammad Nabi", team: "AFG", points: 340 },
    { rank: 3, name: "Hardik Pandya", team: "IND", points: 320 },
    { rank: 4, name: "Wanindu Hasaranga", team: "SL", points: 310 },
    { rank: 5, name: "Glenn Maxwell", team: "AUS", points: 300 },
  ],
};

const mockTeamRankings = {
  test: [
    { rank: 1, name: "Australia", points: 128 },
    { rank: 2, name: "India", points: 121 },
    { rank: 3, name: "England", points: 115 },
  ],
  odi: [
    { rank: 1, name: "New Zealand", points: 125 },
    { rank: 2, name: "England", points: 124 },
    { rank: 3, name: "Australia", points: 120 },
  ],
  t20i: [
    { rank: 1, name: "India", points: 268 },
    { rank: 2, name: "England", points: 265 },
    { rank: 3, name: "Pakistan", points: 261 },
  ],
};

export default function RankingsPage() {
  return (
    <div className="space-y-8">
      <ParallaxHero 
        imageUrl="https://placehold.co/1600x400.png" 
        data-ai-hint="trophy winners podium" 
        minHeight="300px" 
        overlayOpacity={0.4}
      >
        <h1 className="text-4xl font-bold text-background">Official ICC Rankings</h1>
        <p className="text-lg text-background/90 mt-2">Stay updated with the latest player and team standings.</p>
      </ParallaxHero>

      <section id="player-rankings" className="px-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center"><User className="mr-3 h-8 w-8 text-primary"/>Player Rankings</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <RankingCard title="Top Test Batsmen" data={mockPlayerRankings.testBatsmen} icon={<BarChartHorizontalBig className="h-6 w-6 text-accent"/>} />
          <RankingCard title="Top ODI Bowlers" data={mockPlayerRankings.odiBowlers} icon={<TrendingUp className="h-6 w-6 text-accent"/>} />
          <RankingCard title="Top T20I All-rounders" data={mockPlayerRankings.t20iAllRounders} icon={<User className="h-6 w-6 text-accent"/>} />
        </div>
      </section>

      <section id="team-rankings" className="mt-12 px-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center"><Users className="mr-3 h-8 w-8 text-primary"/>Team Rankings</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <RankingCard title="Top Test Teams" data={mockTeamRankings.test} isTeamRanking icon={<Shield className="h-6 w-6 text-accent"/>} />
          <RankingCard title="Top ODI Teams" data={mockTeamRankings.odi} isTeamRanking icon={<Shield className="h-6 w-6 text-accent"/>} />
          <RankingCard title="Top T20I Teams" data={mockTeamRankings.t20i} isTeamRanking icon={<Shield className="h-6 w-6 text-accent"/>} />
        </div>
      </section>
    </div>
  );
}

// interface RankingItem { // Interface removed
//   rank: number;
//   name: string;
//   team?: string; 
//   points: number;
// }

// interface RankingCardProps { // Interface removed
//   title: string;
//   data: RankingItem[];
//   isTeamRanking?: boolean;
//   icon?: React.ReactNode;
// }

function RankingCard({ title, data, isTeamRanking = false, icon }) { // Type annotations removed
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>{isTeamRanking ? "Team" : "Player"}</TableHead>
              {!isTeamRanking && <TableHead>Team</TableHead>}
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.rank}>
                <TableCell className="font-medium">{item.rank}</TableCell>
                <TableCell>{item.name}</TableCell>
                {!isTeamRanking && <TableCell>{item.team}</TableCell>}
                <TableCell className="text-right">{item.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
