const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
const kickreason = message.content.split(/\s+/g).slice(2).join(" ");
const kickMember = message.guild.member(message.mentions.users.first());

  if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('```' + boxen('KICK_MEMBERS permission required', {padding: 1}) + '```').catch(console.error);
  if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('```' + boxen('KICK_MEMBERS permission required', {padding: 1}) + '```').catch(console.error);

    if(kickreason.length < 1) return message.channel.send('```' + boxen('You must provide a member to kick and a reason', {padding: 1}) +'```').catch(console.error);
    if(kickMember.length < 1) return message.channel.send('```' + boxen('You must provide a member to kick and a reason', {padding: 1}) +'```').catch(console.error);
    if(kickMember === `<@${client.user.id}>`) return message.channel.send('```' + boxen('I cannot kick myself', {padding: 1}) +'```')

    var embedaction = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setDescription('**A user has been Kicked** \n \n **User:** ' + kickMember + '\n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + kickreason + ' \n **Server:** ' + message.guild.name)
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 
    message.channel.send('```' + boxen('Kicked\nUser: ' + kickMember + '\nModerator: ' + message.author.username + '\nReason: ' + kickMember +'\nServer: ' + message.guild.name) +'```').catch(console.error);
        message.delete()
        message.guild.member(kickMember).kick(kickreason);
          console.log('Kick | ' + message.guild.name + ' | ' + message.author.username + ' | ' + kickreason + ' | ' + kickMember)
}
module.exports.help = {
  name: "kick",
  info: "Kick a Member",
  usage: "kick <@user> <reason>"
}
