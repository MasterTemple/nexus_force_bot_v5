module.exports = {
    name: ['adddev'],
    description: 'Give a user developer permissions',
    use: 'adddev [user_id]',
    example:['adddev 703120460023463986', 'adddev @MasterTemple'],
    notes: 'Give a user developer permissions',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let new_dev_mentions = []
        let new_dev_ids = message.content.match(/(\d)+/g)

        message?.mentions?.users.forEach((each_mention) => {
            new_dev_mentions.push(each_mention.id)
        })
        const fs = require('fs')
        config.developers.push(...new_dev_mentions, ...new_dev_ids)
        config.developers = [...new Set(config.developers)]
        message.channel.send("Done ✅")
        await fs.writeFile("config.json", JSON.stringify(config, null, 2), function (err) {
                if (err) throw err;
            }
        )
        return [, , , ]
    }
}