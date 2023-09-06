// THIS FILE IS GENERATED, DO NOT MODIFY MANUALLY!!!
import type { CommandDescriptor } from './command-manager';
import { CreateFieldCommand, DeleteFieldCommand, UpdateFieldCommand } from './commands/field';
import { CreatePlayerCommand, DeletePlayerCommand, UpdatePlayerCommand } from './commands/player';
import { CreateTeamCommand, DeleteTeamCommand, UpdateTeamCommand } from './commands/team';
import { ConnectWorkstationCommand } from './commands/workstation';
export const commands: CommandDescriptor[] = [
  { name: 'CreateFieldCommand', class: CreateFieldCommand }, 
  { name: 'DeleteFieldCommand', class: DeleteFieldCommand }, 
  { name: 'UpdateFieldCommand', class: UpdateFieldCommand }, 
  { name: 'CreatePlayerCommand', class: CreatePlayerCommand }, 
  { name: 'DeletePlayerCommand', class: DeletePlayerCommand }, 
  { name: 'UpdatePlayerCommand', class: UpdatePlayerCommand }, 
  { name: 'CreateTeamCommand', class: CreateTeamCommand }, 
  { name: 'DeleteTeamCommand', class: DeleteTeamCommand }, 
  { name: 'UpdateTeamCommand', class: UpdateTeamCommand }, 
  { name: 'ConnectWorkstationCommand', class: ConnectWorkstationCommand }, 
];