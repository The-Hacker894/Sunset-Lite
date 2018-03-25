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
    .addField('**Information**', '`help` `info` `avatar` `profile` `serverinfo` `invite`')
    .addField('**Moderation**', '`setnick` `warn` `warnings` `mute` `unmute` `ban` `kick` `unban` `purge` `mkchannel` `channelsettings`')
    .addField('**Entertainment**', '`cleverbot` `2ball` `8ball` `cowsay` `cowthink` `dictionary` `emojify` `figlet` `fliptext` `google` `reverse` `roll` `rps` `say` `timer` `urban` `randomcolor`')
    .addField('**File Generation**', '`binary` `url` `base64` `qrcode` `lastqr` `createtxt` `lasttxt`')
    .addField('**Other**', '`announcement`')
    .addField('**Owner Only**', '`flush` `settings`')
message.channel.send({embed: helpembed})
}
module.exports.help = {
  name: "help",
  info: "Get documentation on all of Sunset's commands",
  usage: "help"
}
