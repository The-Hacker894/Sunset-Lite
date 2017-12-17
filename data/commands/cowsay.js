const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const cowsay = require('cowsay');
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  let csmsg = message.content.split(' ').slice(1).join(' ')
  if(csmsg.length < 1) return message.channel.send('```'+ boxen('Please provide something for the cow to say', {padding: 1}) +'```')
    message.channel.send('```' + cowsay.say({text: csmsg, e: "oO", T: "U"}) + '```')
}
module.exports.help = {
  name: "cowsay",
  info: "Cows says what message says",
  usage: "cowsay <message>"
}
