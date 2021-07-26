const Discord = require('discord.js');

module.exports = {
	name: 'createEmbed',
	description: 'Creates an embed with information.',
	execute(message, args) {
		if (args.length) { 
			message.channel.send('You can not pass arguments with this command.'); 
			return;
		}
		const exampleEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('')
		.setDescription('React to make the bot do something.')
		.addFields(
			{ name: 'Ping', value: 'To ping react with 🏓'},
			{ name: 'Coming', value: 'Coming soon: react with 😄'},
			{ name: 'Smilers', value: '-' }
		)
		.setTimestamp()

		message.channel.send(exampleEmbed).then(exampleEmbed => {
		exampleEmbed.react('🏓')
		.then (() => exampleEmbed.react('😄'))
		})

		message.delete();
	}
};