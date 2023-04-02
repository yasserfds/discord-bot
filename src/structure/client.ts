import { Client, Collection, SlashCommandBuilder, ApplicationCommandDataResolvable } from 'discord.js';
import { CommandType } from '../typings/command';
import { Glob, glob } from 'glob';
import { promisify } from 'util';
import { RegisterCommandsOptions } from '../typings/client';


const globalPromise = promisify(glob);

export class ExtandedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();

    constructor() {
        super({ intents: 32767 })
    }

    start() {
        this.registerModules()
        this.login(process.env.botToken)
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`)
        } else {
            this.application?.commands.set(commands);
            console.log("Registring global commands")
        }
    }

    async registerModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globalPromise(`${__dirname}/../commands/*/*{.ts,.js}`);
        console.log({commandFiles});
        commandFiles.forEach(async filePath => {
            const command: CommandType = await this.importFile(filePath)
            if(!command.name) return;

            this.commands.set(command.name, command);
            slashCommands.push(command)
        });
    }
}