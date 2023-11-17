const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lolrank')
        .setDescription("Find a player's League of Legends rank using RiotAPI."),
    async execute(interaction) {
        await interaction.reply(``)
    }
}

