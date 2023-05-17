const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('About the bot'),
    async execute (interaction) {
        await interaction.reply('Im your friendly discord bot!')
    }
}