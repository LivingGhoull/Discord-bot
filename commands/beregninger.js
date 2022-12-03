const {SlashCommandBuilder} = require('discord.js')
const math = require('mathjs')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('beregnign')
        .setDescription('ping for test')
        .addStringOption(option =>
            option
            .setName('input')
			.setDescription('The input to echo back') 
            ),
    async execute(interaction) {
        //const input = interaction.options._hoistedOptions[0].value

        await interaction.reply(
            `
            ${interaction.options._hoistedOptions[0].value.toString()}\nto\n${math.evaluate(interaction.options._hoistedOptions[0].value).toString()}
            `
        )
    },
};

