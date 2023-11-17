const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tftrank')
        .setDescription("Finds a players' TFT rank using RiotAPI."),
    async execute(interaction) {
        await interaction.reply(``)
    }
}