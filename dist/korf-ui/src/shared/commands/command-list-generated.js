"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const field_1 = require("./commands/field");
const player_1 = require("./commands/player");
const team_1 = require("./commands/team");
const workstation_1 = require("./commands/workstation");
exports.commands = [
    { name: 'CreateFieldCommand', class: field_1.CreateFieldCommand },
    { name: 'DeleteFieldCommand', class: field_1.DeleteFieldCommand },
    { name: 'UpdateFieldCommand', class: field_1.UpdateFieldCommand },
    { name: 'CreatePlayerCommand', class: player_1.CreatePlayerCommand },
    { name: 'DeletePlayerCommand', class: player_1.DeletePlayerCommand },
    { name: 'UpdatePlayerCommand', class: player_1.UpdatePlayerCommand },
    { name: 'CreateTeamCommand', class: team_1.CreateTeamCommand },
    { name: 'DeleteTeamCommand', class: team_1.DeleteTeamCommand },
    { name: 'UpdateTeamCommand', class: team_1.UpdateTeamCommand },
    { name: 'ConnectWorkstationCommand', class: workstation_1.ConnectWorkstationCommand },
];
//# sourceMappingURL=command-list-generated.js.map