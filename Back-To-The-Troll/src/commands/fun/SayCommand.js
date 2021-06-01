const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'fun', []);
  }

  async run(client, message, args) {
    const MessageToSay = args.join(" ");
    const sayEmbed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} says: ${MessageToSay}`)
      .setFooter(message.author.tag ,message.author.displayAvatarURL())
      .setColor("#a2d0c3")
      .setTimestamp();
    try {
      await message.channel.send(sayEmbed);
      message.delete();
    } catch (err) {
      console.log(err);
      message.channel.send('I am not able to say that message.');
    }
  }
}