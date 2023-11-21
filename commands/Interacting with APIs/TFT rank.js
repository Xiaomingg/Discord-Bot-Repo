const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const riotToken = process.env.riot_token;
const riotApiTFTSummonerV1 = "https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/"; // need id
const riotApiTFTLeagueV1 = "https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/";

async function tftRank(playerName) {
    const resp = await fetch(riotApiTFTSummonerV1 + "ChinesePerson" + "?apikey=" + riotToken);
    const userData = await resp.json();
    const userID = userData.id;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tftrank')
        .setDescription("Finds a players' EUW TFT rank using RiotAPI."),
    async execute(interaction) {
        await interaction.reply(`Work in progress.`)
    },
};