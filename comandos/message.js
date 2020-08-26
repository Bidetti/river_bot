const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(" esse comando foi feito somente para STAFF's.");
    if(args[0] == null){
      message.reply("Use: !message <mensagem>");
      return;
    }
    let rreason = args.join(" ").slice(0);

    
    message.channel.send(rreason);

}

module.exports.help = {
  name: "message"
}
