const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const ms = require('ms')
module.exports.run = (client, message, args, data, game, announcement) => {

var messagecontent = message.content.split(' ').slice(1).join(' ')
var muteMember = message.guild.member(message.mentions.users.first());
const muteRole = message.guild.roles.find('name', 'Muted by SUNSET-LITE')
const modlog = message.guild.channels.find('name', 'mod-log');

 var mutetime = message.content.split(/\s+/g).slice(2).join(" ");

 if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You must have the `MANAGE_CHANNELS` permission')
 if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have the `MANAGE_CHANNELS` permission')

 if(mutetime.length < 1) return message.channel.send('Please provide the amount of time for the mute')
 var msMuteTime = ms(mutetime)
    if(muteMember.length < 1) return message.channel.send('Please provide a member to mute')
    

    if(!muteRole) {
        message.guild.createRole({
            name: 'Muted by SUNSET-LITE',
            color: 'ORANGE',
            SEND_MESSAGES: false,
            SEND_TTS_MESSAGES: false,
          })
            .then(role => {
                message.channel.send('```' + boxen('Created role ' + role) +'```')
            })
            .catch(err => {
                message.channel.send('An error occured: ' + err)
            })
    }
   /* muteRole.setPermissions(['SEND_MESSAGES', 'SEND_TTS_MESSAGES']).catch(err => {
        message.channel.send('An error occured: ' + err)
    }) */
    message.guild.channels.forEach((channel, id) => {
        channel.overwritePermissions(muteRole, {
            SEND_MESSAGES: false,
            SEND_TTS_MESSAGES: false
        }).catch(err => {
            message.channel.send('An error occured: ' + err)
        })
    })
    

if(muteMember.roles.has(muteRole.id)) {
    return message.channel.send(muteMember + ' is already muted!')
}
if(muteMember.id === message.author.id) {
    return message.channel.send('You cannot mute yourself')
}
if(muteMember.highestRole.position >= message.member.highestRole.position) {
    return message.channel.send(`You cannot mute ${muteMember} because they have the same role or a higher role than you.`)
}
if(client.user.highestRole.position >= message.member.highestRole.position) {
    return message.channel.send(`I cannot mute ${muteMember} because they have the same role or a higher role than me.`)
}
    muteMember.addRole(muteRole).catch(err => {
        message.channel.send('An error occured: ' + err)
    })

    setTimeout(Timer, msMuteTime)
   
    function Timer() {
        muteMember.removeRole(muteRole).catch(err => {
            message.channel.send('An error occured: ' + err)
            muteMember.send('```' + boxen('Mute for ' + muteMember + ' is done') +'```')
        })
    }

    message.channel.send('```' + boxen('Muted ' + muteMember + ' for ' + mutetime) +'```')
    muteMember.send('```' + boxen('Muted ' + muteMember + ' for ' + mutetime) +'```')
    
    

}
module.exports.help = {
    name: "mute",
    info: "Mute the mentioned user",
    usage: "mute <@user> <time>"
}