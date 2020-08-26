const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    let member = message.mentions.members.first();
    let nickname = member ? member.displayName : null;

    message.delete()

    let wl = message.guild.roles.find(r => r.name === "Whitelist");
    let aid = message.guild.roles.find(r => r.name === "Semi-Whitelist");
    let aid1 = message.guild.roles.find(r => r.name === "Aguardando entrevista");
    message.delete()
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply(" esse comando foi feito somente para STAFF's.");
    if(args[0] === null){
      message.reply("Usage: !whitelist <mencione o usuário> <nickname>");
      return;
    }
      let nick = args.join(" ").slice(22);
      if(member === null) {
        message.reply('Usuário indefinido ou inválido!')
      } else if (args[22] === null) {
        message.reply('Digite o nome do usuário, por exemplo: #1 John McGrand')
      }
      member.addRole(wl).catch(console.error);
      member.removeRole(aid).catch(console.error);
      member.removeRole(aid1).catch(console.error);
      message.guild.members.get(member.id).setNickname(nick)

     let reportEmbed = new Discord.RichEmbed()
    .addField(`Whitelist - ${message.guild.name}`, " ** **")
    .setColor("eb0606")
    .addField( "Staff", message.author)
    .addField("Nome do Personagem", nick)
    .addField("Data", message.createdAt);
    let reportschannel = message.guild.channels.find(`name`, "📌╵log-whitelist");
    if(!reportschannel) return message.channel.send("Não foi possível encontrar o canal de log. Crie o canal #📌╵log-whitelist");
    reportschannel.send(reportEmbed)

  }


module.exports.help = {
  name: "whitelist"
}