module.exports = {
    name: ['setprefix'],
    description: 'Sets the bot\'s prefix',
    use: 'setprefix [prefix]',
    example:['setprefix !'],
    notes: 'Sets the bot\'s prefix',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        const fs = require('fs')
        config.prefix = args[0]
        message.channel.send("Done ✅")
        await fs.writeFile("config.json", JSON.stringify(config, null, 2), function (err) {
                if (err) throw err;
            }
        )
        return [, , , ]
    }
}