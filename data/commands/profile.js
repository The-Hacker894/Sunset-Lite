const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
const userprofile = message.content.split(' ').slice(1).join(' ')
const otheruserprofile = message.guild.member(message.mentions.users.first())
var userprofilelengthtooshortembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
  .setTitle('Profile')
  .addField('Username', message.author.username, true)
  .addField('ID', message.author.id, true)
  .addField('Discriminator', message.author.discriminator, true)
  .addField('Joined',message.member.joinedAt, true)
  .addField('Joined Timestamp', message.member.joinedTimestamp, true)
  .addField('Status', message.author.presence.status, true)
  .setThumbnail(message.author.displayAvatarURL)
  // removed 

if(userprofile.length < 1) return message.channel.send({embed: userprofilelengthtooshortembed})
var profileembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
  .setTitle(`Profile`)
  .addField('Username', message.guild.member(message.mentions.users.first()), true)
  .addField('ID', message.guild.member(message.mentions.users.first()).id, true)
  .addField('Discriminator', message.mentions.users.first().discriminator, true)
  .addField('Joined', message.guild.member(message.mentions.users.first()).joinedAt, true)
  .addField('Joined Timestamp', message.guild.member(message.mentions.users.first()).joinedTimestamp, true)
  .addField('Status', message.guild.member(message.mentions.members.first()).presence.status, true)
  .setThumbnail(message.mentions.users.first().displayAvatarURL)
  // removed 
  message.channel.send({embed: profileembed}).catch(console.error);
}
module.exports.help = {
  name: "profile",
  info: "Shows the profile of the mentioned user or yourself",
  usage: "profile <@user>"
}
