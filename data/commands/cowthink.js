const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const cowsay = require('cowsay');
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  let ctmsg = message.content.split(' ').slice(1).join(' ')
  if(ctmsg.length < 1) return message.channel.send('```' + boxen('Please provide something for the cow to think', {padding: 1}) + '```')
    message.channel.send('```' + cowsay.think({text: ctmsg, e: "oO", T: "U"}) + '```')
}
module.exports.help = {
  name: "cowthink",
  info: "Cow thinks what message says",
  usage: "cowthink <message>"
}
