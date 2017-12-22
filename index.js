const Discord = require("discord.js");
const RichEmbed = require("discord.js").RichEmbed;
const client = new Discord.Client();
const data = require("./data/brain/data.json");
const announcement = require("./data/brain/announcement.json");
const game = require("./data/brain/game.json");
const fs = require("fs");
const prefix = data.prefix
const request = require("request")
const pusage = require('pidusage')
const requestpn = require("request-promise-native")
const DBLToken = data.dbltoken

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
      var Attachment = (message.attachments).array();
      Attachment.forEach(function(attachment) {
        console.log(attachment.url);
      })
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
        console.log('Logged on as ' + client.user.tag)
        console.log('[Game] ' + game.game)
        console.log('[Announcement] ' + announcement.announce)
        client.user.setGame(game.game + ' | ' + data.prefix + 'help' )
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
            client.user.setGame(game.game + ' | ' + data.prefix + 'help' )
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

      
    
    client.login(data.token)
    