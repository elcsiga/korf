

import fs from "fs";
const buffer = fs.readFileSync("src/shared/commands/commands.ts");
const commands = buffer
    .toString()
    .match(/(?<=export class).*?(?=implements Command)/gm)
    .map((r) => r.trim());
const lines = [];
lines.push(`import type { CommandDescriptor } from './command-manager';`);
lines.push(`import { ${commands.join(', ')} } from './commands';`);
const commandObjects = commands
    .map((c) => `  { name: '${c}', class: ${c} }, \n`)
    .join('');
lines.push( `export const commands: CommandDescriptor[] = [\n${commandObjects}];`);
fs.writeFileSync("src/shared/commands/command-list-generated.ts", lines.join('\n'));
console.log('Commands generated: ', commands.join(', '));
