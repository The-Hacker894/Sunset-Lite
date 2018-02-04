const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const translate = require('translate')
module.exports.run = (client, message, args, data, game, announcement) => {
    message.channel.startTyping()
    var lang =  args[1]
    var tmsg = message.content.split(lang).slice(1).join(' ')
    const langs = ['aa','ab','ae','af','ak','am','an','ar','as','av','ay','az','ba','be','bg','bh','bi','bm','bn','bo','bs','ca','ce','ch','co','cr','cs','cu','cv','cy','da','de','dv','dz','ee','el','en','eo','es','et','eu','fa','ff','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','gv','ha','he','hi','ho','hr','ht','hu','hy','hz','ia','id','ie','ig','ii','ik','io','is','it','iu','ja','jv','ka','kg','ki','kj','kk','kl','km','kn','ko','kr','ks','ku','kv','kw','ky','la','lb','lg','li','ln','lo','lt','lu','lv','mg','mh','mi','mk','ml','mn','mr','ms','mt','my','na','nb','nd','ne','ng','nl','nn','no','nr','nv','ny','oc','oj','om','or','os','pa','pi','pl','ps','pt','qu','rm','rn','ro','ru','rw','sa','sc','sd','se','sg','si','sk','sl','sm','sn','so','sq','sr','ss','st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tn','to','tr','ts','tt','tw','ty','ug','uk','ur','uz','ve','vi','vo','wa','wo','xh','yi','yo','za','zh','zu']

    var translate = require('translate')
    translate.engine = 'yandex';
    translate.key = data.translateKey
    var tmsgerror = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Translate Error')
        .setDescription('The message you provided has brought up an unexpected error')
    var langerror = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('ISO 639-1 Language Code Error')
        .setDescription('You must provide a ISO 639-1 Language Code to translate. [This link may help you](https://www.loc.gov/standards/iso639-2/php/code_list.php)')
    
    if(!tmsg) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1})  + '```\nThis link may help you\nhttps://www.loc.gov/standards/iso639-2/php/code_list.php').then(message => {
        message.channel.stopTyping()
    })
    if(!lang) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1}) + '```\nThis link may help you\nhttps://www.loc.gov/standards/iso639-2/php/code_list.php').then(message => {
        message.channel.stopTyping()
    })
    if(lang < 2) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1}) + '```\nThis link may help you\nhttps://www.loc.gov/standards/iso639-2/php/code_list.php').then(message => {
        message.channel.stopTyping()
    }) 
  /*  if(lang > 2) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1}) + '```\nThis link may help you\nhttps://www.loc.gov/standards/iso639-2/php/code_list.php').then(message => {
        message.channel.stopTyping()
    }) */
    if(langs.some(languages => lang.includes(languages))) {
    translate(tmsg, lang).then(text => {
        
        if(text.length > 2000) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1})  + '```\nThis link may help you\nhttps://www.loc.gov/standards/iso639-2/php/code_list.php').then(message => {
            message.channel.stopTyping()
        })
        message.channel.send(text).then(message => {
            message.channel.stopTyping()
            console.log(boxen('[Translate] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
        })
      }).catch(console.error);
    } else {
        message.channel.send({embed: langerror})
    }
    

}
module.exports.help = {
    name: "translate",
    usage: "translate <language_code> <text>",
    info: "Translate from english to any language."
}