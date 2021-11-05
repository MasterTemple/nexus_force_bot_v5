const Discord = require('discord.js')
let config = require('./config.json')
let set_slash_commands =require('./functions/set_slash_commands')
const client = new Discord.Client({
    presence: {
        status: 'online',
        activities: [
            {
                name: config.startup_status,
                type: 'STREAMING',
                url: 'https://www.twitch.tv/directory/game/Lego%20Universe'
            }
        ],
    },
    intents: ['GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
})

client.once('ready', async() => {
  await set_slash_commands(client)
  console.log("Commands Updated Successfully.");
  process.exit(0)
})

client.login(config.token)