const Discord = require("discord.js");
const firebase = require('firebase');

module.exports.run = async (bot, message, args) => {

  let reportschannel = message.guild.channels.find(`name`, "📌╵log-userreport");
  if(!reportschannel) return message.channel.send("Não foi possível encontrar o canal de reports. Crie um canal com o nome #📌╵log-userreport");

    if(args[0] == null){
      message.reply("Use: !reportar <motivo>");
      return;
    }
    let rreason = args.join(" ").slice(0);
    const database = firebase.database();
    global.idreport = '';
    let increaseID = 1;
    database.ref(`Server/reportid/${message.guild.id}`)
    .once('value').then(async function(snap) {
      if(snap.val() == null) {
        database.ref(`Server/reportid/${message.guild.id}`)
        .set({
          id: 1
        })
      }else {
        idreport = snap.val().id +increaseID;
        database.ref(`Server/reportid/${message.guild.id}`)
          .update({
            id: idreport
          })
      }

    /*let reportEmbed = new Discord.RichEmbed()
    .addField(`📌 Report - ${message.guild.name}`, " ** **")
    .setColor("eb0606")
    .addField("Denunciado por: ", `${message.author}`)
    .addField("Motivo:", rreason)
    .setFooter(`Horário: " ${message.createdAt}`); */


    message.delete().catch(O_o=>{});
    reportschannel.send(`__**User Report #${snap.val().id}**__\n \n${rreason}\n \nDenunciado por: ${message.author}`).then(msg => {
      msg.react("738447694766276688")
      msg.react("❌")
    })
  })
}

module.exports.help = {
  name: "reportar"
}
