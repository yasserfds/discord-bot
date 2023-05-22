const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token, MongoDB_URI } = require('./config.json');
const { default: mongoose } = require('mongoose');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Status for the bot when he is online
let status = [
	{
		name: "/ping",
		type: ActivityType.Playing
	},
	{
		name: "/server",
		type: ActivityType.Playing
	},
	{
		name: "/user",
		type: ActivityType.Playing
	},
]

client.once(Events.ClientReady, (c) => {
	console.log(`${c.user.tag} is online.`);

	// Intervals status which can be changes every 10s
	setInterval(() => {
		let random = Math.floor(Math.random() * status.length);
		client.user.setActivity(status[random]);
	}, 10000)
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

(async () => {
	await mongoose.connect(MongoDB_URI);
	console.log('Connected to the Database')
	
	client.login(token);
})();