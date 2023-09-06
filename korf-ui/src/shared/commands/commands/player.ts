import type { AppState, Player} from "../../types";
import { v4 as uuid } from 'uuid';
import type { Command } from "../command-manager";


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