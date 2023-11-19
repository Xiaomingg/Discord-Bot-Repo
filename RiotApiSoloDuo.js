require('dotenv').config();

// Riot API
const riotApiToken = process.env.riot_token;
const riotApiURL = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
const riotApiLeagueV4 = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
let playerIdData;
let playerAllData;

// Get summoner's player ID and use the player's ID to see their rank details
async function playerData(summonerName) {
    const response = await fetch(riotApiURL + summonerName + "?api_key=" + riotApiToken);
        playerAllData = await response.json();
        playerIdData = playerAllData.id;
        //console.log(playerIdData)

    const response2 = await fetch(riotApiLeagueV4 + playerIdData + "?api_key=" + riotApiToken);
    const rankData = await response2.json();
    if (Array.isArray(rankData)) {
        const rankedSoloDuo = rankData.filter(entry => entry.queueType === 'RANKED_SOLO_5x5')
        //console.log(rankData)
        //console.log(rankedSoloDuo)
        //console.log(rankedSoloDuo)
        rankedSoloDuo.forEach(rankedSoloDuo => {
        const tier = rankedSoloDuo.tier;
        const rank = rankedSoloDuo.rank;
        const leaguePoints = rankedSoloDuo.leaguePoints;
        const wins = rankedSoloDuo.wins;
        const losses = rankedSoloDuo.losses;
        const winRate = (wins / (wins + losses) * 100)
        const winRateRounded = winRate.toFixed(2)
        const totalGames = wins + losses
        const statement = (`${summonerName} is ${tier} ${rank} ${leaguePoints}LP with a win rate of ${winRateRounded}% in ${totalGames} games.`)
            console.log(statement)
    })
}}
//playerData("Silkysmoooth")
// Export the function playerData
module.exports = playerData;

/*
else {
        console.error("Unexpected data structure from Riot API: ", rankData)
        }
 */