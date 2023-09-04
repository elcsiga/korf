import type { CommandDescriptor } from './command-manager';
import { ConnectWorkstationCommand, CreateTeamCommand, DeleteTeamCommand, UpdateTeamCommand, CreatePlayerCommand, DeletePlayerCommand, UpdatePlayerCommand } from './commands';
export const commands: CommandDescriptor[] = [
  { name: 'ConnectWorkstationCommand', class: ConnectWorkstationCommand }, 
  { name: 'CreateTeamCommand', class: CreateTeamCommand }, 
  { name: 'DeleteTeamCommand', class: DeleteTeamCommand }, 
  { name: 'UpdateTeamCommand', class: UpdateTeamCommand }, 
  { name: 'CreatePlayerCommand', class: CreatePlayerCommand }, 
  { name: 'DeletePlayerCommand', class: DeletePlayerCommand }, 
  { name: 'UpdatePlayerCommand', class: UpdatePlayerCommand }, 
];