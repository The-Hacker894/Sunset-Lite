const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
if(!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send('```' + boxen('CHANGE_NICKNAME and MANAGE_NICKNAMES permissions required', {padding: 1}) +'```').catch(console.error);
if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send('```' + boxen('CHANGE_NICKNAME and MANAGE_NICKNAMES permissions required', {padding: 1}) +'```').catch(console.error);
if(!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send('```' + boxen('CHANGE_NICKNAME and MANAGE_NICKNAMES permissions required', {padding: 1}) +'```').catch(console.error);
if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send('```' + boxen('CHANGE_NICKNAME and MANAGE_NICKNAMES permissions required', {padding: 1}) +'```').catch(console.error);
const nickuserset = message.guild.member(message.mentions.users.first())
const usernick = message.content.split(/\s+/g).slice(2).join(" ")

if(nickuserset < 1) return message.channel.send('```' + boxen('Please provide a user to set a nickname for', {padding: 1}) +'```').catch(console.error);
if(usernick < 1) return message.channel.send('```' + boxen('Please provide a nickname to set for the user', {padding: 1}) +'```').catch(console.error);
    message.guild.member(nickuserset).setNickname(usernick).catch(console.error);
    message.delete()
    message.channel.send('Check ' + nickuserset + '\'s nick/username to see if the results match ' + usernick).catch(console.error);
  }
  module.exports.help = {
    name: "setnick",
    info: "Set a user or bot's nickname",
    usage: "setnick <@user> <nickname>"
  }
