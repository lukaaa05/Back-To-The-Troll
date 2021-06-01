const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class AddroleCommand extends BaseCommand {
  constructor() {
    super('addrole', 'moderation', []);
  }

  async run(client, message, args) {
    // <addrole @member @role
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have permission to use this commmand.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel("I require \`MANAGE_ROLES\` permission to change users roles.");

    const mentionedMember = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!args[0]) return message.channel.send("You must state a member to give a role to along with the role you want to give.");
    if(!mentionedMember) return message.channel.send("The member stated is not in the server.");
    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You cannot add roles to this user as their role is same or higher than yours.");
    if (!args[1]) return message.channel.send("You must state a role to give to the member mentioned.");
    if(!role) return message.channel.send("The role stated does not exist.");
    if (message.member.roles.highest.position <= role.position) return message.channel.send("You cannot give this role as it is same or above your current highest role.");

    await mentionedMember.roles.add(role.id).catch(err => console.log(err));
  }
}