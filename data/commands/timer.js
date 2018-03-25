const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const ms = require('ms')
module.exports.run = (client, message, args, data, game, announcement) => {
    var commandlock = data.lock
    const time = message.content.split(' ').slice(1).join(' ')
    if(commandlock.includes('true')) {       
      if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
    } 
    if (!fs.existsSync(`./data/serverdata/timer/`)) {
        fs.mkdirSync(`./data/serverdata/timer/`);
        if (!fs.existsSync(`./data/serverdata/timer/${message.guild.id}/`)) {
            fs.mkdirSync(`./data/serverdata/timer/${message.guild.id}/`);
            
            }
        }
    if (!fs.existsSync(`./data/serverdata/timer/${message.guild.id}/`)) {
        fs.mkdirSync(`./data/serverdata/timer/${message.guild.id}/`);
        }
        fs.readFile(`./data/serverdata/timer/${message.guild.id}/${message.author.id}.txt`, 'utf8', function(err, data) {
            fs.readFile(`./data/serverdata/timer/${message.guild.id}/${message.author.id}.time.txt`, 'utf8', function(timererr, timedata) {
if(data === 'true') {
    var timeractive = 'You already have a timer active for '+ timedata +'. Please wait until the timer has concluded to set a new one.'
        
        return message.channel.send('```' + boxen(timeractive, {padding: 1}) + '```' )
} else {
    
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
    fs.writeFile(`./data/serverdata/timer/${message.guild.id}/${message.author.id}.txt`, 'true', function(err) {
        fs.writeFile(`./data/serverdata/timer/${message.guild.id}/${message.author.id}.time.txt`, time, function(err) {
    
    setTimeout(Timer, ms(time));
    function Timer() {
        fs.writeFile(`./data/serverdata/timer/${message.guild.id}/${message.author.id}.txt`, 'false', function(err) {
        message.reply('***Timer Done*** :white_check_mark: \n ***Time:*** ' + time + '\n ***Milliseconds:*** ' + ms(time))
        message.author.send('***' + time + '\n ***Milliseconds:*** ' + ms(time) + ' second timer done*** :white_check_mark:')
        });
      }
    });
});
    }
});
        });
}
module.exports.help = {
    name: "timer",
    info: "Sets a timer in seconds, minutes, or hours.",
    usage: "time <int_value>"
}