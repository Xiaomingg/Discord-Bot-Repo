require('dotenv').config();

// Riot API
const riotApiToken = process.env.riot_token;
const riotApiURL = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
let playerIdData;
let playerAllData;

// Get summoner's player Id
async function playerData(summonerName) {
    const response = await fetch(riotApiURL + summonerName + "?api_key=" + riotApiToken);
        playerAllData = await response.json();
        playerIdData = playerAllData.id;
        console.log(playerIdData)
}
console.log("aaaaa", playerAllData)

/*
// Use the player Id to see the summoner's rank
const riotApiLeagueV4 = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
console.log(playerIdData)
async function rankCheck(data) {
    const response2 = await fetch(riotApiLeagueV4 + playerIdData + "?api_key=" + riotApiToken)
        let rankData = await response2.json();
    console.log(rankData)
}
let playerId = rankCheck(playerData("Xioming"));
/*
.then(r => {r.json().then(data => playerData = data)})
*/