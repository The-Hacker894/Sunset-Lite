const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const writeFile = require("write")
const talkedRecently = new Set();
module.exports.run = (client, message, args, data, game, announcement) => {
    if (talkedRecently.has(message.author.id))
    return;
  
  // Adds the user to the set so that they can't talk for 2.5 seconds
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after 2.5 seconds
    talkedRecently.delete(message.author.id);
  }, 1650);
    const modlog = message.guild.channels.find('name', 'mod-log');
message.channel.startTyping()
var text = message.content.split(' ').slice(1).join(' ')
if(text.length < 1) return message.channel.send('Please provide text to write')
writeFile(`./data/serverdata/${message.guild.id}/textfiles/${message.author.id}.txt`, text, function(err) {
    if (err) console.log(err);
  });
setTimeout(Timer, 1500);
function Timer() {
    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/textfiles/${message.author.id}.txt`, `textfile.txt`)).then(message => {
        message.channel.stopTyping()
    });
}
    console.log(boxen('[Create Text] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
var qrcodemlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Create Text Command Used')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
if(modlog) return modlog.send({embed: qrcodemlembed})

}
module.exports.help = {
    name: "createtxt",
    info: "Creates a text file",
    usage: "createtxt <text>"
}