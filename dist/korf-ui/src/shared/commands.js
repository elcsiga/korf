"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeamCommand = exports.CreateWorkstationCommand = exports.Command = void 0;
class Command {
    constructor(type) {
        this.type = type;
    }
}
exports.Command = Command;
class CreateWorkstationCommand extends Command {
    constructor(id) {
        super('CreateWorkstation');
        this.id = id;
    }
}
exports.CreateWorkstationCommand = CreateWorkstationCommand;
class CreateTeamCommand extends Command {
    constructor(name) {
        super('CreateWTeam');
        this.name = name;
    }
}
exports.CreateTeamCommand = CreateTeamCommand;
//# sourceMappingURL=commands.js.map