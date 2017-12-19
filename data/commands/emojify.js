const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
const webdict = require('webdict');
translate = require('moji-translate');
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
var emsg = message.content.split(' ').slice(1).join(' ')
  if(emsg.length < 1) return message.channel.send('```' + boxen('You must provide something to emojify', {padding: 1}) +'```')
  if(translate.translate(emsg) === emsg) return message.channel.send('```' + boxen('Cannot emojify ' + emsg, {padding: 1}) + '```')
  message.channel.send(translate.translate(emsg));
}
module.exports.help = {
  name: "emojify",
  info: "Emojifies the given message *if possible*",
  usage: "emojify <message>"
}
