module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		if (args != undefined) {
			if (args.length) { 
				message.channel.send('You can not pass arguments with this command.'); 
				return;
		}
	}
		message.channel.send('Pong.');
	},
};