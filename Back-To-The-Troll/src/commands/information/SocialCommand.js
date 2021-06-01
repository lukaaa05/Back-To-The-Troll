const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SocialCommand extends BaseCommand {
  constructor() {
    super('social', 'information', []);
  }

  async run(client, message, args) {
     const discordEmbed = new Discord.MessageEmbed()
      .setTitle('Join our official *Back To The Troll* server. *So much custom roles.* *Active staff* *Friendly people*')
      .setURL('https://discord.gg/nEBKkSAvqy')
      .setThumbnail("https://cdn.discordapp.com/attachments/847170646977806349/847213963733368832/iconfinder_discord_20_5474124.png")
      .setColor("#12ccab")
      .setTimestamp()
      .setFooter("Back To The Troll" ,"https://cdn.discordapp.com/attachments/847170646977806349/847213963733368832/iconfinder_discord_20_5474124.png")

    await message.channel.send(discordEmbed).catch(err  => console.log(err));
    }
}