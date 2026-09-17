export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  goals: number;
  assists: number;
  gamesPlayed: number;
}

export interface TeamEvent {
  id: string;
  date: string;
  event: string;
  location: string;
  status: string;
}

export interface TeamRecord {
  total: number;
  wins: number;
  losses: number;
  draws: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface Team {
  id: string;
  name: string;
  season?: string;
  record?: TeamRecord;
  players: Player[];
  events: TeamEvent[];
}
