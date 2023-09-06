import type { AppState } from "../../types";
import type { Command } from "../command-manager";

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
