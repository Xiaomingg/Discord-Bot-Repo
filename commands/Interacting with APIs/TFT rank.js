const { SlashCommandBuilder} = require('discord.js');
let sausage;
async function cutie() {
    let number = 49
    number += 10;
    sausage = 52

    const data = {
        sausage: 234,

    };
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tftrank')
        .setDescription("Finds a players' TFT rank using RiotAPI."),
    async execute(interaction) {
        await interaction.reply(`Shalom: ${sausage}`)
    }
}