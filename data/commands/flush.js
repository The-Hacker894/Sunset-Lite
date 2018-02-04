const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Command**`).catch(console.error);
  let flushmessage = message.content.split(' ').slice(1).join(' ')
  var flushinfoembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle("Flush Info")
    .setDescription('This command is used to reload certain things')
    .addField('Session', data.prefix + 'flush session')
    .addField('Process', data.prefix + 'flush process')
  if(flushmessage.length < 1) return message.channel.send({embed: flushinfoembed})
  if(flushmessage === `session`) {
    var flushannouncementsuccessembed = new Discord.RichEmbed()
        client.destroy()
        client.login(data.token)
  }
  if(flushmessage === `process`) {
        process.exit(0);
  }
}
module.exports.help = {
  name: "flush",
  info: "Reload parts of Sunset",
  usage: "flush <item>"
}
