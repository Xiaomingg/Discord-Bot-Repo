const { SlashCommandBuilder} = require('discord.js');
const playerDataFunction = require('../../RiotApiSoloDuo')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lolrank')
        .setDescription("Provides an EUWs player's League of Legends Solo/Duo rank."),
    async execute (interaction) {
        await playerDataFunction()
        await interaction.reply(`${statement}`)
    }
}

