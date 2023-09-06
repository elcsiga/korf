"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectWorkstationCommand = void 0;
class ConnectWorkstationCommand {
    constructor(id) {
        this.id = id;
    }
    reduce(state) {
        if (state.workstations.find((w) => w.id === this.id)) {
            console.log('Workstation already exists');
            return state;
        }
        else {
            console.log('Register New Workstation', this.id);
            return Object.assign(Object.assign({}, state), { workstations: [...state.workstations, {
                        id: this.id
                    }] });
        }
    }
}
exports.ConnectWorkstationCommand = ConnectWorkstationCommand;
//# sourceMappingURL=workstation.js.map