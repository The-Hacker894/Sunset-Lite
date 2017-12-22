const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const writeFile = require("write")
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement) => {
    const modlog = message.guild.channels.find('name', 'mod-log');
    message.channel.startTyping()
    

    fs.exists(`./data/qrcode/${message.author.id}.png`, function(exists) {
        if (exists) {
          fs.stat(`./data/textfiles/${message.author.id}.txt`, function(err, stats) { 
            message.channel.send(new Attachment(`./data/textfiles/${message.author.id}.txt`, `textfile.txt`)).then(message => {
                message.channel.stopTyping()
            });
          });
        } else {
          message.channel.send('You do not have any previous Text Files').then(message => {
              message.channel.stopTyping()
          })
        }
      });

    console.log(boxen('[Last Text] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
var qrcodemlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Last Text Command Used')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
if(modlog) return modlog.send({embed: qrcodemlembed})

}
module.exports.help = {
    name: "lasttxt",
    info: "Loads the last text file created",
    usage: "lasttxt"
}