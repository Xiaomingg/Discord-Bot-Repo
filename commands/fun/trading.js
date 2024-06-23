const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tips')
        .setDescription('insider trading'),
    async execute(interaction){
        interaction.reply(`Bitcoin.`)
    }
}
