const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
let channeldelreason = message.content.split(' ').slice(1).join(' ')

  if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);
  if(channeldelreason.length < 1) return message.channel.send(boxen('Reason required for Channel Deletion', {padding: 1}))

  message.channel.delete()
  message.author.send('Channel has been deleted').catch(console.error);
    console.log('A channel has been deleted on ' + message.guild.name + '.')
  }
  module.exports.help = {
    name: "channeldelete",
    info: "Delete a channel *including a reason*",
    usage: "channeldelete <reason>"
  }
