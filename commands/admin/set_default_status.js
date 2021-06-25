module.exports = {
    name: ['setstatus', 'play'],
    description: 'Sets the bot\'s status',
    use: 'setstatus [prefix]',
    example:['setstatus !'],
    notes: 'Sets the bot\'s status',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        const fs = require('fs')
        const client = message.client
        if(args.length > 0) {

            await client.user.setPresence({activity: {name: args.join(' ')}})
        }else{
            await client.user.setActivity()
            //delete config.startup_status
        }
        config.startup_status = args.join(' ')


        fs.writeFile ("config.json", JSON.stringify(config,null,2), function(err) {
                if (err) throw err;
            }
        )

        return ["Done ✅", , , ]
    }
}