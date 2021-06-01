const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have permission to use this command.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require \`MANAGE_ROLES\` permission to mute.");

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('847490950270812160');
    const memberRole = message.guild.roles.cache.get('846797730839265350');
    const mentionedMember = message.mentions.members.first();
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason for being muted: ${reason}`)
      .setColor("#0a5569")
      .setTimestamp();

    if (!args[0]) return message.channel.send('\`<mute @member reason\`');
    if (!mentionedMember) return message.channel.send("The member stated is not in the server.");
    if (mentionedMember.user.id == message.author.id) return message.channel.send("You cannot mute yourself.");
    if (mentionedMember.user.id == client.user.id) return message.channel.send("You cannot mute me with my own command.");
    if (!reason) reason = 'No reason given';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send("This member is already muted");
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send("You cannot mute someone with the same role or higher role than your.");

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send("There was the issue giving the mute role.")));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send("There was the issue removing the member role.")));

  }
}