require('dotenv').config()
const ms = require('ms')
const fs = require('node:fs')
const path = require('node:path')
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const badWords = require('./mutebel_words');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
  ]
});

// The bot loads all of the command files so it would be able to use them
client.commands = new Collection

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)  
  const command = require(filePath)

  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(`Warning the command at ${filePath} is missing or something is wrong with it`)
  }

}

//When the client is ready and op and going 
client.once(Events.ClientReady, c => {
  console.log(`ready! logged in as ${c.user.tag}`)
})

//When using a command
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

//When people join the server 
client.on(Events.GuildMemberAdd, async member =>{
	const channel = client.channels.cache.get(process.env.WELCOMECHANNEL)
	await channel.send(`Velkommen til serveren <@${member.id}>`)
})

//Listen for all messages on the server
client.on(Events.MessageCreate, async msg =>{
	let user = msg.author.id
  	await msg.guild.members.fetch().then(fetchedMembers => {
		fetchedMembers.forEach(e => {
			if(user == e.id) {
				if (badWords(msg)){
					let member = e.guild.members.cache.get(user)
					msg.delete()
					member.timeout(ms('1m'), "Du brugte bandeord der er forbudt")
				}
			}
		})
	})
})

// Makes the bot go online
client.login(process.env.TOKEN);