module.exports = {
    name: ['setonline'],
    description: 'Sets the bot\'s online status',
    use: 'setonline [prefix]',
    example:['setonline idle'],
    notes: 'Sets the bot\'s online status',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        const client = message.client

        if (args[0] === `online`) {
            await client.user.setPresence({status: 'online'});
        }
        if (args[0] === `idle`) {
            await client.user.setPresence({status: 'idle'});
        }
        if (args[0] === `dnd`) {
            await client.user.setPresence({status: 'dnd'});
        }

        return ["Done ✅", , , ]
    }
}