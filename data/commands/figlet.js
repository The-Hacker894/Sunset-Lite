const figlet = require('figlet');
const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const webdict = require('webdict');
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  var fmsg = message.content.split(' ').slice(1).join(' ')
  if(fmsg.length < 1) return message.channel.send('```' + boxen('You must provide something to figletize', {padding: 1}) + '```')
    figlet(fmsg, function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    message.channel.send('```' + data + '```')
    });
}
module.exports.help = {
  name: "figlet",
  info: "*Figletizes* a your message",
  usage: "figlet <message>"
}
