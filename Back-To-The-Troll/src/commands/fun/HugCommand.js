const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const Math = require('mathjs');

module.exports = class HugCommand extends BaseCommand {
  constructor() {
    super('hug', 'fun', []);
  }

  async run(client, message, args) {
    const fetch = require("node-fetch");
    let HUser =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args[1]) ||
      message.author;
    const hugEmbed = new Discord.MessageEmbed()
      .setFooter(`Requested By: ${message.author.tag}`,message.author.avatarURL({ dynamic: true }))
      .setColor("#6441a5")
      .setDescription(`${message.author} Had Hugged ${HUser}`)
      .setTimestamp();

    const { url } = await fetch("http://ram.gamearoo.top/api/hug")
      .then((res) => res.json())
      .catch((err) => {
        message.reply(`http://ram.gamearoo.top/api is not responding!`);

        return;
      });
    hugEmbed.setImage(url);

    message.channel.send(hugEmbed);
  }
};