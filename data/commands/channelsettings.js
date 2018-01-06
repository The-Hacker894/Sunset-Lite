const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data) => {
    var setting = args[1]
    var option = message.content.split(setting).slice(1).join(' ')
    if(!setting) {
        if(!message.channel.topic) {
                return message.channel.send('```' + boxen('Name: ' + message.channel.name + '\n**Topic: No Topic Set \nPosition: ' + message.channel.position + '\nType: ' + message.channel.type + '\nNSFW: ' + message.channel.nsfw, {padding: 1}) + '```') 
        }
        if(message.channel.topic === 'null') {
                return message.channel.send('```' + boxen('Name: ' + message.channel.name + '\nTopic: No Topic Set \nPosition: ' + message.channel.position + '\nType: ' + message.channel.type + '\nNSFW: ' + message.channel.nsfw, {padding: 1}) + '```')
        }
        if(message.channel.topic) {
            return message.channel.send('```' + boxen('**Name: ' + message.channel.name + '\nTopic: ' + message.channel.topic + ' \nPosition: ' + message.channel.position + '\nType: ' + message.channel.type + '\nNSFW: ' + message.channel.nsfw, {padding: 1}) + '```')
        }
    }
    if(setting.includes('name')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);
        if(!option) return;
        message.channel.setName(option)
        message.channel.send('Channel Name changed to ' + option)
        };
    if(setting.includes('topic')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);
        if(!option) return;
        message.channel.setTopic(option)
        message.channel.send('Channel Topic changed to ' + option)
        }
    if(setting.includes('position')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);
        if(!option) return;
        if(isNaN(option)) return message.channel.send('Please provide a positive integer.')
        message.channel.setPosition(option)
        message.channel.send('Channel Position changed to ' + option)
            };

}
module.exports.help = {
    name: "channelsettings",
    info: "Change Channel Settings",
    usage: "channelsettings <setting> <option>"
}