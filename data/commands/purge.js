const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('```' + boxen('MANAGE_MESSAGES permission required', {padding: 1}) +'```')
  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('```' + boxen('MANAGE_MESSAGES permission required', {padding: 1}) +'```')
    // removed 

var purgearg = message.content.split(' ').slice(1).join(' ')
var roundedpurgearg = Math.round(purgearg / 2)

  if(roundedpurgearg.length < 1) return message.channel.send('```' + boxen('You must provide a number of messages to purge; 2 - 200', {padding: 1}) +'```')
  if(roundedpurgearg.length > 200) return message.channel.send('```' + boxen('You cannot purge more than 200 messages', {padding: 1}) +'```')
  if(isNaN(roundedpurgearg)) return message.channel.send('Please provide an integer.')
  message.channel.send('Deleting...')
  message.delete()
  message.delete()
  message.guild.member(message.channel.bulkDelete(roundedpurgearg))
    message.guild.member(message.channel.bulkDelete(roundedpurgearg))
  console.log('Purge | ' + roundedpurgearg + ' | ' + message.guild.name + ' | ' + message.author.username)
}
module.exports.help  = {
  name: "purge",
  info: "Purge 2 - 100 in the current channel",
  usage: "purge <value>"
}
