const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
module.exports.run = (client, message, args, data, announcement) => {
    var warnMember = message.guild.member(message.mentions.users.first());
    var messagecontent = message.content.split(' ').slice(1).join(' ')
    var warnReason = message.content.split(/\s+/g).slice(2).join(" ");

    var noargs = `Please provide a member to check warnings for`

    if(!warnMember) return message.channel.send('```' + boxen(noargs, {padding: 1}) + '```')

                    if(warnReason === 'clear') {
                        fs.exists(`./data/serverdata/${message.guild.id}/warns/${warnMember.id}.txt`, function(exists) {
                            if (exists) {
                                fs.unlink(`./data/serverdata/${message.guild.id}/warns/${warnMember.id}.txt`, function(err) {
                                 if (err) {
                                     return message.channel.send(err)
                                 }

                                 message.channel.send('Warns cleared for ' + warnMember)
                                 warnMember.send('***Warns have been cleared on ' + message.guild.name + '!***')
                                 console.log('send data')
                               });
                             } else {
                                 return message.channel.send('```' + boxen('That user has no warns', {padding: 1}) +'```')
     
                             }
                         });
                    } else {
                    fs.exists(`./data/serverdata/${message.guild.id}/warns/${warnMember.id}.txt`, function(exists) {
                       if (exists) {
                        fs.readFile(`./data/serverdata/${message.guild.id}/warns/${warnMember.id}.txt`, 'utf8', function(err, data) {
                            if (err) {
                                return message.channel.send(err)
                            }
                            message.channel.send('```' + data + '```')
                            console.log('send data')
                          });
                        } else {
                            message.channel.send({embed: warnerror})

                        }
                    });
                }


}
module.exports.help = {
    name: "warnings",
    usage: "warnings <@user>"
}