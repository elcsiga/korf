"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlayerCommand = exports.DeletePlayerCommand = exports.CreatePlayerCommand = exports.UpdateTeamCommand = exports.DeleteTeamCommand = exports.CreateTeamCommand = exports.ConnectWorkstationCommand = void 0;
const uuid_1 = require("uuid");
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
class CreatePlayerCommand {
    constructor(teamId, player) {
        this.teamId = teamId;
        this.player = player;
    }
    reduce(state) {
        console.log('Create Player');
        return Object.assign(Object.assign({}, state), { teams: state.teams.map((t) => t.id === this.teamId ? Object.assign(Object.assign({}, t), { players: [...t.players, Object.assign(Object.assign({}, this.player), { id: (0, uuid_1.v4)() })] }) : t) });
    }
}
exports.CreatePlayerCommand = CreatePlayerCommand;
class DeletePlayerCommand {
    constructor(teamId, id) {
        this.teamId = teamId;
        this.id = id;
    }
    reduce(state) {
        console.log('Delete Player');
        return Object.assign(Object.assign({}, state), { teams: state.teams.map((t) => t.id === this.teamId ? Object.assign(Object.assign({}, t), { players: t.players.filter((p) => p.id !== this.id) }) : t) });
    }
}
exports.DeletePlayerCommand = DeletePlayerCommand;
class UpdatePlayerCommand {
    constructor(teamId, player) {
        this.teamId = teamId;
        this.player = player;
    }
    reduce(state) {
        console.log('Update Player');
        return Object.assign(Object.assign({}, state), { teams: state.teams.map((t) => t.id === this.teamId ? Object.assign(Object.assign({}, t), { players: t.players.map((p) => p.id === this.player.id ? this.player : p) }) : t) });
    }
}
exports.UpdatePlayerCommand = UpdatePlayerCommand;
//# sourceMappingURL=commands.js.map