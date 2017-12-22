const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const fs = require("fs")
module.exports.run = (client, message, args, data, game, announcement) => {
    const modlog = message.guild.channels.find('name', 'mod-log');    
    message.channel.startTyping()
    fs.exists(`./data/qrcode/${message.author.id}.png`, function(exists) {
        if (exists) {
          fs.stat(`./data/qrcode/${message.author.id}.png`, function(err, stats) { 
            message.channel.send(new Attachment(`./data/texttomp3/${message.author.id}.mp3`, `text.mp3`)).then(message => {
                message.channel.stopTyping()
            });
          });
        } else {
          message.channel.send('You do not have any previous MP3 Files').then(message => {
              message.channel.stopTyping()
          })
        }
      });
    console.log(boxen('[LastMP3] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
}
module.exports.help = {
    name: "lastmp3",
    info: "Get the last MP3 you generated",
    usage: "lastmp3"
}