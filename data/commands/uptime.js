const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const prettyMs = require('pretty-ms');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  var uptimeembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle(data.name + ' Uptime')
  .setDescription('Uptime: ' + prettyMs(client.uptime, {verbose: true}))
  message.channel.send({embed: uptimeembed})
}
module.exports.help = {
  name: "uptime",
  info: "Get Sunset's total uptime in seconds, minutes, hours, and days",
  usage: "uptime"
}
