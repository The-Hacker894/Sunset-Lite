const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const flip = require('flip-text');
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const flipmsg = message.content.split(' ').slice(1).join(' ')
  if(flipmsg.length < 1) return message.channel.send('```' + boxen('YOu must provide some text to flip', {padding: 1}) +'```')
  message.channel.send('`' + flip(flipmsg) + '`')
}
module.exports.help = {
  name: "fliptext",
  info: "Flips the given text",
  usage: "fliptext <message>"
}
