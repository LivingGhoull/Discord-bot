const fs = require('node:fs')
const path = require('node:path')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('beregning')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option
            .setName('input')
			.setDescription('The input to echo back')
            .addChoices(
                { name: 'grundlæggende beregning', value: 'grundlæggende_beregning.js' },
                { name: 'brøkregning', value: 'brøkregning.js' },
                { name: 'algebra', value: 'algebra.js' },
				{ name: 'funktion', value: 'funktion.js' },
                { name: 'ligninger', value: 'funktioner.js' },
                { name: 'lineære funktion', value: 'lineære_regression.js' },
                { name: 'lineære regression', value: 'lineære_regression.js' },
            )
            .setRequired(true))
            
    .addStringOption(option =>
        option
            .setName('beregningen')
            .setDescription('Det den skal udregne')
            .setRequired(true)),
            
    async execute(interaction) {

        const chosenFormulaPath = path.join(__dirname, "/beregnings_samling");
        const chosenFormula = fs.readdirSync(chosenFormulaPath).filter(file => file.endsWith('.js'));
        
        for(const file of chosenFormula){
            if (file === interaction.options._hoistedOptions[0].value) {
                await interaction.reply(require(path.join(chosenFormulaPath, file))(interaction.options._hoistedOptions[1].value))
                break
            }
        }
    },
};