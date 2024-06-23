const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

// Riot API token and API links
const riotToken = process.env.riot_token;
const riotApiTFTSummonerV1 = "https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/"; // need id
const riotApiTFTLeagueV1 = "https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/";
let TFTRank;

// A delay function to simulate synchronous calls
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Use an async function to fetch the ranked TFT data on the user
async function fetchData(tftName) {
    //await delay(1000);
    const resp = await fetch(riotApiTFTSummonerV1 + tftName + "?api_key=" + riotToken);
    const userData = await resp.json();
    const userID = userData.id;
    const resp2 = await fetch(riotApiTFTLeagueV1 + userID + "?api_key=" + riotToken);
    return await resp2.json();
}

// A second async function to process the data into a manageable state
async function processData(tftName) {
    const stats = await fetchData(tftName);
    //console.log(stats)
    const rankedStats = stats.map(stats => {
        const tier = stats.tier;
        const rank = stats.rank;
        const summonerName = stats.summonerName;
        const LP = stats.leaguePoints;

        TFTRank = `${summonerName} is ${tier} ${rank} ${LP} LP.`
        }
    )
}

// Be able to call it in the discord app and for it to respond
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tftrank')
        .setDescription("Finds a players' EUW TFT rank using RiotAPI.")
        .addStringOption(option => option.setName("tft_name").setDescription("Summoner name not Riot ID").setRequired(true)),
    async execute(interaction) {
        const tftName = interaction.options.getString('tft_name');

        if (!tftName) {
            return interaction.reply("TFT name not given.")
        }

        //interaction.reply(`Work in progress.`)
        await processData(tftName)
        interaction.reply(`${TFTRank}`);
    },
};