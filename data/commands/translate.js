const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const translate = require('translate')
module.exports.run = (client, message, args, data, game, announcement) => {
    message.channel.startTyping()
    var lang =  args[1]
    var tmsg = message.content.split(lang).slice(1).join(' ')
    var translate = require('translate')
    translate.engine = 'yandex';
    translate.key = data.translateKey
    var tmsgerror = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Translate Error')
        .setDescription('The message you provided has brought up an unexpected error')
    var langerror = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('ISO 639-1 Language Code Error')
        .setDescription('You must provide a ISO 639-1 Language Code to translate. [This link may help you](https://www.loc.gov/standards/iso639-2/php/code_list.php)')
    
    if(!tmsg) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1}) + '```').then(message => {
        message.channel.stopTyping()
    })
    if(!lang) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1}) + '```\nThis link may help you\nhttps://www.loc.gov/standards/iso639-2/php/code_list.php').then(message => {
        message.channel.stopTyping()
    })
    if(lang < 2) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1}) + '```\nThis link may help you\nhttps://www.loc.gov/standards/iso639-2/php/code_list.php').then(message => {
        message.channel.stopTyping()
    }) 
    if(lang > 2) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1}) + '```\nThis link may help you\nhttps://www.loc.gov/standards/iso639-2/php/code_list.php').then(message => {
        message.channel.stopTyping()
    })

    translate(tmsg, lang).then(text => {
        
        if(text.length > 2000) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1}) + '```').then(message => {
            message.channel.stopTyping()
        })
        message.channel.send(text).then(message => {
            message.channel.stopTyping()
            console.log(boxen('[Translate] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
        })
      });

    

}
module.exports.help = {
    name: "translate",
    usage: "translate <language_code> <text>",
    info: "Translate from english to any language."
}