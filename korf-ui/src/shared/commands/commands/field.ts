import type { AppState, Field} from "../../types";
import { v4 as uuid } from 'uuid';
import type { Command } from "../command-manager";

export class CreateFieldCommand implements Command {
    constructor(public field: Field) { }
    reduce(state: AppState): AppState {
        console.log('Create Field');
        return {
            ...state,
            fields: [...state.fields, {
                ...this.field,
                id: uuid(),
            }]
        };
    }
}

export class DeleteFieldCommand implements Command {
    constructor(public id: string) { }
    reduce(state: AppState): AppState {
        console.log('Delete Field');
        return {
            ...state,
            fields: state.fields.filter((t) => t.id !== this.id)
        };
    }
}

export class UpdateFieldCommand implements Command {
    constructor(public field: Field) { }
    reduce(state: AppState): AppState {
        console.log('Update Field');
        return {
            ...state,
            fields: state.fields.map((t) => t.id === this.field.id ? this.field : t)
        };
    }
}