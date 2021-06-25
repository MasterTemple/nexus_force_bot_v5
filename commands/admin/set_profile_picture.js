module.exports = {
    name: ['setpfp'],
    description: 'Sets the bot\'s pfp',
    use: 'setpfp [url]',
    example:['setpfp https://cdn.discordapp.com/attachments/814459321282592769/849487058451169300/circle-cropped_1.pn'],
    notes: 'Sets the bot\'s profile picture',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let link
        let fs = require('fs')
        const client = message.client
        if(args.length === 1) {
            link = args[0]
        }else if(message.attachments){
            //i know this wont work right if someone sends multiple but idk how maps work in js and if you send multiple attachments you have a problem
            message.attachments.forEach((each_attachment) => {
                link = each_attachment.url
            })
        }else{
            message.channel.send("Failed ❌")
            return
        }

        try{
            await client.user.setAvatar(link)
            config.bot_icon_url = link
            message.channel.send("Done ✅")
            fs.writeFile("config.json", JSON.stringify(config,null,2), function(err) {
                    if (err) throw err;
                }
            );
        }catch(e){
            message.channel.send("Failed ❌")

        }
        return [, , , ]
    }
}