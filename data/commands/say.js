
const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var sayembed = 'You must provide a message to say'

var message2say = message.content.split(' ').slice(1).join(' ')
if(message2say.length < 1) return message.channel.send('```' + boxen(sayembed, {padding: 1}) +'```').catch(console.error);
if(message2say.includes('@<')) return;

    message.channel.send('```' + boxen(message2say, {padding: 1}) + '```').catch(console.error);
        message.delete()
}
module.exports.help = {
  name: "say",
  info: "Send a message through Sunset",
  usage: "say <message>"
}
