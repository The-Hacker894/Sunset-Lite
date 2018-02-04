const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 

  if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('```' + boxen('BAN_MEMBERS permission required', {padding: 1}) +'```').catch(console.error);
  if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('```' + boxen('BAN_MEMBERS permission required', {padding: 1}) +'```').catch(console.error);

var unbanMember = message.mentions.users.first();
var unbanreason = message.content.split(/\s+/g).slice(1, 2).join(" ");
if(unbanreason.length < 1) return message.channel.send('```' + boxen('Please provide a reason for the unban') +'```').catch(console.error);
message.guild.unban(unbanreason);
    message.delete()
    message.channel.send("The user, " + message.author.username + "has unbanned a member.");
    console.log('A user has been UNBANNED on ' + message.guild.name + '.')
}
module.exports.help = {
  name: "unban",
  info: "Unban a user by their ID",
  usage: "unban"
}
