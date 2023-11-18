require('dotenv').config();

// Riot API
const riotApiToken = process.env.riot_token;
const riotApiURL = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
const riotApiLeagueV4 = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
let playerIdData;
let playerAllData;

// Get summoner's player Id
async function playerData(summonerName) {
    const response = await fetch(riotApiURL + summonerName + "?api_key=" + riotApiToken);
        playerAllData = await response.json();
        playerIdData = playerAllData.id;
        //console.log(playerIdData)
}
playerData('ChinesePerson')


// Use the player ID to see the summoner's rank
async function rankCheck() {
const riotApiLeagueV4 = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
    const response2 = await fetch(riotApiLeagueV4 + "jmfNGdqPX--4ByiBTlTDmCKtWocQZ5cfVC5qgHYYbAr6cPE" + "?api_key=" + riotApiToken);
        let rankData = await response2.json();
        console.log(rankData)
}
rankCheck()
/*
await
.then(r => {r.json().then(data => playerData = data)})
*/