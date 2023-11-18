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
    let rankData = await response2.json();
    //console.log(rankData)
    const rankedSoloDuo = rankData[1]
    //console.log(rankedSoloDuo)
    const tier = rankedSoloDuo.tier;
    const rank = rankedSoloDuo.rank;
    const leaguePoints = rankedSoloDuo.leaguePoints;
    const wins = rankedSoloDuo.wins;
    const losses = rankedSoloDuo.losses;
    const winRate = (wins/(wins+losses) * 100)
    const winRateRounded = winRate.toFixed(2)
    let statement = (`Your rank is ${tier} ${rank}LP with a win rate of ${winRateRounded}%`)



}

//playerData('pranll 2')

// Export the function playerData
module.exports = playerData;