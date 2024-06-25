const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config({ path: '../../.env'})

// Riot API
const riotAPIToken = process.env['RIOT_TOKEN'];
const riotAPIAccountV1 = "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
const riotAPISummonerV4ByPUUID = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/"
const riotAPILeagueV4BySummoner = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/"

// Need player name and tagline to get info
let playerAccountV1Data, playerPUUID, playerAccountPUUIDData;
let S1, S2, S3;
let SoloDuoStatement, FlexStatement, ArenaStatement;

// Account V1 gets puuid, needs to get info from there
// put puuid into summoner v4
// put id into summoner v4

async function fetchData(playerName, tagline){
    return new Promise (async (resolve, reject) => {
        const response = await fetch(riotAPIAccountV1 + playerName + '/' + tagline + '?api_key=' + riotAPIToken)
        playerAccountV1Data = await response.json();
        playerPUUID = playerAccountV1Data.puuid;

        // Get Account ID
        const response2 = await fetch(riotAPISummonerV4ByPUUID + playerPUUID + '?api_key=' + riotAPIToken)
        playerAccountPUUIDData = await response2.json();
        let playerID = playerAccountPUUIDData.id;

        // Get Rank Data
        const response3 = await fetch(riotAPILeagueV4BySummoner + playerID + '?api_key=' + riotAPIToken)
        let playerData = await response3.json();

        // Ranked Solo Duo Data
        if (Array.isArray(playerData)) {
            const rankedSoloDuo = playerData.filter(entry => entry.queueType === 'RANKED_SOLO_5x5')

            const statements = rankedSoloDuo.map(rankedSoloDuo => { // Filter the data
                const tier = rankedSoloDuo.tier;
                const rank = rankedSoloDuo.rank;
                const leaguePoints = rankedSoloDuo.leaguePoints;
                const wins = rankedSoloDuo.wins;
                const losses = rankedSoloDuo.losses;
                const winRate = (wins / (wins + losses) * 100);
                const winRateRounded = winRate.toFixed(2);
                const totalGames = wins + losses;

                SoloDuoStatement = (`${playerName} is ${tier} ${rank} ${leaguePoints} LP with a win rate of ${winRateRounded}% in ${totalGames} games of Ranked Solo/Duo.`)
            });
            resolve(statements);
        } else {
            reject(new Error('Rank data is not an array.'));
        }
        // Ranked Flex Data
        if (Array.isArray(playerData)) {
            const rankedFlex = playerData.filter(entry => entry.queueType === 'RANKED_FLEX_SR')
            const statementFlex = rankedFlex.map(rankedFlex => {
                const flexTier = rankedFlex.tier;
                const flexRank = rankedFlex.rank;
                const flexLeaguePoints = rankedFlex.leaguePoints;
                const FlexWRR = (rankedFlex.wins / (rankedFlex.wins + rankedFlex.losses) * 100).toFixed(2)
                const totalGames = rankedFlex.wins + rankedFlex.losses;

                FlexStatement = (`${playerName} is ${flexTier} ${flexRank} ${flexLeaguePoints} with a win rate of ${FlexWRR}% in ${totalGames} games of Ranked Flex.`)
            });
            resolve(statementFlex);
        } else {
            reject(new Error('Rank data is not an array.'));
        }
        // Arena (internal name is CHERRY??) Data
        if (Array.isArray(playerData)) {
            const Arena = playerData.filter(entry => entry.queueType === 'CHERRY')
            const statsArena = Arena.map(Arena => {
                const ArenaWR = (Arena.wins / (Arena.wins + Arena.losses) * 100).toFixed(2)
                ArenaStatement = (`${playerName} has a ${ArenaWR}% win rate in Arena in ${Arena.wins+Arena.losses} games.`)
            })
        }
    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('relol')
        .setDescription("Provides an EUWs player's League of Legends rank.")
        .addStringOption(option => option.setName('summoner_name').setDescription('Enter the summoner name').setRequired(true))
        .addStringOption(option => option.setName('tagline').setDescription('Enter the tagline').setRequired(true)),
    async execute(interaction) {
        const playerName = interaction.options.getString('summoner_name');
        const tagline = interaction.options.getString('tagline');

        if (!playerName) {
            return interaction.reply('Summoner name not given');
        }
        if (!tagline) {
            return interaction.reply('Tagline not given');
        }

        fetchData().then(() => {
            S1 = SoloDuoStatement;
            S2 = FlexStatement;
            S3 = ArenaStatement;
            interaction.reply(`${S1}`);
            interaction.reply(`${S2}`);
            interaction.reply(`${S3}`);
        })
fetchData(playerName, tagline)
    },
};
