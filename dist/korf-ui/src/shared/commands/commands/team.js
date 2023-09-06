"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTeamCommand = exports.DeleteTeamCommand = exports.CreateTeamCommand = void 0;
const uuid_1 = require("uuid");
class CreateTeamCommand {
    constructor(team) {
        this.team = team;
    }
    reduce(state) {
        console.log('Create Team');
        return Object.assign(Object.assign({}, state), { teams: [...state.teams, Object.assign(Object.assign({}, this.team), { id: (0, uuid_1.v4)() })] });
    }
}
exports.CreateTeamCommand = CreateTeamCommand;
class DeleteTeamCommand {
    constructor(id) {
        this.id = id;
    }
    reduce(state) {
        console.log('Delete Team');
        return Object.assign(Object.assign({}, state), { teams: state.teams.filter((t) => t.id !== this.id) });
    }
}
exports.DeleteTeamCommand = DeleteTeamCommand;
class UpdateTeamCommand {
    constructor(team) {
        this.team = team;
    }
    reduce(state) {
        console.log('Update Team');
        return Object.assign(Object.assign({}, state), { teams: state.teams.map((t) => t.id === this.team.id ? this.team : t) });
    }
}
exports.UpdateTeamCommand = UpdateTeamCommand;
//# sourceMappingURL=team.js.map