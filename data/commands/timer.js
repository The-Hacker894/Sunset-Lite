const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const ms = require('ms')
module.exports.run = (client, message, args, data, game, announcement) => {
    var commandlock = data.lock
    if(commandlock.includes('true')) {       
      if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
    } 
    var time = message.content.split(' ').slice(1).join(' ')
    if(time.length < 1) return message.channel.send('```' + boxen('Please provide a time to set', {padding: 1}) +'```')
    if(time < 1) return message.channel.send('```' + boxen('Please provide a time to set', {padding: 1}) +'```')
        var mstime = ms(time)
    if(ms(time) > 43200 * 1000) return message.channel.send('Please provide something less than 12 hours (720 minutes; 43200 seconds; ' + 43200 * 1000 + ' milliseconds)') 
     if(isNaN(mstime)) return message.channel.send('Please provide a positive integer.')
    if(ms(time) < 1) return message.channels.send('Cannot set a timer for ' + time)
        if(!message.content.includes('second')) {
        if(!message.content.includes('minute')) {
            if(!message.content.includes('hour')) return message.channel.send(`***Clarification needed*** \n **Suggestions** \n ${time} seconds \n ${time} minutes \n ${time} hours`)
    }
    }
    message.channel.send('**Timer for ' + time + ' started**\nI\'ll DM you when your timer finishes.')
    
    setTimeout(Timer, ms(time));
    function Timer() {
        message.reply('***Timer Done*** :white_check_mark: \n ***Time:*** ' + time + '\n ***Milliseconds:*** ' + ms(time))
        message.author.send('***' + time + '\n ***Milliseconds:*** ' + ms(time) + ' second timer done*** :white_check_mark:')
      }
    
}
module.exports.help = {
    name: "timer",
    info: "Sets a timer in seconds, minutes, or hours.",
    usage: "time <int_value>"
}