const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const convert = require('color-convert');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
const color = ((1 << 24) * Math.random() | 0).toString(16);
var rhembed = new Discord.RichEmbed()
    .setTitle('Random Color')
    .setDescription(`**Hex** #${color} \n **RGB** ${convert.hex.rgb(color)} \n **LAB** ${convert.hex.lab(color)} \n **CMYK** ${convert.hex.cmyk(color)}`)
    .setColor(`#${color}`);
message.channel.send({embed: rhembed});
}
module.exports.help = {
  name: "randomcolor",
  info: "Get a random color",
  usage: "randomhex"
}
