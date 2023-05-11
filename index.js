require('dotenv/config')
const { Client, IntentsBitField } = require('discord.js')


let consoleLogMessage = 'Bot is ready'

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', () => {
    console.log(consoleLogMessage);
})

client.on('messageCreate', (message) => {
    console.log(message)
})

client.login(process.env.TOKEN)