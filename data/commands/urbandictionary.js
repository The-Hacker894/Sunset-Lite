const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
const urbandictsearch = message.content.split(' ').slice(1).join(' ')
webdict('urbandictionary', urbandictsearch).then(resp => {
  var nsfwterms = ['porn', 'hentai', 'pron', 'ass', 'fuck', 'piss', 'penis', 'vagina']
  var defcheck = resp.definition
  message.channel.startTyping()
    if(!resp.definition) return message.channel.send('```' + boxen('No Urban Dictionary Entry for ' + urbandictsearch, {padding: 1}) +'```')
    if(urbandictsearch.length < 1) return message.channel.send('```' + boxen('You must provide a word to search for', {padding: 1}) +'```')
    if(message.channel.nsfw) {
      message.channel.send('```' + boxen('Word: ' + urbandictsearch + '\nDefinition: ' + resp.definition + '\nType: ' + resp.type + '\nSource: ' + resp.source, {padding: 1}) + '```')      
    } else {
      if(nsfwterms.some(terms => defcheck.includes(terms))) {
        message.channel.send('```' + boxen('NSFW term used in non NSFW channel', {padding: 1}))
      } else {
        message.channel.send('```' + boxen('Word: ' + urbandictsearch + '\nDefinition: ' + resp.definition + '\nType: ' + resp.type + '\nSource: ' + resp.source, {padding: 1}) + '```')              
      }        
    }
          message.channel.stopTyping()
  });
}
module.exports.help = {
  name: "urbandictionary",
  info: "Get the Urban Dictionary Definition of a word",
  usage: "urbandictionary <word>"
}
