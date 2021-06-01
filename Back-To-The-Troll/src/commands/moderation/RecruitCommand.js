const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RecruitCommand extends BaseCommand {
  constructor() {
    super('recruit', 'moderation', []);
  }

  async run(client, message, args) {
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have permission to use this command"); 
   if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require \`MANAGE_ROLES\` permission.");

   const pingRole = message.guild.roles.cache.get('847444920511627294');
   const staffRole = message.guild.roles.cache.get('846797589671182407');
   const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);  
   const staffPrefix = 'BTTT Staff | '

   if (!pingRole) return message.channel.send("There is no ping role to give.");
   if (!staffRole) return message.channel.send("There is no staff role to give.");
   if (!args[0]) return message.channel.send("\`<recruit @member\` or \`<recruit ID\`");
   if (!mentionedMember) return message.channel.send("The member stated is not in the server.");

   await mentionedMember.roles.add(pingRole.id).catch(err => message.channel.send(`I was unable to give the ping role due to an error: ${err}`));
   await mentionedMember.roles.add(staffRole.id).catch(err => message.channel.send(`I was unable to give the staff role due to an error: ${err}`));
   await mentionedMember.setNickname(staffPrefix + mentionedMember.user.username);
  }
}