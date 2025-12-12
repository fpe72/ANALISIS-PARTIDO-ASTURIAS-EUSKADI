export interface PlayerStats {
  id: string;
  name: string;
  number: number;
  position: string;
  minutesPlayed: number;
  passes: {
    total: number;
    successful: number;
    progressive: number;
    key: number;
  };
  defensive: {
    recoveries: number;
    interceptions: number;
    duelsWon: number;
    duelsTotal: number;
    tackles: number;
  };
  offensive: {
    shots: number;
    chancesCreated: number;
    dribbles: number;
  };
  physical: {
    distanceKm: number;
    sprints: number;
  };
  heatmap: number[][]; // 5x3 grid density
  rating: number;
  analysis: {
    tactical: string;
    technical: string;
    defensive: string;
    offensive: string;
    conclusion: string;
  };
}

export interface MatchStats {
  possession: [number, number]; // [Team, Opponent]
  passes: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  fouls: [number, number];
  corners: [number, number];
  duelsWonPercentage: [number, number];
}

export interface MatchData {
  meta: {
    title: string;
    date: string;
    competition: string;
    duration: string;
    score: string;
    opponent: string;
  };
  stats: MatchStats;
  events: Array<{
    minute: number;
    type: 'goal' | 'card' | 'sub' | 'chance';
    description: string;
    team: 'home' | 'away';
  }>;
  players: PlayerStats[];
  teamAnalysis: {
    style: string;
    defense: string;
    strengths: string[];
    weaknesses: string[];
  };
}