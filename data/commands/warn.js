const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
module.exports.run = (client, message, args, data, announcement) => {
    var warnMember = message.guild.member(message.mentions.users.first());
    var messagecontent = message.content.split(' ').slice(1).join(' ')
    var warnReason = message.content.split(/\s+/g).slice(2).join(" ");
    const modlog = message.guild.channels.find('name', 'mod-log');
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You must have the `MANAGE_CHANNELS` permission')

    var warninfo = `{\nMemberID: ${warnMember.id}` +
                    `\nMember Tag: ${message.mentions.users.first().tag}` +
                    `\nModerator: ${message.author.tag}` +
                    `\nWarn Reason: ${warnReason}` +
                    `\nDate: ${moment().format('MMMM Do YYYY, h:mm:ss a')}` +
                    `\nGuild Name: ${message.guild.name}` +
                    `\n}`
                    var warned = `Member Tag: ${message.mentions.users.first().tag}\n` +
                                `Moderator: ${message.author.tag}\n` +
                                `Warn Reason: ${warnReason}\n` +
                                `Guild Name: ${message.guild.name}\n` +
                                `Date: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n` +
                                `You can use warnings <@user> clear to clear all warnings for a user.`

                    var warneduser = `You have been warned\n` +
                                    `Moderator: ${message.author.tag}\n` +
                                    `Warn Reason: ${warnReason}\n` +
                                    `Guild Name: ${message.guild.name}`
                        

    fs.appendFile(`./data/serverdata/${message.guild.id}/warns/${warnMember.id}.txt`, `\n${warninfo}`, (err) => {  
        if (err) message.channel.send(err)
       message.channel.send('```' + boxen(warned, {padding: 1}) + '```');
       warnMember.send('```' + boxen(warneduser, {padding: 1}) + '```')
      
    });


}
module.exports.help = {
    name: "warn",
    usage: "warn <@user> <reason>"
}