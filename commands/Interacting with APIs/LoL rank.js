require('dotenv').config();

const { SlashCommandBuilder} = require('discord.js');
const playerData = require('../../RiotApiSoloDuo')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lolrank')
        .setDescription("Provides an EUWs player's League of Legends Solo/Duo rank.")
        .addStringOption(option => option.setName('summoner_name').setDescription('Enter the summoner name').setRequired(true)),
    async execute(interaction) {
        const summonerName = interaction.options.getString('summoner_name');

        if (!summonerName) {
            return interaction.reply('Summoner name not given.');
        }
        //console.log(`Summoner Name: ${summonerName}`);

        // Defer the reply
        //await interaction.deferReply();

        let result = await playerData(summonerName);
        await interaction.reply(`hello ${result}`);
    },
};
/*
async execute (interaction) {
        await playerDataFunction()
        await interaction.reply(`${statement}`)
 */