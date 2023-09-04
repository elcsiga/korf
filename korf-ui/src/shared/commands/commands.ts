import type { AppState, Player, Team, Workstation } from "../types";
import { v4 as uuid } from 'uuid';

export interface Command {
    type?: string;
    reduce(state: AppState): AppState
}

export class ConnectWorkstationCommand implements Command {
    constructor(public id: string) {}
    reduce(state: AppState): AppState {
        if (state.workstations.find((w) => w.id === this.id)) {
            console.log('Workstation already exists');
            return state;
        } else {
            console.log('Register New Workstation', this.id);
            return {
                ...state,
                workstations: [ ...state.workstations, {
                    id: this.id
                }]
            }
        }

    }
}

export class CreateTeamCommand implements Command {
    constructor( public team: Team ) {}
    reduce(state: AppState): AppState {
        console.log('Create Team');
        return {
            ...state,
            teams: [ ...state.teams, {
                ...this.team,
                id: uuid(),
            }]
        };
    }
}

export class DeleteTeamCommand implements Command {
    constructor( public id: string) {}
    reduce(state: AppState): AppState {
        console.log('Delete Team');
        return {
            ...state,
            teams:  state.teams.filter((t) => t.id !== this.id)
        };
    }
}

export class UpdateTeamCommand implements Command {
    constructor( public team: Team) {}
    reduce(state: AppState): AppState {
        console.log('Update Team');
        return {
            ...state,
            teams: state.teams.map((t) => t.id === this.team.id ? this.team : t)
        };
    }
}

export class CreatePlayerCommand implements Command {
    constructor( public teamId: string, public player: Player ) {}
    reduce(state: AppState): AppState {
        console.log('Create Player');
        return {
            ...state,
            teams: state.teams.map((t) => t.id === this.teamId ? {
                ...t,
                players: [...t.players, {
                    ...this.player,
                    id: uuid()
                }]
            } : t)
        }
    }
}


export class DeletePlayerCommand implements Command {
    constructor( public teamId: string, public id: string) {}
    reduce(state: AppState): AppState {
        console.log('Delete Player');
        return {
            ...state,
            teams: state.teams.map((t) => t.id === this.teamId ? {
                ...t,
                players: t.players.filter((p) => p.id !== this.id)
            } : t)
        };
    }
}

export class UpdatePlayerCommand implements Command {
    constructor( public teamId: string, public player: Player) {}
    reduce(state: AppState): AppState {
        console.log('Update Player');
        return {
            ...state,
            teams: state.teams.map((t) => t.id === this.teamId ? {
                ...t,
                players: t.players.map((p) => p.id === this.player.id ? this.player : p)
            } : t)
        };
    }
}