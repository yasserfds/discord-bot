import { PermissionResolvable, ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver} from "discord.js";
import { type } from "os";
import { ExtandedClient } from "../structure/client";

interface RunOptions {
    client: ExtandedClient,
    interaction: CommandInteraction,
    args: CommandInteractionOptionResolver,
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction
} & ChatInputApplicationCommandData