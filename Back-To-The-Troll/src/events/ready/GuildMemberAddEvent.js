
const { MessageAttachment } = require('discord.js');
const BaseEvent = require("../../utils/structures/BaseEvent");
module.exports = class GuildMemberAddEvent extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
    }

    async run(client, member) {
        const role = member.guild.cache.get('847452811436097558');
        await member.roles.add(role.id).catch(err => console.error(err));

        const welcomeChannel = member.guild.channels.cache.get('846779663367929866');
        const  rulesChannel = member.guild.channels.cache.get('846779773371547710');
        welcomeChannel.send(`<@${member.user.id}>, welcome to ${member.guild.name}. Read the rules: ${rulesChannel}, and enjoy your time on our server.`); 
    }
}