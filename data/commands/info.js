const prettyMs = require('pretty-ms');
const pusage = require('pidusage')
const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
const boxen = require("boxen")
const PythonShell = require('python-shell');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
let total = 0;
client.guilds.map(g => total += g.memberCount)
  pusage.stat(process.pid, function (err, stat) {
    const cpuusage = parseFloat(Math.round(stat.cpu * 100) / 100).toFixed(2)
    const memusage = parseFloat(Math.round(stat.memory / 1000000 * 100) / 100).toFixed(2)

    PythonShell.run('./data/scripts/temp.py',/* options,*/ function (err, results) { 

      var toMultiply = parseFloat(9/5)
      var toConvert = parseFloat(results)
      var stage1Convert = parseFloat(toConvert * toMultiply)
      var stage2Convert = parseFloat(stage1Convert + 32)
      var convertedTemp = parseFloat(stage2Convert.toFixed(2))
      var kelvin1Temp = parseFloat(toConvert + 273.15)
      var kelvin2Temp = parseFloat(kelvin1Temp.toFixed(2))

var infosembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Sunset Lite Info')
    .setDescription('Thanks for checking out Sunset Lite :)')
    .addField('Announcement', announcement.announce, true)
    .addField('Owner', '`' + client.users.get('270375857384587264').username + '#' + client.users.get('270375857384587264').discriminator + '`', true)
    .addField('Host', '[Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)', true)
    .addField('Library', '[' + data.library + '](https://discord.js.org/)', true )
    .addField('Language', '[' + data.language + '](https://nodejs.org/)', true)
    .addField('Uptime', prettyMs(client.uptime, {verbose: true}), true)
    .addField('CPU Usage', cpuusage + '%', true)
    .addField('Memory Usage', memusage + 'MB', true)
    .addField('Server Temperature', `${results} ${convertedTemp}'F, ${kelvin2Temp}K`, true)
    .addField('Total Members', total, true)
    .addField('Invite', '[Sunset Lite Invite](https://hacker-hub.com/sunset-lite/invite)', true)
    .addField('Full Version', '[Sunset Invite](https://hacker-hub.com/sunset/invite)', true)
    .addField('Website', '[Sunset Lite Website](https://hackerhubsite.weebly.com/sunset-lite/) | [HackerWebServer](https://corporal-cormorant-6710.dataplicity.io/)' /*'[Sunset Website](https://skydevpage.weebly.com/sunset.html)'*/,true)
    .addField('Server Count', client.guilds.size, true)
    .addField('Version', data.newversion, true)
    .setThumbnail(client.user.displayAvatarURL)
    //.setImage('https://i.imgur.com/ZfQo3rY.gif')
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    // removed 


    message.channel.send({embed: infosembed}).then( () => {
      pusage.unmonitor(process.pid)
    })
  });    
});
}
module.exports.help = {
  name: "info",
  info: "Get info on Sunset",
  usage: "info"
}
