const Discord = require("discord.js");
const firebase = require('firebase');

module.exports.run = async (bot, message, args) => {

  let reportschannel = message.guild.channels.find(`name`, "📌╵log-bugreport");
  if(!reportschannel) return message.channel.send("Não foi possível encontrar o canal de bugs. Crie um canal com o nome #📌╵log-bugreport");

    if(args[0] == null){
      message.reply("Use: !bugs <mensagem>");
      return;
    }

    if(args[0] == "ajuda"){
        message.reply("Use: !duvida <escreve de uma forma concreta a sua dúvida.>");
        return;
      }
      let rreason = args.join(" ").slice(0);
      const database = firebase.database();
      global.idbug = '';
      let increaseID = 1;
      database.ref(`Server/bugid/${message.guild.id}`)
      .once('value').then(async function(snap) {
        if(snap.val() == null) {
          database.ref(`Server/bugid/${message.guild.id}`)
          .set({
            id: 1
          })
        }else {
          idbug = snap.val().id +increaseID;
          database.ref(`Server/bugid/${message.guild.id}`)
            .update({
              id: idbug
            })
        }

    /*let reportEmbed = new Discord.RichEmbed()
    .addField(`📌 Bug(s) - ${message.guild.name}`, " ** **")
    .setColor("eb0606")
    .addField("Usuário que reportou o bug: ", `${message.author}`)
    .addField("Horario: ", message.createdAt)
    .addField("Bug:", rreason);*/


    message.delete().catch(O_o=>{});
    reportschannel.send(`__**Bug Report #${snap.val().id}**__\n \n${rreason}\n \nReportado por: ${message.author}`).then(msg => {
      msg.react("738447694766276688")
      msg.react("❌")
    })
  })
}

module.exports.help = {
  name: "bug"
}
