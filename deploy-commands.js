const { REST, Routs, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	{
		name: 'ping',
		description: 'Replies with pong!'
	},
];

const rest = new REST({ version: '10' }).setToken(token);

(async() => {
	try {
		console.log('Registering slash commands!')
		await rest.put(
			Routes.applicationCommands(clientId, guildId)
		);
		{ body: commands }

		console.log('Slash commands were registered succefully!')
	} catch (error) {
		console.log(`There was an error: ${error}`)
	};
})();