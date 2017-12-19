const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const cleverbot = require("cleverbot.io")
const clever = new cleverbot('MzNwGnyfgL1iW54C','uZBfESqRedUjuajf0DJ78jD5LWEK5JWe');
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
    var commandlock = data.lock
    if(commandlock.includes('true')) {       
      if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
    } 
    var clevermessage = message.content.split(' ').slice(1).join(' ')
    if(clevermessage.length < 1) return message.channel.send("Please provide a message.")
    clever.setNick("Sunset Lite")
    clever.create(function (err, session) {
        message.channel.startTyping()
        message.channel.send('```' + boxen(message.author.username + ', ' + response) +'```')
        message.channel.stopTyping()
    })
}
module.exports.help = {
    name: "cleverbot",
    usage: "cleverbot <message>",
    info: "Chat with Cleverbot"
}