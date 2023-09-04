import { commands } from "./command-list-generated";
import { CreateTeamCommand } from "./commands";

export interface CommandDescriptor {
    name: string;
    class: any;
}

export function prepareCommandFoToSend() {
    commands.forEach((c) => console.log(c.class.prototype));
}