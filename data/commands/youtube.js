const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const request = require("request")
const cheerio = require('cheerio')
const snekfetch = require('snekfetch')
const querystring = require('querystring')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  message.channel.startTyping()

  const ytsimplegooglesearch = message.content.split(' ').slice(1).join(' ')
  const ytsearch = 'www.youtube.com/watch?=' + message.content.split(' ').slice(1).join(' ')
  const youtubesearchUrl = `https://www.google.com/search?q=${encodeURIComponent(ytsearch)}`;
  if(ytsimplegooglesearch.length < 1)  return message.channel.send('```' + boxen('You must provide something to search for', {padding: 1}) +'```')

  return snekfetch.get(youtubesearchUrl).then((result) => {
    var $ = cheerio.load(result.text);

    var youtubegoogleData = $('.r').first().find('a').first().attr('href');
    youtubegoogleData = querystring.parse(youtubegoogleData.replace('/url?', ''));
    var nsfwterms = ['porn', 'hentai', 'pron', 'ass', 'fuck', 'piss', 'penis', 'vagina']    
    var ytcheck = youtubegoogleData.q
      if(message.channel.nsfw) {
        message.channel.send('Here\'s what I found for \n*'  + ytsimplegooglesearch + '*\n' + youtubegoogleData.q)
      } else {
        if(nsfwterms.some(terms => ytcheck.includes(terms))) {
          message.channel.send('```' + boxen('NSFW Terms used in Non-NSFW Channel', {padding: 1}) + '```')
        } else {
          message.channel.send('Here\'s what I found for \n*'  + ytsimplegooglesearch + '*\n' + youtubegoogleData.q)          
        }
      }
});
}
module.exports.help = {
  name: "youtube",
  info: "Search Youtube",
  usage: "youtube <search_term>"
}
