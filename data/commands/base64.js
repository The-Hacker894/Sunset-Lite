const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const boxen = require('boxen');
const base64url = require('base64-url')
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement) => {
   
    var code = args[1]
    var text = message.content.split(code).slice(1).join(' ')
    var options = ['encode', 'decode', 'recover']
    if(!code) return message.channel.send('Please specify whether or not you want to `decode` `encode` or `recover` text.')
    

    if(options.some(opt => code.includes(options))) {
        message.channel.send('You must specify whether or not you want to `decode` or `encode` text.').then(message => {
            message.channel.stopTyping()
        })
        
    } else {
        if(code === 'encode') {
            if(!text) return message.channel.send('Please specify what text you want encoded or decoded.').then(message => {
                message.channel.stopTyping()
            })
            fs.writeFile(`./data/base64files/${message.author.id}.txt`, base64url.encode(text), function(err) {
                if(err) {
                    message.channel.send('An exception occured while writing your encoded text to a text file. ' + err).then(message => {
                        message.channel.stopTyping()
                    })
                    return console.log(err);
                } else {
                    message.channel.send(new Attachment(`./data/base64files/${message.author.id}.txt`, `base64_encode.txt`)).then(message => {
                        message.channel.stopTyping()
                    })
                }
            });
        }
        if(code === 'decode') {
            if(!text) return message.channel.send('Please specify what text you want encoded or decoded.').then(message => {
                message.channel.stopTyping()
            })
            fs.writeFile(`./data/base64files/${message.author.id}.txt`, base64url.decode(text), function(err) {
                if(err) {
                    message.channel.send('An exception occured while writing your decoded text to a text file. ' + err).then(message => {
                        message.channel.stopTyping()
                    })
                    return console.log(err);
                } else {
                    message.channel.send(new Attachment(`./data/base64files/${message.author.id}.txt`, `base64_decode.txt`)).then(message => {
                        message.channel.stopTyping()
                    })
                }
            });
        }
        if(code === 'recover') {
            fs.exists(`./data/base64files/${message.author.id}.txt`, function(exists) {
                if (exists) {
                  fs.stat(`./data/base64files/${message.author.id}.txt`, function(err, stats) { 
                    message.channel.send(new Attachment(`./data/base64files/${message.author.id}.txt`, `base64_recover.txt`)).then(message => {
                        message.channel.stopTyping()
                    });
                  });
                } else {
                  message.channel.send('You do not have any previous Base64 Text Files').then(message => {
                      message.channel.stopTyping()
                  })
                }
              });
        }
        console.log(boxen('[Base64] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + code,  {padding: 1}))
        
    }
}
module.exports.help = {
    name: "base64",
    info: "Encode and decode text in Base64",
    usage: "base64 <encode|decode|recover> <text>"
}