const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
    message.channel.send('```' + boxen(announcement.announce) + '```')
}
module.exports.help = {
  name: "announcement",
  info: "Check the current announcement",
  usage: "announcement"
}
