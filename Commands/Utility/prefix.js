const fsp = require('fs').promises;

module.exports = {
	name: 'prefix',
	description: 'Show or change the current prefix',
	execute(message, args, prefix) {
		var firstArgument = args[0];
		if (!args.length) {
			message.channel.send(`The current prefix is: \`${prefix}\` \nTo change the prefix use the command \`!prefix [character]\``);
			return;
		} else if (args.length > 1) {
			message.channel.send('You can only pass one argument when using this command.');
			return;
		} else if (args.length === 1) {
			if (firstArgument.length > 1) {
			message.channel.send('You can only pass a single character as argument for this command.');
			return;
			} else changePrefix(args[0]);
		}

		async function changePrefix(newPrefix) {
		    try {
				let data = await fsp.readFile('config.json');
				let obj = JSON.parse(data);
		
				// set whatever property or properties in the object that you are trying to change
				obj.prefix = newPrefix;
		
				await fsp.writeFile('config.json', JSON.stringify(obj, null, 2));
				message.channel.send(`Prefix changed to \`${newPrefix}\``);
			 } catch(e) {
				// error handling here
				console.log(e);
				message.channel.send('error sending message');
				throw e;      // make sure caller can see the message
			 }
		}
	},
};