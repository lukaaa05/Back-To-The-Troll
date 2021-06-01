const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have permission to use this command.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require \`MANAGE_ROLES\` permission to mute.");

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('847490950270812160');
    const memberRole = message.guild.roles.cache.get('846797730839265350');
    const mentionedMember = message.mentions.members.first();
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been unmuted in ${message.guild.name}`)
      .setDescription(`Reason for being unmuted: ${reason}.`)
      .setColor("#0a5569")
      .setTimestamp();

    if (!args[0]) return message.channel.send('\`<unmute @member reason\`');
    if (!mentionedMember) return message.channel.send("The member stated is not in the server.");
    if (mentionedMember.user.id == message.author.id) return message.channel.send("You cannot mute yourself.");
    if (mentionedMember.user.id == client.user.id) return message.channel.send("You cannot mute me with my own command.");
    if (!reason) reason = 'No reason given';
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send("This member is already unmuted");
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send("You cannot unmute someone with the same role or higher role than your.");

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send("There was the issue giving the member role.")));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send("There was the issue removing the mute role.")));
  }
}