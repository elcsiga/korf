import type { AppState, Team} from "../../types";
import { v4 as uuid } from 'uuid';
import type { Command } from "../command-manager";

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