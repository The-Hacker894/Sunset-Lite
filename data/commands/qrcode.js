const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const qr = require("qr-image")
const talkedRecently = new Set();
module.exports.run = (client, message, args, data, game, announcement) => {
    if (talkedRecently.has(message.author.id))
    return;
  
  // Adds the user to the set so that they can't talk for 2.5 seconds
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after 2.5 seconds
    talkedRecently.delete(message.author.id);
  }, 1150);
message.channel.startTyping()
var qrtext = message.content.split(' ').slice(1).join(' ')
if(qrtext.length < 1) return message.channel.send('Please provide text to transform into a QR Code')
var qr_svg = qr.image(qrtext, { type: 'png' });
qr_svg.pipe(require('fs').createWriteStream(`./data/serverdata/${message.guild.id}/qrcode/${message.author.id}.png`))
var svg_string = qr.imageSync(qrtext, { type: 'png' });
setTimeout(Timer, 1000);
function Timer() {
    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/qrcode/${message.author.id}.png`, `qrcode.png`)).then(message => {
        message.channel.stopTyping()
    });
}
    console.log(boxen('[QRCode] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))

}
module.exports.help = {
    name: "qrcode",
    info: "Generate a QR Code",
    usage: "qrcode <text>"
}