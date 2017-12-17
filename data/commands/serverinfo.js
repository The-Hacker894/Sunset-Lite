const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  let total = 0;
client.guilds.map(g => total += g.memberCount)
  var members = message.guild.memberCount
  var onlinemembers = message.guild.presences.filter(p=>p.status == 'online').size
  var idlemembers = message.guild.presences.filter(p=>p.status == 'idle').size
  var dndmembers = message.guild.presences.filter(p=>p.status == 'dnd').size
  var offlinemembers = members - onlinemembers - idlemembers - dndmembers
  var onlinemembervsmember = onlinemembers / members
  var idlemembervsmember = idlemembers / members
  var dndmembervsmember = dndmembers / members
  var offlinemembervsmember = offlinemembers / members
  var membervstotalmember = members / total
  // Math.round(1.005*100)/100
var serverinfembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
.setTitle('Server Info')
.addField('Server Name', message.guild.name + ' | ' + message.guild.id, true)
.addField('Server Region', message.guild.region, true)
.addField('Member Count', members, true)
.addField('Channel Count', message.guild.channels.size, true)
.addField('Online Member Count', '`' + onlinemembers + '` / ' + '`' + members + '` [`' + Math.round(onlinemembervsmember *100) + '%`]', true)
.addField('Idle Member Count', '`' + idlemembers + '` / ' + '`' + members + '` [`' + Math.round(idlemembervsmember *100) + '%`]' ,true)
.addField('Do Not Disturb Member Count', '`' + dndmembers + '` / ' + '`' + members + '` [`' + Math.round(dndmembervsmember *100) + '%`]',true )
.addField('Offline Member Count', '`' + offlinemembers + '` / `' + members + '` [`' + Math.round(offlinemembervsmember *100) + '%`]', true)
.setFooter('This server has ' + members + ' / ' + total + ' [' + Math.round(10000*membervstotalmember)/10000 + '%] of ' + client.user.username + '\'s users!')
.setThumbnail(message.guild.iconURL)
// thanks to Felix for this

message.channel.send({embed: serverinfembed}).catch(console.error);
}
module.exports.help = {
  name: "serverinfo",
  info: "Shows info on the current server",
  usage: "serverinfo"
}
