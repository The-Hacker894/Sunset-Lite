const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  var helpembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
    .setTitle('Commands')
    .addField('**Info**', '`help` `info` `avatar` `profile` `serverinfo` `membercount` `invite` `uptime` `usage`')
    .addField('**Moderation**', '`ban` `kick` `unban` `purge` `mkchannel` `channelsettings`')
    .addField('**Entertainment**', '`cleverbot` `2ball` `8ball` `cowsay` `cowthink` `dictionary` `emojify` `figlet` `fliptext` `google` `reverse` `roll` `doubleroll` `rps` `say` `timer` `urban` `vote` `youtube` `randomcolor`')
    .addField('**File Generation**', '`qrcode` `lastqr` `createtxt` `lasttxt` `txtmp3` `lastmp3`')
    .addField('**Other**', '`announcement`')
    .addField('**Owner Only**', '`flush` `settings`')
message.channel.send({embed: helpembed})
}
module.exports.help = {
  name: "help",
  info: "Get documentation on all of Sunset's commands",
  usage: "help"
}
