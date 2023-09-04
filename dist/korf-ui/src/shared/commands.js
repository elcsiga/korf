"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTeamCommand = exports.DeleteTeamCommand = exports.CreateTeamCommand = exports.CreateWorkstationCommand = exports.Command = void 0;
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
        super('CreateTeam');
        this.name = name;
    }
}
exports.CreateTeamCommand = CreateTeamCommand;
class DeleteTeamCommand extends Command {
    constructor(id) {
        super('DeleteTeam');
        this.id = id;
    }
}
exports.DeleteTeamCommand = DeleteTeamCommand;
class UpdateTeamCommand extends Command {
    constructor(id, name) {
        super('UpdateTeam');
        this.id = id;
        this.name = name;
    }
}
exports.UpdateTeamCommand = UpdateTeamCommand;
//# sourceMappingURL=commands.js.map