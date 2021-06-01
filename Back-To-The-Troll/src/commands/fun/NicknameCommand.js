const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('nickname', 'fun', []);
  }

  async run(client, message, args) {
    // <nickname @member nickname
    // Permission Chencking: 
    if (!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send("You cannot use this command.");
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I require \`MANAGE_NICKNAMES\` permission to change nicknames."); 

    // Variables:
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join(" ");

    // Input Chencking:
    if (!args[0]) return message.channel.send("You must state a member to change a nickname.");
    if (!mentionedMember) return message.channel.send("The member stated is not in the server.");
    if (!nickName) return message.channel.send("You must state a nickname for the member.");
    if (!mentionedMember.kickable) return message.channel.send("I cannot change that members nickname as their roles is higher than mine.");

    // Executing: 
    await mentionedMember.setNickname(nickName).catch(err => console.error(err) && message.channel.send("Hey I cannot add that nickname due to an error. Make sure nickname is max 32 characters long."));

  }
}