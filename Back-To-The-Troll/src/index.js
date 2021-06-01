const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const Discord = require('discord.js');
const config = require('../slappey.json');
require('dotenv').config();
const client = new Discord.Client();
client.snipes = new Map();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');

  mongoose.init();
  await client.login(config.token);
})();

