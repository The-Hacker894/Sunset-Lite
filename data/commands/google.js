const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const request = require("request")
const cheerio = require('cheerio')
const snekfetch = require('snekfetch')
const querystring = require('querystring')
const boxen = require("boxen")
const google = require('google')
module.exports.run = (client, message, args, data, game, announcement) => {
  message.channel.startTyping()

  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  var searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message.content.split(' ').slice(1).join(' '))}`;

  return snekfetch.get(searchUrl).then((result) => {
    var $ = cheerio.load(result.text);
    var googleData = $('.r').first().find('a').first().attr('href');
    googleData = querystring.parse(googleData.replace('/url?', ''));
    var checkOtherGoogleData = googleData.q

  const modlog = message.guild.channels.find('name', 'mod-log');
 var googlesearch = message.content.split(' ').slice(1).join(' ')
google.resultsPerPage = 1
var nextCounter = 0
 
google(googlesearch, function (err, res){
  if (err) console.error(err)
 
  for (var i = 0; i < res.links.length; ++i) {
    var link = res.links[i];
    const nsfwterms = data.nsfwterms
    var checkGoogleData = link.description
    var googlesearchresult = `Here\'s what I found for ${googlesearch}\n` +
                              `Title: ${link.title}\n` +
                              `Link: ${link.href}\n` +
                              `Description: ${link.description}\n${googleData.q}`
      var nsfwerror = `NSFW term used in non NSFW channel`
        
      if(message.channel.nsfw){
        message.channel.send('```' + boxen(googlesearchresult, {padding: 1}) + '```').then(message => {
          message.channel.stopTyping()
        })
          .catch(console.error);
        return;
        }else{
          if(nsfwterms.some(terms => checkGoogleData.includes(terms))) {
            message.channel.send('```' +  boxen(nsfwerror, {padding: 1}) + '```').then(message => {
              message.channel.stopTyping()
            })
              .catch(console.error);
            return;
          } else {
            if(nsfwterms.some(terms => checkOtherGoogleData.includes(terms))) {
              message.channel.send('```' + boxen(nsfwerror, {padding: 1}) + '```').then(message => {
                message.channel.stopTyping()
              })
                .catch(console.error);
              return;
            } else {
              message.channel.send('```' + boxen(googlesearchresult, {padding: 1}) + '```').then(message => {
                message.channel.stopTyping()
              })
                .catch(console.error);
              return;
            }
            message.channel.send('```' + boxen(googlesearchresult, {padding: 1}) + '```').then(message => {
              message.channel.stopTyping()
            })
              .catch(console.error);
            return;
          } 
        }
    
  }
 
})
  });
}
module.exports.help = {
  name: "google",
  usage: "google <searchTerm>",
  info: "Search Google"
}