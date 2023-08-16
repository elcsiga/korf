export class Command {
    constructor( public type: string ) {}
}

export class CreateWorkstationCommand extends Command {
    constructor(public id: string) {
        super('CreateWorkstation');
    }
}

export class CreateTeamCommand extends Command {
    constructor( public name: string) {
        super('CreateWTeam');
    }
}