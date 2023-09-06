
import fs from "fs";

const lines = ['// THIS FILE IS GENERATED, DO NOT MODIFY MANUALLY!!!'];
lines.push(`import type { CommandDescriptor } from './command-manager';`);

const commands = [];
fs.readdirSync("src/shared/commands/commands").forEach((fileName) => {
    const buffer = fs.readFileSync("src/shared/commands/commands/" + fileName);
    const classes = buffer
        .toString()
        .match(/(?<=export class).*?(?=implements Command)/gm)
        .map((r) => r.trim());
    commands.push(...classes);
    lines.push(`import { ${classes.join(', ')} } from './commands/${fileName.replace('.ts','')}';`);
})

const commandObjects = commands
    .map((c) => `  { name: '${c}', class: ${c} }, \n`)
    .join('');
lines.push( `export const commands: CommandDescriptor[] = [\n${commandObjects}];`);
fs.writeFileSync("src/shared/commands/command-list-generated.ts", lines.join('\n'));
console.log('Commands generated:\n' + commands.map((c) => `- ${c}`).join('\n'));
