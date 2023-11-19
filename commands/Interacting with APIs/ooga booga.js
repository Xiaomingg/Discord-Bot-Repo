const {SlashCommandBuilder} = require("discord.js");
let constant = 44;
function foo() {
    constant = 69420;
}
const ree = constant

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription("Ooga booga solve problem."),
    async execute(interaction) {
        await interaction.reply(`Shalom: ${ree}`)
    }
}