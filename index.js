require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')

const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
});

client.commands = new Collection

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)  
  const command = require(filePath)

  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(`Warning the command at ${filePath} is missing or somthing is wrong with it`)
  }
}

client.once(Events.ClientReady, c => {
  console.log(`ready! logged in as ${c.user.tag}`)
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});





client.login(process.env.TOKEN);