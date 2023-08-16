
export interface AppState {
    workstations: Workstation[];
    games: Game[];
    teams: Team[];
    player: Player[];
}

export const initialAppState: AppState = {
    workstations: [],
    games: [],
    teams: [],
    player: [],
}

export interface Workstation {
    id: string;
}

export interface Team {
    id: string;
    name: string;
}

export interface Player {
    id: string;
    name: string;
    number: string;
}

export interface Game {
    id: string;
    team1: string;
    team2: string;
    events: Event[];
}

export interface GameStatus {
    score1: string;
    team2: string;
    events: Event[];
}

export interface GameEvent {
    id: string;
    time: string;
}

export interface ClockEvent {
    type: 'begin' | 'pause' | 'resume' | 'end';
}

export interface GoalEvent {
    team: 1 | 2;
    score: number;
    player: string;
}
