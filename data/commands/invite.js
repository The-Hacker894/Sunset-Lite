const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  message.channel.startTyping()
const channelname = message.content.split(' ').slice(1).join(' ')
const channelinvite = message.guild.channels.find('name', channelname)
if(channelname.length < 1) return message.channel.send('```' + boxen('Please provide a valid channel name', {padding: 1}) + '```')
if(!channelinvite) return message.channel.send('```' + boxen('Please provide a valid channel name', {padding: 1}) + '```')
if(!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send('```' + boxen('CREATE_INSTANT_INVITE permission required', {padding: 1}) +'```')
channelinvite.createInvite().then(invite =>
      message.channel.send(invite.url).then(message => {
        message.channel.stopTyping()
      })
  );
}
module.exports.help = {
  name: "invite",
  info: "Creates an invite for the given channel",
  usage: "invite <channelname>"
}
