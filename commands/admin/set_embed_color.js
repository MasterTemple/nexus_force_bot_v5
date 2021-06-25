module.exports = {
    name: ['setcolor'],
    description: 'Sets the bot\'s embed color',
    use: 'setcolor [hex color]',
    example:['setcolor #00ffff'],
    notes: 'Sets the bot\'s embed color',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        const fs = require('fs')
        if(args[0].includes('#')){
            config.color = args[0]
        }else{
            config.color = `#${args[0]}`
        }
        await fs.writeFile("config.json", JSON.stringify(config, null, 2), function (err) {
                if (err) throw err;
            }
        )
        return ["Done ✅", , , ]
    }
}