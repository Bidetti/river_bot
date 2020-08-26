const settings = require("./settings.json");
const Discord = require("discord.js");
const fs = require("fs");
const FiveM = require("fivem")
const bot = new Discord.Client({disableEveryone: false});
const firebase = require('firebase');
bot.commands = new Discord.Collection();

var firebaseConfig = {
  // Coloque aqui a conexão ao seu firebase realtime database.
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log('Database interligada com o bot.')

fs.readdir("./comandos/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Não foi possível encontrar a package: comandos.");
    return;
}

  jsfile.forEach((f, i) =>{
    let props = require(`./comandos/${f}`);
    console.log(`${f} carregado com sucesso!`);
    bot.commands.set(props.help.name, props);
  });


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = settings.prefix;
  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});
});

      /*bot.on('ready', () => {
        const srv = new FiveM.Server('177.54.152.17:30120')
        setInterval(() => srv.getPlayers().then(quantidade => bot.user.setActivity(`com ${quantidade} habitantes.`, {
            type: "PLAYING"
        })), 15000)
       
        console.log('River está online!')
    })*/
    /*bot.on("message", (message) => {
      const srv = new FiveM.Server('177.54.152.17:30120')
      if (message.content.toLowerCase().startsWith(settings.prefix + "servidor")) {
        srv.getPlayers().then(data =>
          message.channel.send(`Servidor está __**ONLINE**__ com **${data}** players.`))
      }
      
    })*/
    bot.on("ready", async () => {
      console.log(`${bot.user.username} ficou online!`);
      // bot.user.setActivity("discord.gg/VQTfGrJ", "https://twitch.tv/O_PK",  {type: "STREAMING"}); // Jogando = PLAYING | Transmitindo = STREAMING | Assistindo = WATCHING | Ouvindo = LISTENING |
      bot.user.setActivity("discord.gg/VQTfGrJ" , { type: 'STREAMING', url: 'https://twitch.tv/O_PK' })
    });

    bot.on("message", (message) => {
      if (message.content.toLowerCase().startsWith(settings.prefix + `ticket`)) {
        message.delete().catch();
  
        if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`Você ja possui um ticket aberto.`);
        var reason = message.content.split(" ").slice(1).join(" ");
      if(!reason) reason = "Não informado"
        message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
          let category = message.guild.channels.find(cz => cz.name == "Tickets" && cz.type == "category");
          if (!category) throw new Error("Categoria não existe");
          c.setParent(category.id);
          let helpmessage = new Discord.RichEmbed()
          .setColor(0xCF40FA)
          let role = message.guild.roles.find("name", "Suporte");
          let role2 = message.guild.roles.find("name", "@everyone");
          c.overwritePermissions(role, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
          });
          c.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          message.channel.send(`:white_check_mark: Seu ticket foi criado com sucesso, #${c.name} .`);
          var embed = new Discord.RichEmbed()
          .setColor(0xCF40FA)
          .setTitle('🎟️ Informações do Ticket 🎟️')
          .addField('Usuário', message.author.username)
          .addField('Assunto', reason)
          .setFooter('Dia e hora:')
          .setTimestamp()
          .setThumbnail(message.author.avatarURL);
          c.send({ embed: embed });
          c.send('<@&732014037638054041> <@&725810491641036841>  <@&690105563782184995>')
  
  
      }).catch(console.error);
  
    }
    if (message.content.toLowerCase().startsWith(settings.prefix + `fechar`)) {
      if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Você não pode usar o comando fechar fora de um canal de ticket.`);
  
      message.channel.send(`Você tem certeza? Uma vez confirmado, você não pode reverter esta ação! Para confirmar, digite !confirmar \n Isso expirará em 10 segundos e será cancelado`)
      .then((m) => {
        message.channel.awaitMessages(response => response.content === '!confirmar', {
          max: 1,
          time: 10000,
          errors: ['time'],
        })
        .then((collected) => {
            message.channel.delete();
          })
          .catch(() => {
            m.edit('O fechamento do ticket expirou, o ticket não será fechado..').then(m2 => {
            }, 3000);
          });
      });
    }
    })

    /*bot.on('raw', async dados => {
      if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !=="MESSAGE_REACTION_REMOVE") return
      if(dados.d.message_id != "741672866277490699") return
    
      let servidor = bot.guilds.get("690105396110950409")
      let membro = servidor.members.get(dados.d.user_id)
    
      let pvp = servidor.roles.get("741668083344736353"),
    
      if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.id === "738447694766276688"){
            if(membro.roles.has(pvp)) return
            membro.addRole(pvp)
        }
      }
      if(dados.t=== "MESSAGE_REACTION_REMOVE"){
        if(dados.d.emoji.id === "738447694766276688"){
            if(membro.roles.has(pvp)) return
            membro.removeRole(pvp)
        }
      }
    });*/

    bot.on('raw', async dados => {
      if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !=="MESSAGE_REACTION_REMOVE") return
      if(dados.d.message_id != "741672866277490699") return
    
      let servidor = bot.guilds.get("690105396110950409")
      let membro = servidor.members.get(dados.d.user_id)
    
      let pvp = servidor.roles.get("741668083344736353")

      if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.id === "738447694766276688"){
            if(membro.roles.has(pvp)) return
            membro.addRole(pvp)
        }
      }
      if(dados.t=== "MESSAGE_REACTION_REMOVE"){
        if(dados.d.emoji.id === "738447694766276688"){
            if(membro.roles.has(pvp)) return
            membro.removeRole(pvp)
        }
      }
    });

      
    bot.on('message', () => {
      message.guild.fetchAuditLogs({type: 'MEMBER_UPDATE', user: 'DESIRED USER ID'}).then(async (audit) => {
        let log = audit.entries.first().changes
        console.log(log)
    })
  })

bot.login(settings.token)
