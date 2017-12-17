const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 

    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);
  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);

  let channelname = message.content.split(' ').slice(1).join(' ')

  if(channelname.length < 1) return message.channel.send('```' + boxen('You must provide a name for the new channel', {padding: 1}) +'```').catch(console.error);
      message.guild.createChannel(channelname, 'text').catch(console.error);

      message.channel.send('Text Channel ' + channelname + ' has been created ' + message.author.username + '.')
        console.log('A Text Channel has been created on ' + message.guild.name + '.')
}
module.exports.help = {
  name: "mkchannel",
  info: "Create a text channel",
  usage: "mkchannel <name>"
}
