const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const request = require("request")
const cheerio = require('cheerio')
const snekfetch = require('snekfetch')
const querystring = require('querystring')
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 

let googlesearch = message.content.split(' ').slice(1).join(' ')
let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message.content.split(' ').slice(1).join(' '))}`;
if(googlesearch.length < 1)  return message.channel.send('```' + boxen('You must provide something to search for', {padding: 1}) + '```')
message.channel.startTyping()

return snekfetch.get(searchUrl).then((result) => {
  var $ = cheerio.load(result.text);
  var googleData = $('.r').first().find('a').first().attr('href');
  googleData = querystring.parse(googleData.replace('/url?', ''));
  message.channel.send('**Here\'s what I found for**\n' + googlesearch + '\n\n ' + googleData.q).catch(console.error);
  console.log(message.guild.name + " | " + message.author.username + ' | ' + googlesearch + ' | ' + `${googleData.q}`)
    message.channel.stopTyping()
});
}
module.exports.help = {
  name: "google",
  info: "Search Google",
  usage: "google <search_term>"
}
