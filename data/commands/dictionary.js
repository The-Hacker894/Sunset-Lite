
const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const webdict = require('webdict');
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
var dictsearch = message.content.split(' ').slice(1).join(' ')
webdict('dictionary', dictsearch).then(resp => {
  message.channel.startTyping()
    if(!resp.definition) return message.channel.send('```' + boxen('No Dictionary Entry for ' + dictsearch, {padding: 1}) +'```')
    if(dictsearch.length < 1) return message.channel.send('```' + boxen('You must provide word to search for', {padding: 1}) +'```')
    message.channel.send('```' + boxen('Word: ' + dictsearch + '\nDefinition: ' + resp.definition + '\nType: ' + resp.type + '\nSource: ' + resp.source, {padding: 1}) +'```')
      message.channel.stopTyping()
  });
}
module.exports.help = {
  name: "dictionary",
  info: "Search the definition of a word",
  usage: "dictionary <word>"
}
