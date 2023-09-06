import type { AppState } from "../types";

export interface CommandDescriptor {
    name: string;
    class: any;
}

export interface Command {
    type?: string;
    reduce(state: AppState): AppState
}