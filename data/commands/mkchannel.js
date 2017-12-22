const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  var channeltype = args[1]
  var channelname = message.content.split(channeltype).slice(1).join(' ')
  if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) +'```').catch(console.error);
  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) +'```').catch(console.error);

    var channeltypes = ['voice', 'text']

  if(!channeltype) return message.channel.send('```' + boxen('You must provide a channel type (voice or text)', {padding: 1}) +'```')
  if(!channelname) return message.channel.send('```' + boxen('You must provide a channel name', {padding: 1}) +'```')
  if(channeltypes.some(types => channeltype.includes(types))) {
      message.guild.createChannel(channelname, channeltype).catch(console.error);
      message.channel.send('```' + boxen('Channel Create\nChannel Type: ' + channeltype + '\nChannel Name: ' + channelname, {padding: 1}) +'```')
  } else {
    message.channel.send( message.channel.send('```' + boxen('You must provide a channel type (voice or text)', {padding: 1}) +'```'))
  }
}
module.exports.help = {
  name: "mkchannel",
  info: "Create a text or voice channel",
  usage: "mkchannel <name>"
}
