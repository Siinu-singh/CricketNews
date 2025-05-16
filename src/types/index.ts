export interface Match {
  id: string;
  team1: string;
  team1Score?: string;
  team1Logo?: string;
  team2: string;
  team2Score?: string;
  team2Logo?: string;
  status: 'Live' | 'Upcoming' | 'Recent';
  date: string;
  time?: string;
  venue: string;
  tournament?: string;
  overs?: string;
}

export interface Player {
  id: string;
  name: string;
  photoUrl: string;
  dataAiHint?: string; // Added dataAiHint for player photos
  role: string;
  nationality: string;
  battingStyle?: string;
  bowlingStyle?: string;
  stats: {
    matches: number;
    runs: number;
    wickets?: number;
    average: number;
    strikeRate?: number;
    economyRate?: number;
    highestScore?: string;
    bestBowling?: string;
  };
  bio?: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string;
  dataAiHint?: string; // Added dataAiHint for team logos
  players: Player[];
  homeGround?: string;
  coach?: string;
}
