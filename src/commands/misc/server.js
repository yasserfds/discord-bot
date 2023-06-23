const { Client, Interaction } = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Info about the server',
    testOnly: true,
    devOnly: true,

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            interaction.reply('You can only run this command inside a server.');
            return;
        }
    }
}