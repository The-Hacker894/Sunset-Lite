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
let banmessage = message.content.split(' ').slice(1).join(' ')
let banMember = message.guild.member(message.mentions.users.first());
  let banreason = message.content.split(/\s+/g).slice(2).join(" ");

var banusermessageembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
.setTitle('Automated Ban Message')
.setDescription('**You have been banned** \n \n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + banreason + ' \n **Server:** ' + message.guild.name)

  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('```' + boxen('BAN_MEMBERS permission required', {padding: 1}) +'```').catch(console.error);
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('```' + boxen('BAN_MEMBERS permission required', {padding: 1}) +'```').catch(console.error);

    if(banreason.length < 1) return message.channel.send('```' + boxen('You need to provide a member to ban and a reason for the ban', {padding: 1}) +'```').catch(console.error);
    if(banMember.length < 1) return message.channel.send('```' + boxen('You need to provide a member to ban and a reason for the ban', {padding: 1}) +'```').catch(console.error);
        message.guild.member(banMember).ban(banreason)
        message.delete()
        var embedaction = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setDescription('**A user has been banned** \n \n **User:** ' + banMember + '\n **Moderator:** ' + message.author.username + '\n **Reason:** ' + banreason + '\n **Server:** ' + message.guild.name)
        .setAuthor(message.author.username ,message.author.avatarURL)
        // removed 
        message.channel.send({embed: embedaction})
        console.log(boxen('[Ban] | ' + message.guild.name + ' | ' + message.author.username + ' | ' + banreason + ' | ' + banMember.tag, {padding: 1}))

      }
      module.exports.help = {
        name: "ban",
        info: "Ban a user",
        usage: "ban <@user> <reason>"
      }
