const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')
function botrps() {
    var rand = ['Rock','Paper','Scissors','Rock','Paper','Scissors','Rock','Paper','Scissors','Rock','Paper','Scissors','Rock','Paper','Scissors','Rock','Paper','Scissors',]
    return rand[Math.floor(Math.random()*rand.length)];
    }

module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')

const opts = ['rock', 'paper', 'scissors'];
const wins = {'scissors': 'paper', 'paper': 'rock', 'rock': 'scissors'};

var rpsitemlengtherrorembed = 'Please provide an item to *through*'

  // Credits to https://github.com/LouieK22/rps-bot/blob/master/app.js

  if (!args[1] || wins[args[1]] == null) return message.channel.send('```' + boxen(rpsitemlengtherrorembed, {padding: 1}) + '```')
  message.channel.startTyping()
  request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
    const botChoice = opts[Number(body)];


    var rpschosen = `I choose **${botChoice.toUpperCase()}**`
    var rpsiwon = `I choose **${botChoice.toUpperCase()}**\n\nI won :tada:`
    var rpswetied = `I choose **${botChoice.toUpperCase()}**\n\nWe tied :checkered_flag: `
    var rpsyouwon = `I choose **${botChoice.toUpperCase()}**\n\nYou won :flag_white: `
  
    message.channel.send('```' + boxen(rpschosen, {padding: 1}) + '```').then(message => {
      message.channel.stopTyping()

      if(wins[botChoice] == args[1]){
        message.edit('```' + boxen(rpsiwon, {padding}) + '```').then(message => {
          message.channel.stopTyping()
        })
      }else if(botChoice == args[1]){
        message.edit('```' + boxen(rpswetied, {padding: 1}) + '```').then(message => {
          message.channel.stopTyping()
        })
      }else{
        message.edit('```' + boxen(rpsyouwon, {padding: 1}) + '```').then(message => {
          message.channel.stopTyping()
        })
      }
    })
  
    
});
}
module.exports.help = {
  name: "rps",
  info: "Play RPS with Sunset",
  usage: "rps <rock|paper|scissors>"
}
