const { Client, IntentsBitField, ActivityType, Events } = require('discord.js');
const { token, MongoDB_URI } = require('./config.json')
const { default: mongoose } = require('mongoose');

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

// Status for the bot when online
let status = [
	{
		name: "Youtube",
		type: ActivityType.Watching
	}
]

client.once(Events.ClientReady, (c) => {
	console.log(`${c.user.tag} is online!`);

	// Intervals status which can be changed every 10s
	setInterval(() => {
		let random = Math.floor(Math.random() * status.length);
		client.user.setActivity(status[random]);
	}, 1000)
});

(async() => {
	await mongoose.connect(MongoDB_URI);
	console.log('Connected to DB.')
	
	client.login(token);
})();