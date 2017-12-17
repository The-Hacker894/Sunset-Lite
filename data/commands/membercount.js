const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  var members = message.guild.memberCount
  var onlinemembers = message.guild.presences.filter(p=>p.status == 'online').size
  var idlemembers = message.guild.presences.filter(p=>p.status == 'idle').size
  var dndmembers = message.guild.presences.filter(p=>p.status == 'dnd').size
  var offlinemembers = members - onlinemembers - idlemembers - dndmembers
  var onlinemembervsmember = onlinemembers / members
  var idlemembervsmember = idlemembers / members
  var dndmembervsmember = dndmembers / members
  var offlinemembervsmember = offlinemembers / members
var mcembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
.setTitle('Member Count')
.addField('Member Count', message.guild.memberCount,true )
.addField('Online Member Count', '`' + onlinemembers + '` / ' + '`' + members + '` [`' + Math.round(onlinemembervsmember *100) + '%`]', true)
.addField('Idle Member Count', '`' + idlemembers + '` / ' + '`' + members + '` [`' + Math.round(idlemembervsmember *100) + '%`]' ,true)
.addField('Do Not Disturb Member Count', '`' + dndmembers + '` / ' + '`' + members + '` [`' + Math.round(dndmembervsmember *100) + '%`]',true )
.addField('Offline Member Count', '`' + offlinemembers + '` / `' + members + '` [`' + Math.round(offlinemembervsmember *100) + '%`]', true)
// thanks to Felix for this
// removed 
message.channel.send({embed: mcembed}).catch(console.error);
}
module.exports.help = {
  name: "membercount",
  info: "Get the total number of members on the current server/guild",
  usage: "membercount"
}
