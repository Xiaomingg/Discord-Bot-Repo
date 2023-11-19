const { SlashCommandBuilder} = require('discord.js');
const playerData = require('../../RiotApiSoloDuo')
require('dotenv').config();

//playerData("3ONE")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('lolrank')
        .setDescription("Provides an EUWs player's League of Legends Solo/Duo rank.")
        .addStringOption(option => option.setName('summoner_name').setDescription('Enter the summoner name')),
    async execute(interaction){
        const summonerName = interaction.options.getString('summoner_name');

        if (!summonerName) {
            return interaction.reply('Summoner name not given.');
        }
        console.log(`Summoner Name: ${summonerName}`);
        const name = await playerData(summonerName);
        await interaction.reply(name);
}};

/*
async execute (interaction) {
        await playerDataFunction()
        await interaction.reply(`${statement}`)
 */