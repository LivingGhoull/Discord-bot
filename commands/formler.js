const fs = require('node:fs')
const path = require('node:path')
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('formler')
	.setDescription('Replies with your input!')
    
	.addStringOption(option =>
		option
            .setName('formel')
			.setDescription('The input to echo back')
            .addChoices(
                { name: 'grundlæggende beregning', value: 'grundlæggende_beregning.js' },
				{ name: 'brøkregning', value: 'brøkregning.js' },
                { name: 'algebra', value: 'algebra.js' },
				{ name: 'ligninger', value: 'ligninger.js' },
                //{ name: 'funktioner', value: 'funktioner.js' },
				//{ name: 'lineære funktioner', value: 'lineære_funktioner.js' },
                //{ name: 'lineære regression', value: 'lineære_regression.js' },
            )
            .setRequired(true)),

        async execute(interaction) {
            const chosenFormulaPath = path.join(__dirname, "/formel_samlingerne");
            const chosenFormula = fs.readdirSync(chosenFormulaPath).filter(file => file.endsWith('.js'));

            for(const file of chosenFormula){
                if (file === interaction.options._hoistedOptions[0].value) {
                    await interaction.reply(require(path.join(chosenFormulaPath, file)))
                    break
                }
            }
        },
};
