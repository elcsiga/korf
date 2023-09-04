"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const commands_1 = require("./commands");
exports.commands = [
    { name: 'ConnectWorkstationCommand', class: commands_1.ConnectWorkstationCommand },
    { name: 'CreateTeamCommand', class: commands_1.CreateTeamCommand },
    { name: 'DeleteTeamCommand', class: commands_1.DeleteTeamCommand },
    { name: 'UpdateTeamCommand', class: commands_1.UpdateTeamCommand },
    { name: 'CreatePlayerCommand', class: commands_1.CreatePlayerCommand },
    { name: 'DeletePlayerCommand', class: commands_1.DeletePlayerCommand },
    { name: 'UpdatePlayerCommand', class: commands_1.UpdatePlayerCommand },
];
//# sourceMappingURL=command-list-generated.js.map