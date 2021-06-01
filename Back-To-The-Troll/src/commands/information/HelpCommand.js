const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'tool', []);
  }

  async run(client, message, args) {
    const sectionEmbed = new Discord.MessageEmbed()
   .setTitle('Bot Help Sections')
   .setDescription('Use <help sectionName to access another section.\nSections:\ninformation\nfun\nmoderation\ntool')
   .addField('Fun Commands', 'Commands that all users can user that are for fun and have no purpose.')
   .addField('Information commands', 'Commands that return some form of important imformation.')
   .addField('Moderation commands', 'Commands that are for moderation purposes within a server.')
   .addField('Tool commands', 'Commands that add features to a server.')
   .setFooter(client.user.tag, client.user.displayAvatarURL());
 
const infoEmbed = new Discord.MessageEmbed()  
   .setTitle('Information Commands.')
   .addField('Help Commands', 'This commands shows the user all the commands possible.')
   .addField('Social Command', 'Displays social media in an embed.');
 
const funEmbed = new Discord.MessageEmbed()
   .setTitle('Fun Commands.')
   .addField('Avatar Command', 'Returns a users avatar')
   .addField('Meme Commands', 'Returns a Meme to the channel')
   .addField('Say Command', 'Make the bot say a message to the channel')
   .addField('Snipe Command', 'Returns the last deleted message within a channel')
   .addField('Hug Command', 'Hug the user')
   .addField('Nickname Command', 'Change your nickname')
   .addField('Rps Command', 'Rock, paper, scissors game')
   .addField('Suggest Command', 'Suggest command if you have any ides for server');
 
const moderationEmbed = new Discord.MessageEmbed()
   .setTitle('Moderation Commands.')
   .addField('Ban Command', 'Bans a member from the server')
   .addField('Kick Command', 'Kicks a member from the server')
   .addField('Lock Command', 'Locks a channel in the server')
   .addField('Mute Command', 'Mutes a member in the server')
   .addField('Nickname Command', 'Changes a members nickname in a server')
   .addField('Nuke Command', 'Clones a channel and deletes the old one')
   .addField('Delete Command', 'Deletes messages within a channel')
   .addField('Recruit Command', 'Recruits a member to the trainee helper in a server')
   .addField('Tempban Command', 'Tempbans a member from the server')
   .addField('Tempmute Command', 'Tempmutes a member in a server')
   .addField('Unban Command', 'Unbans a member from the server')
   .addField('Unlock Command', 'Unlocks a channel in the server')
   .addField('Unmute Command', 'Unmutes a member in a server')
   .addField('AddRole Command', 'Add specific role to a taged user')
 
const toolEmbed = new Discord.MessageEmbed()
   .setTitle('Tool Commands.')
   .addField('Verify Command', 'Gives the user the member role for the server.');
 
if (!args[0]) return message.channel.send(sectionEmbed);
if (args[0] == 'information') return message.channel.send(infoEmbed);
else if (args[0] == 'fun') return message.channel.send(funEmbed);
else if (args[0] == 'tool') return message.channel.send(toolEmbed);
else if (args[0] == 'moderation') return message.channel.send(moderationEmbed);
  }
}