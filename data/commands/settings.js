
const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const ms = require('ms')
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement) => {
    const modlog = message.guild.channels.find('name', 'mod-log');
    var commandlock = data.lock
    var newstatus = client.user.presence.status.toUpperCase()
    if(commandlock.includes('true')) {       
      if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
    } 
    var setting = args[1]
    var option = message.content.split(setting).slice(1).join(' ')
    var setembed = `Announcement: ${announcement.announce}\n` +
                    `Color: ${data.embedcolor}\n` +
                    `Command Lock: ${data.lock}\n` +
                    `Game: ${game.game}\n` +
                    `Activity: ${game.activity}\n` +
                    `Status: ${newstatus}`
    if(!setting) {
            return message.channel.send('```' + boxen(setembed, {padding: 1}) + '```')
    }
    if(setting.includes('announcement')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        announcement.announce = option;
      
      fs.writeFileSync("./data/brain/announcement.json", JSON.stringify(announcement), (err) => console.error);
      message.channel.send('Set announcement to `' + option + '`')
      return;
    }
    if(setting.includes('color')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        data.embedcolor = option
        fs.writeFileSync("./data/brain/data.json", JSON.stringify(data), (err) => console.error);
        message.channel.send('Set embed color to `' + data.embedcolor + '`')
        return;
    }
    if(setting.includes('game')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        
        game.game = option
        
        fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)
              message.delete()
              message.channel.send('Set Game Status to `' + game.game + ' | ' + data.prefix + 'help`').catch(console.error);
            
            if(game.activity.includes('PLAYING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'PLAYING' })
                return;
            }
            if(game.activity.includes('STREAMING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'STREAMING' })
                return;
            }
            if(game.activity.includes('LISTENING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'LISTENING' })
                return;
            }
            if(game.activity.includes('WATCHING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'WATCHING' })
                return;
            }

    }
    if(setting.includes('activity')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        var validacts = ['PLAYING', 'WATCHING', 'STREAMING', 'LISTENING']
        if(validacts.some(activities => option.includes(activities))) {
            var newoption = option.toUpperCase()
            if(newoption.includes('PLAYING')) {

                game.activity = 'PLAYING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'PLAYING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
            }
            if(newoption.includes('WATCHING')) {

                game.activity = 'WATCHING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'WATCHING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              return;
            }
            if(newoption.includes('STREAMING')) {

                game.activity = 'STREAMING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'STREAMING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              return;
            }
            if(newoption.includes('LISTENING')) {

                game.activity = 'LISTENING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'LISTENING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              return;
            }
        

        } else {
            message.channel.send('Valid Activities\n`PLAYING` `LISTENING` `WATCHING` `STREAMING`')
        }
              
    }
    if(setting.includes('lock')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        if(!option === 'false') {
            if(!option === 'true') {
                message.channel.send('Please set the lock to `true` or `false`')
            }
        }

        data.lock = option

        fs.writeFile("./data/brain/data.json", JSON.stringify(data), (err) => console.error)
        message.delete()
        message.channel.send('Set Command Lock to `' + data.lock + '`').catch(console.error);
        return;
    } 
    if(setting.includes('status')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        var statusoptions = ['online', 'idle', 'dnd', 'invisible']
        if(statusoptions.some(terms => option.includes(terms))) {
            client.user.setStatus(option).catch(console.error)
            message.channel.send('Status changed to `' + option + '`')
            return;
        } else {
            message.channel.send('The status must be `online`, `idle`, `dnd`, or `invisible`')
        }
    }
}
module.exports.help = {
    name: "settings",
    info: "Change Sunset's settings",
    usage: "settings <setting> <option>"
}