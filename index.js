const Discord = require("discord.js");
const RichEmbed = require("discord.js").RichEmbed;
const client = new Discord.Client({autoReconnect:true});
const data = require("./data/brain/data.json");
const announcement = require("./data/brain/announcement.json");
const game = require("./data/brain/game.json");
const fs = require("fs");
const prefix = data.prefix
const request = require("request")
const pusage = require('pidusage')
const requestpn = require("request-promise-native")
const DBLToken = data.dbltoken
const moment = require('moment')

const botjoinembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('From Sunrise to Sunset I\'ll be there to bring you a fun experience')
  .setDescription('Thank you for inviting Sunset to your server. \n I want you to know that I am **always** recieving updates so you may see some new features pop up here and there.')
  .addField('**Here is the current Announcement**', '```' + announcement.announce + '```')
  .addField('**Current Version**', '```' + data.newversion + '```')

var dataPath = './data/'
var base64filesPath = './data/base64files/'
var binaryfilesPath = './data/binaryfiles/'
var qrcodePath = './data/qrcode/'
var scriptsPath = './data/scripts/'
var textfilesPath = './data/textfiles/'

if (!fs.existsSync(dataPath)) {
 console.log('Could not find the ./data/ folder')
 process.exit(0)
}
if (!fs.existsSync(base64filesPath)) {
console.log('Could not find the ./data/base64files/ folder')
process.exit(0)
}
if (!fs.existsSync(binaryfilesPath)) {
console.log('Could not find the ./data/binaryfiles/ folder')
process.exit(0)
}
if (!fs.existsSync(qrcodePath)) {
console.log('Could not find the ./data/qrcode/ folder')
process.exit(0)
}
if (!fs.existsSync(scriptsPath)) {
console.log('Could not find the ./data/scripts/ folder')
process.exit(0)
}
if (!fs.existsSync(textfilesPath)) {
console.log('Could not find the ./data/textfiles/ folder')
process.exit(0)
}

client.on("message", (message) => {

  const args = message.content.split(" ");
  const command = message.content.split(" ")[0]
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  if(!command.startsWith(prefix)) return;
  const cmd = client.commands.get(command.slice(prefix.length))
  if(cmd)
    cmd.run(client, message, args, data, game, announcement)
})
    client.on("message", (message) => {
      if(message.content.startsWith(`<@${client.user.id}>`)) {
        var mentionedembed = new Discord.RichEmbed()
          .setColor(data.embedcolor)
          .setTitle('Prefix')
          .setDescription('```' + prefix + '```')
          message.channel.send({embed: mentionedembed})
      }
    })
    client.on("message", function(message) {
      var guild = message.guild
      if (!fs.existsSync(`./data/serverdata/${guild.id}`)) {
        fs.mkdirSync(`./data/serverdata/${guild.id}`);
     }
     if (!fs.existsSync(`./data/serverdata/${guild.id}/base64`)) {
      fs.mkdirSync(`./data/serverdata/${guild.id}/base64`);
    }
    if (!fs.existsSync(`./data/serverdata/${guild.id}/binary`)) {
    fs.mkdirSync(`./data/serverdata/${guild.id}/binary`);
    }
    if (!fs.existsSync(`./data/serverdata/${guild.id}/qrcode`)) {
    fs.mkdirSync(`./data/serverdata/${guild.id}/qrcode`);
    }  
    if (!fs.existsSync(`./data/serverdata/${guild.id}/text`)) {
    fs.mkdirSync(`./data/serverdata/${guild.id}/text`);
    }
    if (!fs.existsSync(`./data/serverdata/${guild.id}/warns`)) {
      fs.mkdirSync(`./data/serverdata/${guild.id}/warns`);
      }
    })
    client.commands = new Discord.Collection();
  fs.readdir("./data/commands", (err, files) => {
    if(err) console.error(err)
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if(jsFiles.length <= 0) {
      console.log("No commands loaded")
      return;
    }
    console.log('[Commands Loaded] ' + jsFiles.length)

    jsFiles.forEach((f, i) => {
      const props = require("./data/commands/" + f)
      client.commands.set(props.help.name, props)
    })
  })
      client.on("ready", () => {
        console.log('[Logged in] ' + client.user.tag)
    console.log('[Time] ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
    console.log('[Announcement] ' + announcement.announce)
        pusage.unmonitor(process.pid)
        requestpn.post({
          uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
          headers: {
              Authorization: DBLToken,
          },
          json: true,
          body: {
              server_count: client.guilds.size,
          },
      });
      });
      client.on("guildDelete", guild => {
        console.log('Removed from 1 server | ' + guild)
          requestpn.post({
                uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
                headers: {
                    Authorization: DBLToken, // Insert token here
                },
                json: true,
                body: {
                    server_count: client.guilds.size,
                },
           }); 
    
      });
      client.on("guildCreate", guild => {
        guild.owner.send({embed: botjoinembed}).catch(console.error);
           requestpn.post({
                  uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
                  headers: {
                      Authorization: DBLToken, // Insert token here
                  },
                  json: true,
                  body: {
                      server_count: client.guilds.size,
                  },
              });
              if (!fs.existsSync(`./data/serverdata/${guild.id}`)) {
                fs.mkdirSync(`./data/serverdata/${guild.id}`);
             }
             if (!fs.existsSync(`./data/serverdata/${guild.id}/base64`)) {
              fs.mkdirSync(`./data/serverdata/${guild.id}/base64`);
            }
            if (!fs.existsSync(`./data/serverdata/${guild.id}/binary`)) {
            fs.mkdirSync(`./data/serverdata/${guild.id}/binary`);
            }
            if (!fs.existsSync(`./data/serverdata/${guild.id}/qrcode`)) {
            fs.mkdirSync(`./data/serverdata/${guild.id}/qrcode`);
            }  
            if (!fs.existsSync(`./data/serverdata/${guild.id}/text`)) {
            fs.mkdirSync(`./data/serverdata/${guild.id}/text`);
            }

      });

      
    
    client.login(data.token)
    