const reverse = require('reverse-string')
const prettyMs = require('pretty-ms');
const pusage = require('pidusage')
const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
const boxen = require("boxen")

module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const embedcolor = data.embedcolor
  const rmsg = message.content.split(' ').slice(1).join(' ')
  var reverseerrembed = new Discord.RichEmbed()
    .setColor(embedcolor)
    .setTitle("Reverse Error")
    .setDescription("Please provide something to reverse")
  if(rmsg.length < 1) return message.channel.send('```' + boxen('Please provide something to reverse', {padding: 1}) +'```')
  message.channel.send(reverse(rmsg))
}
module.exports.help = {
  name: "reverse",
  info: "Reverse Text",
  usage: "reverse <text>"
}
