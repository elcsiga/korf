"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlayerCommand = exports.DeletePlayerCommand = exports.CreatePlayerCommand = void 0;
const uuid_1 = require("uuid");
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
//# sourceMappingURL=player.js.map