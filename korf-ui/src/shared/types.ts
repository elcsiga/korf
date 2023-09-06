
export interface AppState {
    workstations: Workstation[];
    games: Game[];
    teams: Team[];
    fields: Field[];
}

export const initialAppState: AppState = {
    workstations: [],
    games: [],
    teams: [],
    fields: [],
}

export interface Workstation {
    id: string;
}

export interface Team {
    id: string;
    name: string;
    players: Player[];
    details: string;
}

export interface Player {
    id: string;
    name: string;
    number: string;
    details: string;
}

export interface Field {
    id: string;
    name: string;
    details: string;
}

export interface Game {
    id: string;
    team1: string;
    team2: string;
    details: string;
    filed: string;
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
