const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let totalSeconds = (bot.uptime / 1000);
let horas = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutos = Math.floor(totalSeconds / 60);
let duracao = `${horas} horas e ${minutos} minutos`;

      const uptime = new Discord.RichEmbed()
      .setTitle("Uptime | Estatisticas de River BOT")
      .addField("Memória usada", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline="true")
      .addField("Tempo online", duracao, inline="true")
      .setFooter('© River')
      message.channel.send(uptime)
}
      module.exports.help = {
        name: "uptime"
}