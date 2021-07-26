const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./token.json');
const Config = require('./config.json');
const ping = require('./Commands/Text return commands/ping');
const addReactions = require('./Commands/Text return commands/createEmbed');

const client = new Discord.Client();
client.botConfig = Config;
client.commands = new Discord.Collection(); // Create a collection to store commands in

// The folder named Commands. This constant is used to iterate
// through the sub folders of the Commands folder.
const commandFolders = fs.readdirSync('./commands');

// Import all the command files from the commandFIles array
for (const folder of commandFolders) {
	// Create an array of javascript file names in the commands folder 
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	var prefix = client.botConfig.prefix;
	// TODO: Remove the bot only being allowed to perform actions in one channel.
	if (!message.content.startsWith(prefix) || message.author.bot || message.channel.name != 'sannities-bot-testing') return;

	// Trim the prefix and slice up the arguments into the array args
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	var commandName = args.shift().toLowerCase();

	if (commandName === 'embed') commandName = 'createEmbed';
	if (!client.commands.has(commandName)) return;
	
	var command = client.commands.get(commandName);
	
	try {
		command.execute(message, args, prefix);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.on('messageReactionAdd', (reaction, user, newEmbed) => {
	// TODO: Remove the bot only being allowed to perform actions in one channel.
	if (user.bot || reaction.message.channel.name != 'sannities-bot-testing') return;
	if (reaction.emoji.name === '🏓') {
		ping.execute(reaction.message);
	} else if (reaction.emoji.name === '😄') {
		console.log(user)
	}
	//if (!reaction.message.author.bot) return;
});

client.login(token);