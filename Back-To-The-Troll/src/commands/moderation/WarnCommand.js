const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super("warn", "moderation", []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You do not have permission to use this command."
      );
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        "I require `MANAGE_ROLES` permission to manage a users warnings."
      );

    const warnRole1 = message.guild.roles.cache.find((role) => role.name == "[Warning: 1]");
    const warnRole2 = message.guild.roles.cache.find((role) => role.name == "[Warning: 2]" );
    const warnRole3 = message.guild.roles.cache.find((role) => role.name == "[Warning: 3]");
    const mendtionedMember =message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    let punishment = 1;
    let reason = args.slice(2).join(" ");

    if (!warnRole1) await message.guild.roles.create({
          data: {
            name: "[Warning: 1]",
            color: "GREY",
          },
        }).catch((err) => console.log(err));

    if (!warnRole2) await message.guild.roles.create({
          data: {
            name: "[Warning: 2]",
            color: "GREY",
          },
        }).catch((err) => console.log(err));

    if (!warnRole3) await message.guild.roles.create({
          data: {
            name: "[Warning: 3]",
            color: "GREY",
          },
        }).catch((err) => console.log(err));

    //<warn @member
    if (!args[0]) return message.channel.send("You need to state a member along with just checking, adding or removing warnings.");
    if (!mendtionedMember)return message.channel.send("The member stated is not in the server.");
    if (!reason) reason = 'No reason provided.';

    if (mendtionedMember.roles.cache.has(warnRole1.id)) punishment = 2;
    if (mendtionedMember.roles.cache.has(warnRole2.id)) punishment = 3;
    if (mendtionedMember.roles.cache.has(warnRole3.id)) punishment = 4;

    if (!["add", "remove"].includes(args[1])) {
      if (punishment == 1) {
        return message.channel.send(`${mendtionedMember.user.tag} has one warning.`);
      } else if (punishment == 2) {
        return message.channel.send(`${mendtionedMember.user.tag} has two warnings.`);
      } else if (punishment == 3) {
        return message.channel.send(`${mendtionedMember.user.tag} has three warnings.`);
      } else if (punishment == 4) {
        return message.channel.send(`${mendtionedMember.user.tag} has three warnings.`);
      }
    } else {
      if (args[1] == "add") {
        if (punishment == 1) {
          await mendtionedMember.roles.add(warnRole1.id).catch(err => console.log(err));
          return message.channel.send(`${mendtionedMember}, you have been warned for: ${reason}`);

        } else if (punishment == 2) {
          await mendtionedMember.roles.add(warnRole2.id).catch(err => console.log(err));
          await mendtionedMember.roles.remove(warnRole1.id).catch(err => console.log(err));
          return message.channel.send(`${mendtionedMember}, you have been warned for: ${reason}`);
          
        } else if (punishment == 3) {
          await mendtionedMember.roles.add(warnRole3.id).catch(err => console.log(err));
          await mendtionedMember.roles.remove(warnRole2.id).catch(err => console.log(err));
          return message.channel.send(`${mendtionedMember}, you have been warned for: ${reason}`);
          
        } else if (punishment == 4) {
            await mendtionedMember.kick(reason)
        }
      } else if (args[1] == "remove") {
        if (punishment == 1) {
          return message.channel.send(`${mendtionedMember}has no warnings to remove.`);

        } else if (punishment == 2) {
          await mendtionedMember.roles.remove(warnRole1.id).catch(err => console.log(err));
          return message.channel.send(`I removed a warning from ${mendtionedMember.user.tag}.`);
          
        } else if (punishment == 3) {
          await mendtionedMember.roles.remove(warnRole2.id).catch(err => console.log(err));
          return message.channel.send(`I removed a warning from ${mendtionedMember.user.tag}.`);
          return message.channel.send(`${mendtionedMember}, you have been warned for: ${reason}`);
          
        } else if (punishment == 4) {
          await mendtionedMember.roles.remove(warnRole3.id).catch(err => console.log(err));
          return message.channel.send(`I removed a warning from ${mendtionedMember.user.tag}.`);
      }
    }
  }
  }
};
