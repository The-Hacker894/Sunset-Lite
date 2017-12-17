const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
function do2ballVoodoo() {
  var rand = ['*Yes*','*No*','*Yes*','*No*','*Yes*','*No*','*Yes*','*No*']
  return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  let question = message.content.split(' ').slice(1).join(' ')
  if(question.length < 1) return message.channel.send('```' + boxen('Please provide a question for the 2ball', {padding: 1}) + '```').catch(console.error);
  message.channel.send(':two: :basketball: ' + do2ballVoodoo());
  console.log(boxen(message.guild.name + ' | ' + question + ' | ' + do2ballVoodoo(), {padding: 1}))
}
module.exports.help = {
  name: "2ball",
  info: "Have your questions answered by the mystical 2Ball",
  usage: "2Ball <question>"
}
