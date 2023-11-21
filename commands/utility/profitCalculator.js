const { SlashCommandBuilder} = require('discord.js');
const {callbackify} = require("util");
let sim;
let message;

async function profit(buy, sell, amount) {
    const profit = (sell * 0.95) - buy;
    let totalProfit = amount * profit;
    message = `You made ${totalProfit} coins.`
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profit')
        .setDescription('EA Sports FC 24 profit calculator.')
        .addStringOption(option => option.setName('buy').setDescription('An average of how much you bought for').setRequired(true))
        .addStringOption(option => option.setName('sell').setDescription('How much sold for').setRequired(true))
        .addStringOption(option => option.setName('amount').setDescription('Amount of cards bought and sold').setRequired(true)),
    async execute(interaction) {
        const buy = interaction.options.getInteger('buy');
        const sell = interaction.options.getInteger('sell');
        const amount = interaction.options.getInteger('amount');

        profit().then(() => {
            sim = message;
            interaction.reply(`${sim}`)
        });
        profit(buy, sell, amount)

    },
};