const Discord = require("discord.js");
const botconfig = require("../settings.json");
const firebase = require('firebase');

module.exports.run = async (bot, message, args) => {

    let rreason = args.join(" ").slice(0);

    /*let reportEmbed = new Discord.RichEmbed()
    .setTitle(`📌 Sugestão - ${message.guild.name}`)
    .setColor("eb0606")
    .addField("Nick: ", `${message.author}`)
    .addField("Sugestão: ", rreason)
    .addField("Horario: ", message.createdAt);*/
    const database = firebase.database();
    global.idsugestao = '';
    let increaseID = 1;
    database.ref(`Server/sugestaoid/${message.guild.id}`)
    .once('value').then(async function(snap) {
      if(snap.val() == null) {
        database.ref(`Server/sugestaoid/${message.guild.id}`)
        .set({
          id: 1
        })
      }else {
        idsugestao = snap.val().id +increaseID;
        database.ref(`Server/sugestaoid/${message.guild.id}`)
          .update({
            id: idsugestao
          })
      }

    if(args[0] == null){
      message.reply("Use: !sugestao <sugestão>");
      return;
    }

    let reportschannel = message.guild.channels.find(`name`, "🧠・sugestões");
    if(!reportschannel) return message.channel.send("Não foi possível encontrar o canal de sugestões. Crie um canal com o nome #🧠・sugestões");


    idfinal = snap.val()
    message.delete().catch(O_o=>{});
    reportschannel.send(`__**Sugestão #${snap.val().id}**__\n \n${rreason}\n \n`).then(msg => {
      msg.react("738447694766276688")
      msg.react("❌")
    })
  })
}

module.exports.help = {
  name: "sugestao"
}