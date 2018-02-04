const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')

const opts = ['*It is certain*','*It is decidedly so*','*Without a doubt*','*Yes definitely*','*You may rely on it*','*As I see it, yes*','*Most likely*','*Outlook good*','*Yes*','*Signs point to yes*','*Reply hazy try again*','*Ask again later*','*Better not tell you now*','*Cannot predict now*','*Concentrate and ask again*','*Don\'t count on it*','*My reply is no*','*My sources say no*','*Outlook not so good*','*Very doubtful*']
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
var questionembed = 'You must provide a question to ask'

let question = message.content.split(' ').slice(1).join(' ')

request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
if(question.length < 1) return message.channel.send('```' + boxen(questionembed, {padding: 1}) +'```').catch(console.error);
const botChoice = opts[Number(body)];


console.log(boxen('[8Ball]' + message.guild.name + ' | ' + message.author.tag + ' | ' + question + ' | ' +botChoice , {padding: 1}));
var eightballed = ':8ball: ' + botChoice
  message.channel.send('```' + boxen(eightballed, {padding: 1}) +'```')
});
}
module.exports.help = {
  name: "8ball",
  info: "Have your questions answered by the mystical 8Ball",
  usage: "8Ball <question>"
}
