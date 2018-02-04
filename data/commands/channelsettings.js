const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data) => {
    const modlog = message.guild.channels.find('name', 'mod-log');
    var setting = args[1]
    var option = message.content.split(setting).slice(1).join(' ')
    var channelsettings = `Channel NSFW and Type cannot be managed by a bot`
                            `Name: ${message.channel.name}\n` +
                            `Topic: ${message.channel.topic}\n` +
                            `Position: ${message.channel.position}\n` +
                            `Category/Parent: ${message.channel.parent.name} | ${message.channel.parent.id}\n` +
                            `Type: ${message.channel.type}\n` +
                            `NSFW: ${message.channel.nsfw}`
    var channelsettingsNoTopic = `Channel NSFW and Type cannot be managed by a bot`
                            `Name: ${message.channel.name}\n` +
                            `Topic: No Topic Set\n` +
                            `Position: ${message.channel.position}\n` +
                            `Category/Parent: ${message.channel.parent.name} | ${message.channel.parent.id}\n` +
                            `Type: ${message.channel.type}\n` +
                            `NSFW: ${message.channel.nsfw}`
    var parenterror = 'At this time you must use the Category/Parent ID to set the current channel\'s category/parent'
    
    if(!setting) {
        if(!message.channel.topic) {
                message.channel.send('```' + boxen(channelsettingsNoTopic, {padding: 1}) +'```')
                return;
        }
        if(message.channel.topic === 'null') {
                message.channel.send('```' + boxen(channelsettingsNoTopic, {padding: 1}) +'```')
                return;
        }
            message.channel.send('```' + boxen(channelsettings, {padding: 1}) +'```')
            return;
    }
    if(setting.includes('name')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('Permission `MANAGE_CHANNELS` required', {padding:1}) +'```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('Permission `MANAGE_CHANNELS` required', {padding:1}) +'```').catch(console.error);
        if(!option) return;
        message.channel.setName(option)
        message.channel.send('Channel Name changed to ' + option)
        return;
        };
    if(setting.includes('parent')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('Permission `MANAGE_CHANNELS` required', {padding:1}) +'```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('Permission `MANAGE_CHANNELS` required', {padding:1}) +'```').catch(console.error);
        if(!option) return;
        if(isNaN(option)) return message.channel.send('```' + boxen(parenterror, {padding: 1}) +'```')
        message.channel.setParent(option).catch(console.error)
        message.channel.send('Channel Parent changed to ' + option)
        return;
    }
    if(setting.includes('topic')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('Permission `MANAGE_CHANNELS` required', {padding:1}) +'```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('Permission `MANAGE_CHANNELS` required', {padding:1}) +'```').catch(console.error);
        if(!option) return;
        message.channel.setTopic(option)
        message.channel.send('Channel Topic changed to ' + option)
        return;
        }
    if(setting.includes('position')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('Permission `MANAGE_CHANNELS` required', {padding:1}) +'```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('Permission `MANAGE_CHANNELS` required', {padding:1}) +'```').catch(console.error);
        if(!option) return;
        if(isNaN(option)) return message.channel.send('Please provide a positive integer.')
        message.channel.setPosition(option)
        message.channel.send('Channel Position changed to ' + option)
        return;
            };

}
module.exports.help = {
    name: "channelsettings",
    info: "Change Channel Settings",
    usage: "channelsettings <setting> <option>"
}