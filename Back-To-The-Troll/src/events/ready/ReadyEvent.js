const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(client) {
    let serverIn = await client.guilds.cache.size;
    console.log(client.user.tag + " has logged in.");
    client.user.setPresence({
       activity:{ 
         name: `Original "Back To The Troll | Gaming Community" Bot`,
         type: "PLAYING"
         }, 
         status: "dnd" 
      })
      .catch(console.error);
    client.user.setUsername(`{${client.prefix}} Back To The Troll`)
    .then(user => console.log(`My new username is ${user.username}`))
    .catch(console.error);
  }
}
