const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
function doMagic8BallVoodoo() {
var rand = ['*It is certain*','*It is decidedly so*','*Without a doubt*','*Yes definitely*','*You may rely on it*','*As I see it, yes*','*Most likely*','*Outlook good*','*Yes*','*Signs point to yes*','*Reply hazy try again*','*Ask again later*','*Better not tell you now*','*Cannot predict now*','*Concentrate and ask again*','*Don\'t count on it*','*My reply is no*','*My sources say no*','*Outlook not so good*','*Very doubtful*'];

return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 

let question = message.content.split(' ').slice(1).join(' ')
if(question.length < 1) return message.channel.send('```' + boxen('Please provide a question for the 8ball', {padding: 1}) + '```').catch(console.error);
console.log(boxen(message.guild.name + ' | ' + question + ' | ' + doMagic8BallVoodoo(), {padding: 1}));
message.channel.send(':8ball: ' + doMagic8BallVoodoo());
}
module.exports.help = {
  name: "8ball",
  info: "Have your questions answered by the mystical 8Ball",
  usage: "8Ball <question>"
}
