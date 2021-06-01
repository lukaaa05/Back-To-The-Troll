const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('verify', 'tool', []);
  }

  async run(client, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require \`MANAGE_ROLES\` permission .");

    const verifyRole = message.guild.roles.cache.get('847452180465844245');
    const memberRole = message.guild.roles.cache.get('846797730839265350');
    const verifiedRole = message.guild.roles.cache.get('847452180465844245')

    await message.member.roles.add(verifyRole.id).catch(err => console.log(err));
    await message.member.roles.add(memberRole.id).catch(err => console.log(err));
    await message.member.roles.add(verifiedRole.id).catch(err => console.log(err));
  }
}