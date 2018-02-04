const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  var channeltype = args[1]
  var channelname = message.content.split(channeltype).slice(1).join(' ')
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  
var embedccpermreturn = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Channel Create Usage')
  .setDescription('You must have the permission `MANAGE_CHANNELS`') 
  .addField(data.prefix + 'mkchannel <name>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
  var embedbotccpermreturn = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle("Channel Create Usage")
  .setDescription('I must have the permission `MANAGE_CHANNELS`')
  .addField(data.prefix + 'mkchannel <name>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
 var mkchannelreasonerrorembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Channel Create Usage')
  .setDescription('You must provide a reason for the Channel Creation')
  .addField(data.prefix + 'mkchannel <name> <reason>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
  if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: embedccpermreturn}).catch(console.error);
  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: embedbotccpermreturn}).catch(console.error);

  var channelnameerror = 'You must proivde a channel name'
    var channeltypeerror = 'You must proivde a channel type voice text or category'
    var channelcremlembed = 'Channel Type: ' + channeltype + '\nChannel Name: ' + channelname
    var channelcreatesuccess = 'Channel Type: ' + channeltype + '\nChannel Name: ' + channelname
    var channeltypes = ['voice', 'text', 'category']

  if(!channeltype) return message.channel.send('```' + boxen(channeltypeerror, {padding: 1}) +'```')
  if(!channelname) return message.channel.send('```' + boxen(channelnameerror, {padding: 1}) +'```')
  if(channeltypes.some(types => channeltype.includes(types))) {
      message.guild.createChannel(channelname, channeltype).catch(console.error);
      message.channel.send('```' + boxen(channelcreatesuccess, {padding: 1}) +'```')
      console.log(boxen('[Make Channel] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + channeltype + ' | ' + channelname, {padding: 1}))
  } else {
    message.channel.send('```' + boxen(channeltypeerror, {padding: 1}) +'```')
  }
}
module.exports.help = {
  name: "mkchannel",
  info: "Create a text or voice channel",
  usage: "mkchannel <name>"
}
